import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import axios from '../config/axios';
import { 
  User, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  Edit3, 
  Save, 
  X, 
  CheckCircle, 
  XCircle,
  Scissors,
  TrendingUp,
  CalendarDays
} from 'lucide-react';
import safeToast from '../utils/safeToast';
import { format, isAfter, isBefore, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });

  useEffect(() => {
    if (activeTab === 'appointments') {
      fetchAppointments();
    } else if (activeTab === 'stats') {
      fetchStats();
    }
  }, [activeTab]);



  useEffect(() => {
    setProfileData({
      name: user?.name || '',
      phone: user?.phone || ''
    });
  }, [user]);

  // Detectar parâmetros URL para ativar aba correspondente
  useEffect(() => {
    const tab = searchParams.get('tab');
    const refresh = searchParams.get('refresh');
    
    if (tab) {
      setActiveTab(tab);
      // Limpar parâmetros URL após processar
      if (refresh) {
        setSearchParams({});
      }
    }
  }, [searchParams, setSearchParams]);

  // Carregar agendamentos automaticamente na inicialização
  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  // Recarregar agendamentos quando a página for focada novamente
  useEffect(() => {
    const handleFocus = () => {
      if (user) {
        fetchAppointments();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Adicionar timestamp para evitar cache
      const response = await axios.get(`/api/appointments?t=${Date.now()}`);
      
      // Verificar se a resposta tem a estrutura esperada
      if (response.data.success && response.data.appointments) {
        setAppointments(response.data.appointments);
      } else if (Array.isArray(response.data)) {
        // Compatibilidade com formato antigo
        setAppointments(response.data);
      } else {
        console.warn('Formato de resposta inesperado:', response.data);
        setAppointments([]);
      }
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao carregar agendamentos';
      safeToast.error(errorMessage);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      safeToast.error('Erro ao carregar estatísticas');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.put('/api/users/profile', profileData);
      updateUser(response.data);
      setEditMode(false);
      safeToast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      safeToast.error('Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      return;
    }

    try {
      await axios.patch(`/api/appointments/${appointmentId}/cancel`);
     safeToast.success('Agendamento cancelado com sucesso!');
      fetchAppointments();
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      const message = error.response?.data?.error || 'Erro ao cancelar agendamento';
      safeToast.error(message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Agendado';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  const canCancelAppointment = (appointment) => {
    if (appointment.status !== 'scheduled') return false;
    
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.startTime}`);
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
    return isAfter(appointmentDateTime, twoHoursFromNow);
  };

  const groupAppointmentsByStatus = () => {
    const today = startOfDay(new Date());
    
    return {
      upcoming: appointments.filter(apt => 
        apt.status === 'scheduled' && 
        isAfter(new Date(`${apt.date}T${apt.startTime}`), today)
      ),
      past: appointments.filter(apt => 
        apt.status === 'completed' || 
        (apt.status === 'scheduled' && isBefore(new Date(`${apt.date}T${apt.startTime}`), today))
      ),
      cancelled: appointments.filter(apt => apt.status === 'cancelled')
    };
  };

  const groupedAppointments = groupAppointmentsByStatus();

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-secondary-900 mb-2">
            Meu Perfil
          </h1>
          <p className="text-secondary-600">
            Gerencie suas informações pessoais e agendamentos
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              {/* User Avatar */}
              <div className="text-center mb-6">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                ) : (
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-primary-600" />
                  </div>
                )}
                <h3 className="font-semibold text-secondary-900">{user?.name}</h3>
                <p className="text-secondary-600 text-sm">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-100'
                  }`}
                >
                  <User className="w-4 h-4 mr-3" />
                  Dados Pessoais
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'appointments'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-100'
                  }`}
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Agendamentos
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'stats'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-100'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 mr-3" />
                  Estatísticas
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold">
                    Dados Pessoais
                  </h2>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="btn btn-outline btn-sm"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Editar
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdateProfile}
                        disabled={loading}
                        className="btn btn-primary btn-sm"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                      </button>
                      <button
                        onClick={() => {
                          setEditMode(false);
                          setProfileData({
                            name: user?.name || '',
                            phone: user?.phone || ''
                          });
                        }}
                        className="btn btn-secondary btn-sm"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Nome Completo
                    </label>
                    {editMode ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="input"
                        placeholder="Seu nome completo"
                      />
                    ) : (
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-secondary-400 mr-3" />
                        <span className="text-secondary-900">{user?.name || 'Não informado'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      E-mail
                    </label>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-secondary-400 mr-3" />
                      <span className="text-secondary-900">{user?.email}</span>
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Verificado
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Telefone
                    </label>
                    {editMode ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="input"
                        placeholder="(11) 99999-9999"
                      />
                    ) : (
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-secondary-400 mr-3" />
                        <span className="text-secondary-900">{user?.phone || 'Não informado'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Membro desde
                    </label>
                    <div className="flex items-center">
                      <CalendarDays className="w-5 h-5 text-secondary-400 mr-3" />
                      <span className="text-secondary-900">
                        {user?.createdAt && format(new Date(user.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                {/* Upcoming Appointments */}
                <div className="card p-6">
                  <h2 className="text-xl font-heading font-semibold mb-4">
                    Próximos Agendamentos
                  </h2>
                  
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-secondary-600">Carregando agendamentos...</p>
                    </div>
                  ) : groupedAppointments.upcoming.length > 0 ? (
                    <div className="space-y-4">
                      {groupedAppointments.upcoming.map((appointment) => (
                        <div key={appointment.id} className="border border-secondary-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <Scissors className="w-5 h-5 text-primary-600 mr-2" />
                                <h3 className="font-semibold text-secondary-900">
                                  {appointment.service.name}
                                </h3>
                                <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                  {getStatusText(appointment.status)}
                                </span>
                              </div>
                              
                              <div className="grid md:grid-cols-2 gap-4 text-sm text-secondary-600">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: ptBR })}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-2" />
                                  {appointment.startTime} - {appointment.endTime}
                                </div>
                                {appointment.professional && (
                                  <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    {appointment.professional.name}
                                  </div>
                                )}
                                <div className="flex items-center font-medium text-primary-600">
                                  {formatPrice(appointment.service.price)}
                                </div>
                              </div>

                              {appointment.notes && (
                                <div className="mt-3 p-3 bg-secondary-50 rounded-lg">
                                  <p className="text-sm text-secondary-700">
                                    <strong>Observações:</strong> {appointment.notes}
                                  </p>
                                </div>
                              )}
                            </div>

                            {canCancelAppointment(appointment) && (
                              <button
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="ml-4 text-red-600 hover:text-red-800 transition-colors"
                                title="Cancelar agendamento"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-secondary-100 rounded-lg">
                      <Calendar className="w-12 h-12 text-secondary-400 mx-auto mb-2" />
                      <p className="text-secondary-600">Nenhum agendamento futuro</p>
                    </div>
                  )}
                </div>

                {/* Past Appointments */}
                <div className="card p-6">
                  <h2 className="text-xl font-heading font-semibold mb-4">
                    Histórico de Agendamentos
                  </h2>
                  
                  {groupedAppointments.past.length > 0 ? (
                    <div className="space-y-4">
                      {groupedAppointments.past.slice(0, 5).map((appointment) => (
                        <div key={appointment.id} className="border border-secondary-200 rounded-lg p-4 opacity-75">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <Scissors className="w-5 h-5 text-secondary-400 mr-2" />
                                <h3 className="font-semibold text-secondary-700">
                                  {appointment.service.name}
                                </h3>
                                <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                  {getStatusText(appointment.status)}
                                </span>
                              </div>
                              
                              <div className="grid md:grid-cols-2 gap-4 text-sm text-secondary-500">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: ptBR })}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-2" />
                                  {appointment.startTime} - {appointment.endTime}
                                </div>
                                {appointment.professional && (
                                  <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    {appointment.professional.name}
                                  </div>
                                )}
                                <div className="flex items-center font-medium">
                                  {formatPrice(appointment.service.price)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-secondary-100 rounded-lg">
                      <Calendar className="w-12 h-12 text-secondary-400 mx-auto mb-2" />
                      <p className="text-secondary-600">Nenhum agendamento no histórico</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stats Tab */}
            {activeTab === 'stats' && (
              <div className="card p-6">
                <h2 className="text-xl font-heading font-semibold mb-6">
                  Suas Estatísticas
                </h2>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-secondary-600">Carregando estatísticas...</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-primary-50 rounded-lg">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="text-2xl font-bold text-primary-600 mb-1">
                        {stats.totalAppointments || 0}
                      </div>
                      <div className="text-sm text-secondary-600">
                        Total de Agendamentos
                      </div>
                    </div>

                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {stats.completedAppointments || 0}
                      </div>
                      <div className="text-sm text-secondary-600">
                        Agendamentos Concluídos
                      </div>
                    </div>

                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {stats.upcomingAppointments || 0}
                      </div>
                      <div className="text-sm text-secondary-600">
                        Próximos Agendamentos
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
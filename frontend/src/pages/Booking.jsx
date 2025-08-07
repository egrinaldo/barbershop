import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { Calendar, Clock, User, Scissors, CheckCircle, ArrowLeft } from 'lucide-react';
import safeToast from '../utils/safeToast';
import { format, addDays, isSameDay, isAfter, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    serviceId: searchParams.get('service') || '',
    professionalId: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    fetchServices();
    fetchProfessionals();
  }, []);

  useEffect(() => {
    if (bookingData.serviceId && bookingData.date) {
      fetchAvailableTimes();
    }
  }, [bookingData.serviceId, bookingData.date, bookingData.professionalId]);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      safeToast.error('Erro ao carregar serviços');
    }
  };

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get('/api/professionals');
      setProfessionals(response.data);
    } catch (error) {
      console.error('Erro ao carregar profissionais:', error);
      safeToast.error('Erro ao carregar profissionais');
    }
  };

  const fetchAvailableTimes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        serviceId: bookingData.serviceId
      });
      
      if (bookingData.professionalId) {
        params.append('professionalId', bookingData.professionalId);
      }

      const response = await axios.get(`/api/appointments/available-times/${bookingData.date}?${params}`);
      setAvailableTimes(response.data);
    } catch (error) {
      console.error('Erro ao carregar horários:', error);
      safeToast.error('Erro ao carregar horários disponíveis');
      setAvailableTimes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      const appointmentData = {
        serviceId: bookingData.serviceId,
        date: bookingData.date,
        startTime: bookingData.time,
        notes: bookingData.notes,
        ...(bookingData.professionalId && { professionalId: bookingData.professionalId })
      };

      console.log('📅 Criando agendamento com dados:', appointmentData);
      
      const response = await axios.post('/api/appointments', appointmentData);
      
      console.log('✅ Agendamento criado com sucesso:', response.data);
      
      safeToast.success('Agendamento realizado com sucesso!');
      navigate('/profile?tab=appointments&refresh=true', { replace: true });
    } catch (error) {
      console.error('❌ Erro ao criar agendamento:', error);
      console.error('📋 Dados enviados:', {
        serviceId: bookingData.serviceId,
        date: bookingData.date,
        startTime: bookingData.time,
        notes: bookingData.notes,
        professionalId: bookingData.professionalId
      });
      const message = error.response?.data?.error || 'Erro ao criar agendamento';
      safeToast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = startOfDay(new Date());
    
    // Começar de hoje (i = 0) para não incluir datas passadas
    for (let i = 0; i < 30; i++) {
      const date = addDays(today, i);
      // Pular domingos (dia 0)
      if (date.getDay() !== 0) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const selectedService = services.find(s => s.id === bookingData.serviceId);
  const selectedProfessional = professionals.find(p => p.id === bookingData.professionalId);

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

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-secondary-600 hover:text-secondary-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </button>
          
          <h1 className="text-3xl font-heading font-bold text-secondary-900 mb-2">
            Agendar Serviço
          </h1>
          <p className="text-secondary-600">
            Escolha o serviço, data e horário para seu agendamento
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-200 text-secondary-600'
                  }`}
                >
                  {step > stepNumber ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-full h-1 mx-4 ${
                      step > stepNumber ? 'bg-primary-600' : 'bg-secondary-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-secondary-600">
            <span>Serviço</span>
            <span>Profissional</span>
            <span>Data & Hora</span>
            <span>Confirmação</span>
          </div>
        </div>

        <div className="card p-6">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-heading font-semibold mb-6">
                Escolha o Serviço
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      bookingData.serviceId === service.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-secondary-200 hover:border-primary-300'
                    }`}
                    onClick={() => setBookingData(prev => ({ ...prev, serviceId: service.id }))}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary-900 mb-2">
                          {service.name}
                        </h3>
                        <p className="text-secondary-600 text-sm mb-3">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary-600">
                            {formatPrice(service.price)}
                          </span>
                          <span className="text-secondary-500 flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatDuration(service.duration)}
                          </span>
                        </div>
                      </div>
                      <Scissors className="w-8 h-8 text-primary-600 ml-4" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!bookingData.serviceId}
                  className="btn btn-primary"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Professional Selection */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-heading font-semibold mb-6">
                Escolha o Profissional (Opcional)
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    !bookingData.professionalId
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-secondary-200 hover:border-primary-300'
                  }`}
                  onClick={() => setBookingData(prev => ({ ...prev, professionalId: '' }))}
                >
                  <div className="text-center">
                    <User className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-secondary-900">
                      Qualquer Profissional
                    </h3>
                    <p className="text-secondary-600 text-sm">
                      Deixe conosco a escolha
                    </p>
                  </div>
                </div>

                {professionals.map((professional) => (
                  <div
                    key={professional.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      bookingData.professionalId === professional.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-secondary-200 hover:border-primary-300'
                    }`}
                    onClick={() => setBookingData(prev => ({ ...prev, professionalId: professional.id }))}
                  >
                    <div className="text-center">
                      {professional.avatar ? (
                        <img
                          src={professional.avatar}
                          alt={professional.name}
                          className="w-12 h-12 rounded-full mx-auto mb-3"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <User className="w-6 h-6 text-primary-600" />
                        </div>
                      )}
                      <h3 className="font-semibold text-secondary-900">
                        {professional.name}
                      </h3>
                      {professional.specialty && (
                        <p className="text-secondary-600 text-sm">
                          {professional.specialty}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="btn btn-secondary"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn btn-primary"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time Selection */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-heading font-semibold mb-6">
                Escolha Data e Horário
              </h2>
              
              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="font-medium text-secondary-900 mb-3">Data</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                  {generateDateOptions().map((date) => (
                    <button
                      key={date.toISOString()}
                      onClick={() => setBookingData(prev => ({ 
                        ...prev, 
                        date: format(date, 'yyyy-MM-dd'),
                        time: '' // Reset time when date changes
                      }))}
                      className={`p-3 rounded-lg text-center transition-all ${
                        bookingData.date === format(date, 'yyyy-MM-dd')
                          ? 'bg-primary-600 text-white'
                          : 'bg-white border border-secondary-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {format(date, 'EEE', { locale: ptBR })}
                      </div>
                      <div className="text-lg font-bold">
                        {format(date, 'dd')}
                      </div>
                      <div className="text-xs">
                        {format(date, 'MMM', { locale: ptBR })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {bookingData.date && (
                <div className="mb-6">
                  <h3 className="font-medium text-secondary-900 mb-3">Horário</h3>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-secondary-600">Carregando horários...</p>
                    </div>
                  ) : availableTimes.length > 0 ? (
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setBookingData(prev => ({ ...prev, time }))}
                          className={`p-3 rounded-lg text-center transition-all ${
                            bookingData.time === time
                              ? 'bg-primary-600 text-white'
                              : 'bg-white border border-secondary-200 hover:border-primary-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-secondary-100 rounded-lg">
                      <Clock className="w-12 h-12 text-secondary-400 mx-auto mb-2" />
                      <p className="text-secondary-600">
                        Nenhum horário disponível para esta data
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="btn btn-secondary"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!bookingData.date || !bookingData.time}
                  className="btn btn-primary"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-heading font-semibold mb-6">
                Confirmar Agendamento
              </h2>
              
              <div className="bg-secondary-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-secondary-900 mb-4">
                  Resumo do Agendamento
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Serviço:</span>
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Preço:</span>
                    <span className="font-medium text-primary-600">
                      {selectedService && formatPrice(selectedService.price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Duração:</span>
                    <span className="font-medium">
                      {selectedService && formatDuration(selectedService.duration)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Profissional:</span>
                    <span className="font-medium">
                      {selectedProfessional?.name || 'Qualquer profissional'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Data:</span>
                    <span className="font-medium">
                      {bookingData.date && format(new Date(bookingData.date), 'dd/MM/yyyy', { locale: ptBR })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Horário:</span>
                    <span className="font-medium">{bookingData.time}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Observações (opcional)
                </label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="input"
                  placeholder="Alguma observação especial para seu atendimento..."
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="btn btn-secondary"
                >
                  Voltar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Agendando...' : 'Confirmar Agendamento'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
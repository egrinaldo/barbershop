import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axios';
import { Clock, Calendar, Scissors, Star } from 'lucide-react';
import safeToast from '../utils/safeToast';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      safeToast.error('Erro ao carregar serviços');
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-64 h-8 bg-secondary-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-6 bg-secondary-200 rounded-lg mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card p-6 animate-pulse">
                <div className="w-full h-48 bg-secondary-200 rounded-lg mb-4"></div>
                <div className="w-3/4 h-6 bg-secondary-200 rounded mb-3"></div>
                <div className="w-full h-4 bg-secondary-200 rounded mb-2"></div>
                <div className="w-2/3 h-4 bg-secondary-200 rounded mb-4"></div>
                <div className="flex justify-between items-center mb-4">
                  <div className="w-20 h-8 bg-secondary-200 rounded"></div>
                  <div className="w-16 h-6 bg-secondary-200 rounded"></div>
                </div>
                <div className="w-full h-10 bg-secondary-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            Nossos Serviços
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Oferecemos uma variedade completa de serviços de barbearia com 
            qualidade profissional e preços acessíveis para toda a comunidade.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="text-center py-20">
              <Scissors className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-secondary-600 mb-2">
                Nenhum serviço disponível
              </h3>
              <p className="text-secondary-500">
                Em breve teremos novos serviços disponíveis.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="card-hover overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Service Image */}
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center relative overflow-hidden">
                    <Scissors className="w-16 h-16 text-primary-600" />
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-semibold text-secondary-900 mb-3">
                      {service.name}
                    </h3>
                    
                    <p className="text-secondary-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Price and Duration */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-left">
                        <span className="text-2xl font-bold text-primary-600">
                          {formatPrice(service.price)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-secondary-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDuration(service.duration)}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <div className="flex items-center text-sm text-secondary-600 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        Profissionais qualificados
                      </div>
                      <div className="flex items-center text-sm text-secondary-600 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        Produtos de qualidade
                      </div>
                      <div className="flex items-center text-sm text-secondary-600">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        Ambiente higienizado
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/booking?service=${service.id}`}
                      className="btn btn-primary w-full group"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar Agora
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-6">
            Informações Importantes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Horário de Funcionamento
              </h3>
              <div className="space-y-2 text-secondary-600">
                <div className="flex justify-between">
                  <span>Segunda a Sexta:</span>
                  <span>8h às 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span>8h às 16h</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span>Fechado</span>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                Política de Cancelamento
              </h3>
              <div className="text-secondary-600 text-left">
                <p className="mb-2">
                  • Cancelamentos com até 2h de antecedência
                </p>
                <p className="mb-2">
                  • Reagendamento gratuito
                </p>
                <p>
                  • Tolerância de 15 minutos de atraso
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-xl p-8">
            <h3 className="text-2xl font-heading font-bold text-primary-900 mb-4">
              Primeira vez aqui?
            </h3>
            <p className="text-primary-700 mb-6 leading-relaxed">
              Ganhe 10% de desconto no seu primeiro serviço! 
              Basta mencionar que é sua primeira visita na hora do agendamento.
            </p>
            <Link
              to="/booking"
              className="btn btn-primary btn-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Fazer Meu Primeiro Agendamento
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
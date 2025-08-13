import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Scissors, 
  Clock, 
  Star, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Agendamento Online',
      description: 'Agende seu horário de forma rápida e prática, 24 horas por dia.'
    },
    {
      icon: Scissors,
      title: 'Profissionais Qualificados',
      description: 'Nossa equipe é formada por barbeiros experientes e apaixonados.'
    },
    {
      icon: Clock,
      title: 'Horários Flexíveis',
      description: 'Funcionamos de segunda a sábado com horários que se adaptam à sua rotina.'
    },
    {
      icon: Award,
      title: 'Qualidade Garantida',
      description: 'Utilizamos produtos de primeira linha para garantir o melhor resultado.'
    }
  ];

  const services = [
    {
      name: 'Corte Tradicional',
      price: 'R$ 25,00',
      duration: '30 min',
      image: '/api/placeholder/300/200'
    },
    {
      name: 'Barba Completa',
      price: 'R$ 20,00',
      duration: '25 min',
      image: '/api/placeholder/300/200'
    },
    {
      name: 'Corte + Barba',
      price: 'R$ 40,00',
      duration: '45 min',
      image: '/api/placeholder/300/200'
    }
  ];

  const testimonials = [
    {
      name: 'João Silva',
      text: 'Excelente atendimento! Os profissionais são muito qualificados e o ambiente é acolhedor.',
      rating: 5
    },
    {
      name: 'Pedro Santos',
      text: 'Sempre saio satisfeito daqui. O agendamento online facilita muito minha vida.',
      rating: 5
    },
    {
      name: 'Carlos Oliveira',
      text: 'Melhor barbearia da região! Preços justos e qualidade excepcional.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Sua Barbearia
                <span className="block text-primary-200">Solidária</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-primary-100 leading-relaxed">
                Cortes modernos, preços acessíveis e atendimento de qualidade. 
                Agende seu horário e venha fazer parte da nossa família!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-200 group shadow-lg hover:shadow-xl"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Agora
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200"
                >
                  Ver Serviços
                </Link>
              </div>
            </div>
            
            <div className="relative animate-bounce-slow">
              <div className="w-full h-96 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Scissors className="w-24 h-24 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Por que escolher a Barbearia Solidária?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos uma experiência completa com foco na qualidade, 
              acessibilidade e atendimento humanizado.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos uma variedade de serviços para cuidar do seu visual 
              com preços acessíveis e qualidade profissional.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <Scissors className="w-16 h-16 text-primary-600" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      {service.price}
                    </span>
                    <span className="text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </span>
                  </div>
                  <Link
                    to="/booking"
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200"
                  >
                    Agendar
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 text-lg font-medium border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-all duration-200"
            >
              Ver Todos os Serviços
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600">
              Depoimentos reais de quem confia no nosso trabalho
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="font-medium text-gray-900">
                    {testimonial.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Pronto para renovar seu visual?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Agende seu horário agora mesmo e venha fazer parte da nossa família. 
            Garantimos um atendimento de qualidade com preços que cabem no seu bolso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Horário
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              Falar Conosco
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
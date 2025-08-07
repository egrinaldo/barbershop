import React from 'react';
import { 
  Users, 
  Award, 
  Clock, 
  MapPin, 
  Star,
  Scissors,
  Heart,
  Target,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const team = [
    {
      id: 1,
      name: 'João Silva',
      role: 'Barbeiro Sênior',
      experience: '15 anos de experiência',
      specialty: 'Cortes clássicos e modernos',
      image: null
    },
    {
      id: 2,
      name: 'Carlos Santos',
      role: 'Barbeiro',
      experience: '8 anos de experiência',
      specialty: 'Barbas e bigodes',
      image: null
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      role: 'Barbeiro Junior',
      experience: '3 anos de experiência',
      specialty: 'Cortes infantis',
      image: null
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Solidariedade',
      description: 'Acreditamos no poder da solidariedade e no impacto positivo que podemos gerar na comunidade.'
    },
    {
      icon: Award,
      title: 'Qualidade',
      description: 'Oferecemos serviços de alta qualidade com profissionais experientes e produtos premium.'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Somos mais que uma barbearia, somos um ponto de encontro e apoio para nossa comunidade.'
    },
    {
      icon: Target,
      title: 'Propósito',
      description: 'Nosso propósito vai além do corte de cabelo, buscamos transformar vidas através do cuidado pessoal.'
    }
  ];

  const achievements = [
    {
      number: '500+',
      label: 'Clientes Atendidos'
    },
    {
      number: '3',
      label: 'Anos de Experiência'
    },
    {
      number: '1000+',
      label: 'Cortes Realizados'
    },
    {
      number: '4.9',
      label: 'Avaliação Média'
    }
  ];

  const services = [
    'Cortes masculinos tradicionais e modernos',
    'Aparar e modelar barbas',
    'Tratamentos capilares',
    'Cortes infantis',
    'Atendimento a domicílio para idosos',
    'Serviços solidários para pessoas em situação de vulnerabilidade'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Nossa História
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Mais que uma barbearia, somos um projeto social que transforma vidas através do cuidado pessoal e da solidariedade.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-6">
                Como Tudo Começou
              </h2>
              <div className="space-y-4 text-secondary-700 leading-relaxed">
                <p>
                  A Barbearia Solidária nasceu em 2021 com um propósito claro: oferecer serviços de qualidade 
                  enquanto contribui para o bem-estar da comunidade. Fundada por João Silva, um barbeiro com 
                  mais de 15 anos de experiência, nossa barbearia começou como um pequeno projeto social.
                </p>
                <p>
                  Percebendo a necessidade de cuidado pessoal em nossa comunidade, especialmente entre pessoas 
                  em situação de vulnerabilidade, decidimos criar um espaço que fosse além do tradicional. 
                  Aqui, cada corte de cabelo é uma oportunidade de elevar a autoestima e dignidade de nossos clientes.
                </p>
                <p>
                  Hoje, somos reconhecidos não apenas pela qualidade de nossos serviços, mas também pelo 
                  impacto social que geramos. Realizamos atendimentos gratuitos mensais, visitamos asilos 
                  e participamos de ações comunitárias, sempre com o objetivo de fazer a diferença.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-secondary-100">
                <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <Scissors className="w-24 h-24 text-primary-600" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">3+</div>
                <div className="text-sm">Anos de História</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Os princípios que guiam nosso trabalho e definem quem somos como empresa e como pessoas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-secondary-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Profissionais experientes e apaixonados pelo que fazem, prontos para oferecer o melhor atendimento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.id} className="card p-6 text-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <Users className="w-12 h-12 text-primary-600" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-secondary-600 text-sm mb-2">
                  {member.experience}
                </p>
                <p className="text-secondary-700 text-sm">
                  <strong>Especialidade:</strong> {member.specialty}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-6">
                Nossos Serviços
              </h2>
              <p className="text-secondary-600 mb-8">
                Oferecemos uma ampla gama de serviços para atender todas as suas necessidades de cuidado pessoal, 
                sempre com a qualidade e atenção que você merece.
              </p>
              
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                    <span className="text-secondary-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="card p-6 text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-secondary-600 text-sm">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Nossa Missão
            </h2>
            <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
              "Proporcionar serviços de barbearia de excelência, promovendo autoestima e dignidade, 
              enquanto contribuímos ativamente para o bem-estar da nossa comunidade através de ações 
              solidárias e inclusivas."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-200" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excelência</h3>
              <p className="text-primary-200">
                Buscamos sempre a excelência em nossos serviços e atendimento.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-200" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cuidado</h3>
              <p className="text-primary-200">
                Cada cliente é tratado com carinho e atenção personalizada.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-200" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comunidade</h3>
              <p className="text-primary-200">
                Trabalhamos para fortalecer e apoiar nossa comunidade local.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-4">
              Onde Estamos
            </h2>
            <p className="text-secondary-600">
              Venha nos visitar e conheça nosso espaço acolhedor e moderno.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Endereço</h3>
                    <p className="text-secondary-600">
                      Rua das Flores, 123<br />
                      Centro, São Paulo - SP<br />
                      CEP: 01234-567
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Horário de Funcionamento</h3>
                    <div className="text-secondary-600 space-y-1">
                      <p>Segunda a Sexta: 9h às 19h</p>
                      <p>Sábado: 8h às 17h</p>
                      <p>Domingo: Fechado</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Star className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Diferenciais</h3>
                    <div className="text-secondary-600 space-y-1">
                      <p>• Ambiente climatizado e acessível</p>
                      <p>• Produtos de alta qualidade</p>
                      <p>• Atendimento personalizado</p>
                      <p>• Estacionamento gratuito</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden bg-secondary-100">
                <div className="w-full h-96 bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center">
                  <MapPin className="w-24 h-24 text-secondary-400" />
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary-600 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Barbearia Solidária</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
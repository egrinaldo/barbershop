import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import safeToast from '../utils/safeToast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simular envio do formulário
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      safeToast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      safeToast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      info: '(11) 99999-9999',
      description: 'Ligue para agendar ou tirar dúvidas',
      action: 'tel:+5511999999999'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      info: '(11) 99999-9999',
      description: 'Fale conosco pelo WhatsApp',
      action: 'https://wa.me/5511999999999'
    },
    {
      icon: Mail,
      title: 'E-mail',
      info: 'contato@barbeariasolidaria.com',
      description: 'Envie sua mensagem por e-mail',
      action: 'mailto:contato@barbeariasolidaria.com'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      info: 'Rua das Flores, 123 - Centro',
      description: 'São Paulo - SP, CEP: 01234-567',
      action: 'https://maps.google.com/?q=Rua+das+Flores+123+Centro+São+Paulo'
    }
  ];

  const socialMedia = [
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@barbeariasolidaria',
      url: 'https://instagram.com/barbeariasolidaria',
      color: 'text-pink-600'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      handle: 'Barbearia Solidária',
      url: 'https://facebook.com/barbeariasolidaria',
      color: 'text-blue-600'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      handle: '@barbeariasolidaria',
      url: 'https://twitter.com/barbeariasolidaria',
      color: 'text-blue-400'
    }
  ];

  const faqs = [
    {
      question: 'Como posso agendar um horário?',
      answer: 'Você pode agendar através do nosso site, WhatsApp ou ligando diretamente para a barbearia.'
    },
    {
      question: 'Vocês atendem aos domingos?',
      answer: 'Não, funcionamos de segunda a sábado. Domingos são reservados para descanso da equipe.'
    },
    {
      question: 'Posso cancelar meu agendamento?',
      answer: 'Sim, você pode cancelar até 2 horas antes do horário agendado através do site ou WhatsApp.'
    },
    {
      question: 'Vocês fazem atendimento a domicílio?',
      answer: 'Sim, oferecemos atendimento a domicílio para idosos e pessoas com mobilidade reduzida.'
    },
    {
      question: 'Como funciona o projeto solidário?',
      answer: 'Realizamos atendimentos gratuitos mensais para pessoas em situação de vulnerabilidade. Entre em contato para mais informações.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Estamos aqui para ajudar! Entre em contato conosco para agendar, tirar dúvidas ou conhecer nossos projetos sociais.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.action}
                target={item.action.startsWith('http') ? '_blank' : '_self'}
                rel={item.action.startsWith('http') ? 'noopener noreferrer' : ''}
                className="card p-6 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors">
                  <item.icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {item.info}
                </p>
                <p className="text-secondary-600 text-sm">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-6">
                Envie uma Mensagem
              </h2>
              <p className="text-secondary-600 mb-8">
                Preencha o formulário abaixo e entraremos em contato o mais breve possível.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Assunto *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="agendamento">Agendamento</option>
                    <option value="informacoes">Informações sobre serviços</option>
                    <option value="projeto-social">Projeto social</option>
                    <option value="parceria">Parceria</option>
                    <option value="reclamacao">Reclamação</option>
                    <option value="elogio">Elogio</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input"
                    placeholder="Digite sua mensagem aqui..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-primary-600 mr-3" />
                  <h3 className="text-xl font-semibold text-secondary-900">
                    Horário de Funcionamento
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Segunda a Sexta</span>
                    <span className="font-medium text-secondary-900">9h às 19h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Sábado</span>
                    <span className="font-medium text-secondary-900">8h às 17h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Domingo</span>
                    <span className="font-medium text-red-600">Fechado</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Redes Sociais
                </h3>
                <p className="text-secondary-600 mb-4">
                  Siga-nos nas redes sociais para ficar por dentro das novidades e promoções.
                </p>
                <div className="space-y-3">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 rounded-lg border border-secondary-200 hover:border-primary-300 transition-colors group"
                    >
                      <social.icon className={`w-5 h-5 mr-3 ${social.color}`} />
                      <div>
                        <div className="font-medium text-secondary-900 group-hover:text-primary-600">
                          {social.name}
                        </div>
                        <div className="text-sm text-secondary-600">
                          {social.handle}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="card p-6 bg-primary-50 border-primary-200">
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Dicas Rápidas
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-secondary-700 text-sm">
                      Para agendamentos urgentes, prefira o WhatsApp
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-secondary-700 text-sm">
                      Chegue 10 minutos antes do seu horário
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-secondary-700 text-sm">
                      Temos estacionamento gratuito disponível
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-secondary-600">
              Encontre respostas para as dúvidas mais comuns dos nossos clientes.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="card p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="font-semibold text-secondary-900 group-open:text-primary-600">
                    {faq.question}
                  </h3>
                  <div className="w-6 h-6 text-secondary-400 group-open:text-primary-600 group-open:rotate-180 transition-transform">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="mt-4 pt-4 border-t border-secondary-200">
                  <p className="text-secondary-600">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-4">
              Nossa Localização
            </h2>
            <p className="text-secondary-600">
              Venha nos visitar! Estamos localizados no coração da cidade.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-1">Endereço Completo</h3>
                  <p className="text-secondary-600">
                    Rua das Flores, 123<br />
                    Centro, São Paulo - SP<br />
                    CEP: 01234-567
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-1">Facilidades</h3>
                  <ul className="text-secondary-600 space-y-1">
                    <li>• Estacionamento gratuito</li>
                    <li>• Acesso para cadeirantes</li>
                    <li>• Próximo ao metrô</li>
                    <li>• Wi-Fi gratuito</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="aspect-w-16 aspect-h-10 rounded-lg overflow-hidden bg-secondary-100">
                <div className="w-full h-96 bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
                    <p className="text-secondary-600">Mapa interativo em breve</p>
                    <a
                      href="https://maps.google.com/?q=Rua+das+Flores+123+Centro+São+Paulo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary mt-4"
                    >
                      Ver no Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
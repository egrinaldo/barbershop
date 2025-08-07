# 💈 Barbearia Solidária - Sistema de Agendamento

Uma aplicação web moderna e responsiva para agendamento de serviços de barbearia, desenvolvida com foco em responsabilidade social e impacto comunitário.

## 🌟 Características Principais

- **Interface Moderna**: Design responsivo com Tailwind CSS
- **Agendamento Inteligente**: Sistema de calendário interativo
- **Autenticação Segura**: Login via Google OAuth
- **Gestão Completa**: Perfil do usuário, histórico e estatísticas
- **Projeto Social**: Foco em ações solidárias e comunitárias
- **Notificações**: Lembretes automáticos por e-mail

## 🚀 Tecnologias Utilizadas

### Frontend
- **React.js** - Biblioteca para interfaces de usuário
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento SPA
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificações
- **Lucide React** - Ícones modernos
- **Date-fns** - Manipulação de datas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma ORM** - Object-Relational Mapping
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **Helmet** - Segurança HTTP
- **Rate Limiting** - Proteção contra spam

### Funcionalidades Especiais
- **EmailJS** - Envio de e-mails
- **Node-cron** - Agendamento de tarefas
- **Google OAuth** - Autenticação social

## 📁 Estrutura do Projeto

```
barbearia-solidaria/
├── 📁 prisma/                    # Esquemas e migrações do banco
│   ├── schema.prisma            # Modelo de dados Prisma
│   └── migrations/              # Migrações do banco
├── 📁 backend/                  # API Backend
│   ├── 📁 middleware/           # Middlewares (auth, etc)
│   ├── 📁 routes/               # Rotas da API
│   ├── 📁 scripts/              # Scripts utilitários
│   ├── package.json            # Dependências do backend
│   └── index.js                # Servidor principal
├── 📁 frontend/                 # Interface React
│   ├── 📁 public/               # Arquivos públicos
│   ├── 📁 src/
│   │   ├── 📁 components/       # Componentes reutilizáveis
│   │   ├── 📁 pages/            # Páginas da aplicação
│   │   ├── 📁 context/          # Contextos React
│   │   └── App.jsx             # Componente principal
│   ├── package.json            # Dependências do frontend
│   └── tailwind.config.js      # Configuração Tailwind
├── 📁 notifications/            # Sistema de notificações
│   └── reminderService.js      # Serviço de lembretes
├── .env                         # Variáveis de ambiente
├── package.json                # Configuração principal
└── README.md                   # Este arquivo
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/egrinaldo/barbershop.git
cd barbershop
```

### 2. Instale as dependências
```bash
# Instalar dependências do projeto principal
npm install

# Instalar dependências do frontend
cd frontend
npm install

# Instalar dependências do backend
cd ../backend
npm install

# Voltar para a raiz
cd ..
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="seu_jwt_secret_super_seguro_aqui"

# Google OAuth
GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"

# EmailJS
EMAILJS_SERVICE_ID="seu_emailjs_service_id"
EMAILJS_TEMPLATE_ID="seu_emailjs_template_id"
EMAILJS_USER_ID="seu_emailjs_user_id"

# Aplicação
PORT=3001
FRONTEND_URL="http://localhost:3000"

# Google Maps (opcional)
GOOGLE_MAPS_API_KEY="sua_google_maps_api_key"
```

### 4. Configure o banco de dados
```bash
# Gerar cliente Prisma
npx prisma generate

# Aplicar migrações
npx prisma db push

# Popular banco com dados iniciais (opcional)
npm run db:seed
```

### 5. Execute a aplicação
```bash
# Executar frontend e backend simultaneamente
npm run dev

# Ou executar separadamente:
# Backend (porta 3001)
npm run backend

# Frontend (porta 3000)
npm run frontend
```

## 📱 Funcionalidades

### Para Clientes
- ✅ **Cadastro/Login** via Google OAuth
- ✅ **Visualizar Serviços** com preços e durações
- ✅ **Agendar Horários** com calendário interativo
- ✅ **Escolher Profissional** (opcional)
- ✅ **Gerenciar Agendamentos** (visualizar, cancelar)
- ✅ **Perfil Pessoal** com histórico e estatísticas
- ✅ **Receber Lembretes** por e-mail

### Para a Barbearia
- ✅ **Gestão de Serviços** (CRUD completo)
- ✅ **Gestão de Profissionais** e disponibilidades
- ✅ **Controle de Agendamentos** em tempo real
- ✅ **Sistema de Notificações** automáticas
- ✅ **Relatórios e Estatísticas** de uso

### Páginas Disponíveis
- 🏠 **Home** - Página inicial com apresentação
- 💼 **Serviços** - Lista completa de serviços
- 📅 **Agendamento** - Sistema de reservas
- 👤 **Perfil** - Dados pessoais e histórico
- ℹ️ **Sobre** - História e valores da barbearia
- 📞 **Contato** - Informações e formulário

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Frontend + Backend
npm run frontend         # Apenas frontend
npm run backend          # Apenas backend

# Banco de Dados
npm run db:generate      # Gerar cliente Prisma
npm run db:push          # Aplicar mudanças no schema
npm run db:studio        # Interface visual do banco
npm run db:seed          # Popular com dados iniciais

# Produção
npm run build            # Build do frontend
npm start                # Executar em produção
```

## 🎨 Personalização

### Cores e Tema
As cores podem ser personalizadas no arquivo `frontend/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        // ... suas cores primárias
      },
      secondary: {
        50: '#f8fafc',
        // ... suas cores secundárias
      }
    }
  }
}
```

### Configuração do EmailJS
1. Crie uma conta em [EmailJS](https://www.emailjs.com/)
2. Configure um serviço de e-mail
3. Crie um template para lembretes
4. Adicione as credenciais no `.env`

### Google OAuth
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto e ative a Google+ API
3. Configure as URLs de redirecionamento
4. Adicione as credenciais no `.env`

## 🚀 Deploy

### Vercel (Frontend)
```bash
cd frontend
npm run build
# Deploy para Vercel
```

### Railway/Heroku (Backend)
```bash
# Configurar variáveis de ambiente
# Deploy do backend
```

### Banco de Dados
Para produção, considere migrar para PostgreSQL:
```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **João Silva** - Barbeiro Sênior & Fundador
- **Carlos Santos** - Especialista em Barbas
- **Pedro Oliveira** - Cortes Infantis & Tratamentos

## 📞 Suporte

- **E-mail**: contato@barbeariasolidaria.com
- **WhatsApp**: (11) 99999-9999
- **Endereço**: Rua das Flores, 123 - Centro, São Paulo - SP

## 🌟 Projeto Social

A Barbearia Solidária é mais que um negócio - é um projeto social que visa:

- 🤝 Atender pessoas em situação de vulnerabilidade
- 👴 Visitar asilos e casas de repouso
- 👶 Oferecer cortes gratuitos para crianças carentes
- 🏘️ Participar de ações comunitárias
- 💝 Promover autoestima e dignidade através do cuidado pessoal

---

**Desenvolvido com ❤️ pela equipe da Barbearia Solidária**
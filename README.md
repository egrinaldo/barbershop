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

## 🛠️ Guia de Instalação para Desenvolvedores

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 16 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (vem com Node.js) ou **yarn**
- **Git** - [Download aqui](https://git-scm.com/)
- **Editor de código** (recomendado: VS Code)

### 🚀 Passo a Passo Completo

#### **1. Clone o Repositório**
```bash
# Clone o projeto do GitHub
git clone https://github.com/egrinaldo/barbershop.git

# Entre na pasta do projeto
cd barbershop
```

#### **2. Instale as Dependências**
```bash
# Instalar dependências do projeto principal (raiz)
npm install

# Instalar dependências do frontend
cd frontend
npm install

# Instalar dependências do backend
cd ../backend
npm install

# Voltar para a raiz do projeto
cd ..
```

#### **3. Configure as Variáveis de Ambiente**

##### **3.1. Arquivo .env (Raiz do Projeto)**
Crie um arquivo `.env` na **raiz do projeto** com as seguintes variáveis:

```env
# ===== BANCO DE DADOS =====
DATABASE_URL="file:./dev.db"

# ===== AUTENTICAÇÃO =====
JWT_SECRET="seu_jwt_secret_super_seguro_aqui_123456789"

# ===== GOOGLE OAUTH =====
GOOGLE_CLIENT_ID="seu_google_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"

# ===== EMAILJS (NOTIFICAÇÕES) =====
EMAILJS_SERVICE_ID="seu_emailjs_service_id"
EMAILJS_TEMPLATE_ID="seu_emailjs_template_id"
EMAILJS_USER_ID="seu_emailjs_user_id"

# ===== CONFIGURAÇÕES DA APLICAÇÃO =====
PORT=3001
FRONTEND_URL="http://localhost:3000"

# ===== OPCIONAL =====
GOOGLE_MAPS_API_KEY="sua_google_maps_api_key"
```

##### **3.2. Arquivo .env (Frontend)**
Crie um arquivo `.env` na pasta **frontend** com:

```env
# URL da API do backend
REACT_APP_API_URL=http://localhost:3001
```

#### **4. Configure o Google OAuth** 🔐

Para configurar a autenticação com Google:

1. **Acesse o [Google Cloud Console](https://console.cloud.google.com/)**
2. **Crie um novo projeto** ou selecione um existente
3. **Ative a Google+ API**:
   - Vá em "APIs & Services" > "Library"
   - Procure por "Google+ API" e ative
4. **Configure as credenciais**:
   - Vá em "APIs & Services" > "Credentials"
   - Clique em "Create Credentials" > "OAuth 2.0 Client IDs"
   - Tipo: Web application
   - **Authorized redirect URIs**:
     - `http://localhost:3001/api/auth/google/callback`
     - `http://localhost:3000` (para desenvolvimento)
5. **Copie as credenciais** e adicione no arquivo `.env`

#### **5. Configure o EmailJS** 📧

Para notificações por e-mail:

1. **Crie uma conta em [EmailJS](https://www.emailjs.com/)**
2. **Configure um serviço de e-mail** (Gmail, Outlook, etc.)
3. **Crie um template** para lembretes de agendamento
4. **Copie as credenciais** e adicione no arquivo `.env`

#### **6. Configure o Banco de Dados** 🗄️

```bash
# Gerar o cliente Prisma
npx prisma generate

# Aplicar as migrações (criar tabelas)
npx prisma migrate dev

# OU usar push para desenvolvimento rápido
npx prisma db push

# Popular o banco com dados iniciais (opcional)
npm run seed
```

#### **7. Execute a Aplicação** ▶️

##### **Opção 1: Executar Tudo Junto (Recomendado)**
```bash
# Executa frontend e backend simultaneamente
npm run dev
```

##### **Opção 2: Executar Separadamente**
```bash
# Terminal 1 - Backend (porta 3001)
npm run dev:backend

# Terminal 2 - Frontend (porta 3000)
npm run dev:frontend
```

#### **8. Acesse a Aplicação** 🌐

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Prisma Studio**: `npx prisma studio` (interface visual do banco)

### 🔧 Scripts Disponíveis

```bash
# ===== DESENVOLVIMENTO =====
npm run dev              # Frontend + Backend juntos
npm run dev:backend      # Apenas backend (porta 3001)
npm run dev:frontend     # Apenas frontend (porta 3000)

# ===== BANCO DE DADOS =====
npx prisma generate      # Gerar cliente Prisma
npx prisma migrate dev   # Aplicar migrações
npx prisma db push       # Push do schema (desenvolvimento)
npx prisma studio        # Interface visual do banco
npm run seed             # Popular com dados iniciais

# ===== PRODUÇÃO =====
npm run build            # Build do frontend
npm start                # Executar em produção
```

### 🚨 Solução de Problemas Comuns

#### **Erro: "Cannot find module '@prisma/client'"**
```bash
npx prisma generate
```

#### **Erro: "Port 3000/3001 already in use"**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

#### **Erro: "Google OAuth not working"**
- Verifique se as URLs de redirecionamento estão corretas
- Confirme se a Google+ API está ativada
- Verifique as credenciais no arquivo `.env`

#### **Banco de dados não funciona**
```bash
# Resetar o banco
npx prisma migrate reset
npx prisma db push
npm run seed
```

### 📁 Estrutura de Pastas Importante

```
projeto_barbearia_solidaria/
├── .env                     # ⚠️ Variáveis de ambiente (RAIZ)
├── package.json            # Scripts principais
├── prisma/
│   ├── schema.prisma       # Modelo do banco
│   └── migrations/         # Migrações
├── backend/
│   ├── .env               # ⚠️ Variáveis do backend (se necessário)
│   ├── package.json       # Dependências do backend
│   ├── index.js           # Servidor principal
│   └── routes/            # Rotas da API
└── frontend/
    ├── .env               # ⚠️ Variáveis do frontend
    ├── package.json       # Dependências do frontend
    └── src/               # Código React
```

### ✅ Checklist de Verificação

Antes de começar a desenvolver, verifique se:

- [ ] Node.js está instalado (`node --version`)
- [ ] Git está configurado (`git --version`)
- [ ] Repositório foi clonado corretamente
- [ ] Dependências foram instaladas (raiz, frontend, backend)
- [ ] Arquivos `.env` foram criados e configurados
- [ ] Google OAuth está configurado
- [ ] Banco de dados foi inicializado
- [ ] Aplicação roda sem erros em http://localhost:3000
- [ ] API responde em http://localhost:3001

### 🤝 Fluxo de Desenvolvimento

1. **Sempre trabalhe em uma branch separada**:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

2. **Mantenha as dependências atualizadas**:
   ```bash
   npm update
   ```

3. **Teste antes de fazer commit**:
   ```bash
   npm run dev
   ```

4. **Faça commits descritivos**:
   ```bash
   git commit -m "feat: adiciona nova funcionalidade X"
   ```

### 📞 Suporte para Desenvolvedores

Se encontrar problemas durante a instalação:

1. **Verifique a documentação** acima
2. **Consulte os logs** do terminal para erros específicos
3. **Verifique as issues** no GitHub do projeto
4. **Entre em contato** com a equipe de desenvolvimento

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

## 🔧 Scripts Disponíveis (Resumo)

```bash
# ===== DESENVOLVIMENTO =====
npm run dev              # Frontend + Backend juntos
npm run dev:backend      # Apenas backend (porta 3001)
npm run dev:frontend     # Apenas frontend (porta 3000)

# ===== BANCO DE DADOS =====
npx prisma generate      # Gerar cliente Prisma
npx prisma migrate       # Aplicar migrações
npx prisma studio        # Interface visual do banco
npm run seed             # Popular com dados iniciais

# ===== PRODUÇÃO =====
npm run build            # Build do frontend
npm start                # Executar em produção
```

## 🧪 Como Executar os Testes

O projeto possui uma estrutura organizada de testes dividida em categorias. Todos os arquivos de teste estão localizados na pasta `tests/`.

### 📁 Estrutura de Testes

```
tests/
├── debug/                       # 🔧 Arquivos de debug
├── unit/                        # 🧪 Testes unitários
├── integration/                 # 🔗 Testes de integração
└── README.md                   # 📚 Documentação dos testes
```

### 🔧 Testes de Debug

Para análise e resolução de problemas específicos:

```bash
# Debug de horários disponíveis
node tests/debug/debug-available-times.js

# Debug da lógica de horários
node tests/debug/debug-horarios.js

# Debug da lógica de tempo
node tests/debug/debug-time-logic.js

# Debug de usuários
node tests/debug/debug-users.js
```

### 🧪 Testes Unitários

Para validar componentes e funções específicas:

```bash
# Testes de agendamentos
node tests/unit/test-appointments.js

# Testes da lógica de datas
node tests/unit/test-date-logic.js

# Testes da lógica de datas do frontend
node tests/unit/test-frontend-date-logic.js

# Testes de horários passados
node tests/unit/test-horarios-passados.js

# Testes de "meus agendamentos"
node tests/unit/test-my-appointments.js
```

### 🔗 Testes de Integração

Para verificar interação entre componentes:

```bash
# Teste de criação de agendamentos
node tests/integration/create-test-appointment.js
```

### 📋 Executar Todos os Testes

```bash
# Executar todos os testes de debug
for file in tests/debug/*.js; do node "$file"; done

# Executar todos os testes unitários
for file in tests/unit/*.js; do node "$file"; done

# Executar todos os testes de integração
for file in tests/integration/*.js; do node "$file"; done
```

### 🚨 Importante

- **Execute os testes** antes de fazer commits
- **Mantenha os testes atualizados** com as mudanças do código
- **Use dados de teste** que não afetem o banco de produção
- **Consulte** `tests/README.md` para documentação detalhada

### 📊 Status dos Testes

| Categoria | Arquivos | Localização |
|-----------|----------|-------------|
| 🔧 Debug | 4 arquivos | `tests/debug/` |
| 🧪 Unitários | 5 arquivos | `tests/unit/` |
| 🔗 Integração | 1 arquivo | `tests/integration/` |

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
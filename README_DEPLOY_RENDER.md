# 🚀 Deploy da Barbearia Solidária no Render

Este guia contém instruções completas para fazer o deploy da aplicação **Barbearia Solidária** no Render usando PostgreSQL.

## 📋 Pré-requisitos

- [ ] Conta no [Render](https://render.com)
- [ ] Repositório Git (GitHub, GitLab, ou Bitbucket)
- [ ] Código no branch `develop` com todas as modificações

## 🔧 Estrutura do Deploy

O deploy consiste em **3 serviços**:
1. **Frontend** (Static Site) - React build
2. **Backend** (Web Service) - Node.js + Express + Prisma
3. **Database** (PostgreSQL) - Plano Free

## 🚀 Opção 1: Deploy via Blueprint (Recomendado)

### 1. Conectar Repositório ao Render

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em **"New +"** → **"Blueprint"**
3. Conecte seu repositório Git
4. Selecione o repositório da Barbearia Solidária
5. Escolha o branch `develop`

### 2. Configurar Blueprint

1. O Render detectará automaticamente o arquivo `render.yaml`
2. Clique em **"Apply"**
3. Aguarde a criação dos 3 serviços

### 3. Configurar Variáveis de Ambiente

Após a criação, configure as seguintes variáveis no **Backend Service**:

#### Variáveis Obrigatórias:
```bash
# Já configuradas automaticamente:
NODE_ENV=production
PORT=(automático)
DATABASE_URL=(automático - conectado ao PostgreSQL)

# Configure manualmente no Dashboard:
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
FRONTEND_URL=https://barbearia-frontend.onrender.com
```

#### Variáveis Opcionais (EmailJS):
```bash
EMAILJS_SERVICE_ID=seu_service_id
EMAILJS_TEMPLATE_ID=seu_template_id
EMAILJS_PUBLIC_KEY=sua_public_key
```

## 🚀 Opção 2: Deploy Manual

### 1. Criar Database

1. **New +** → **PostgreSQL**
2. **Name:** `barbearia-db`
3. **Database:** `barbearia_solidaria`
4. **User:** `barbearia_user`
5. **Plan:** Free
6. **Region:** Oregon (US West)

### 2. Criar Backend Service

1. **New +** → **Web Service**
2. Conecte o repositório
3. **Name:** `barbearia-backend`
4. **Environment:** Node
5. **Plan:** Free
6. **Region:** Oregon (US West)
7. **Build Command:** `npm ci && npx prisma generate && npx prisma migrate deploy`
8. **Start Command:** `npm start`
9. **Health Check Path:** `/api/health`

### 3. Criar Frontend Service

1. **New +** → **Static Site**
2. Conecte o repositório
3. **Name:** `barbearia-frontend`
4. **Build Command:** `cd frontend && npm ci && npm run build`
5. **Publish Directory:** `frontend/build`

## 🔗 URLs e Conexões

### Database URLs
- **Internal URL:** `postgresql://user:pass@dpg-xxx-a.oregon-postgres.render.com/db`
- **External URL:** `postgresql://user:pass@dpg-xxx.oregon-postgres.render.com/db`

**💡 Use a Internal URL** para conectar o backend ao banco (mesma região = mais rápido).

### Service URLs
- **Frontend:** `https://barbearia-frontend.onrender.com`
- **Backend:** `https://barbearia-backend.onrender.com`
- **API Health:** `https://barbearia-backend.onrender.com/api/health`

## 🧪 Comandos para Teste Local

Antes do deploy, teste localmente:

```bash
# 1. Instalar dependências
npm ci
cd frontend && npm ci && cd ..

# 2. Configurar PostgreSQL local (opcional)
# Crie um banco PostgreSQL local e configure DATABASE_URL

# 3. Gerar cliente Prisma
npx prisma generate

# 4. Executar migrações (se tiver banco local)
npx prisma migrate deploy
# OU usar o script manual:
npm run migrate:local

# 5. Executar seed (opcional)
npm run seed:local

# 6. Build do frontend
npm run build

# 7. Testar backend
npm start
# Deve mostrar: "🚀 Servidor rodando na porta 3001"

# 8. Testar frontend build
cd frontend/build && python -m http.server 3000
# OU use qualquer servidor estático
```

## ⚙️ Configuração do Google OAuth

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Vá em **APIs & Services** → **Credentials**
3. Edite seu OAuth 2.0 Client
4. Adicione as URLs autorizadas:
   ```
   https://barbearia-frontend.onrender.com
   https://barbearia-backend.onrender.com
   ```

## 📧 Configuração do EmailJS

1. Acesse [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Configure um novo serviço de email
3. Crie um template de email
4. Adicione as variáveis no Render Backend

## ✅ Checklist de Aceitação

### Deploy Concluído:
- [ ] ✅ Database PostgreSQL criado e ativo
- [ ] ✅ Backend service deployado e rodando
- [ ] ✅ Frontend static site deployado e acessível
- [ ] ✅ Todas as variáveis de ambiente configuradas

### Testes Funcionais:
- [ ] ✅ Frontend carrega sem erros: `https://barbearia-frontend.onrender.com`
- [ ] ✅ API responde: `https://barbearia-backend.onrender.com/api/health`
- [ ] ✅ Logs do backend limpos (sem erros críticos)
- [ ] ✅ Database conectado (verificar logs do backend)
- [ ] ✅ Google OAuth funcionando (se configurado)
- [ ] ✅ EmailJS funcionando (se configurado)

### Verificação de Logs:
```bash
# No Render Dashboard:
1. Acesse o Backend Service
2. Vá na aba "Logs"
3. Verifique se não há erros críticos
4. Deve mostrar: "🚀 Servidor rodando na porta XXXX"
5. Deve mostrar: "🐘 Conectado ao PostgreSQL"
```

## 🔧 Troubleshooting

### Problemas Comuns:

#### 1. Build do Frontend Falha
```bash
# Erro: "npm ERR! peer dep missing"
# Solução: Verificar dependências no frontend/package.json
```

#### 2. Backend Não Conecta ao Database
```bash
# Erro: "connection refused"
# Solução: Verificar se DATABASE_URL está configurada corretamente
# Use a Internal URL do PostgreSQL
```

#### 3. Prisma Migration Falha
```bash
# Erro: "migration failed"
# Solução: Verificar se o schema.prisma está correto
# Executar: npx prisma migrate reset (cuidado em produção!)
```

#### 4. CORS Errors
```bash
# Erro: "CORS policy"
# Solução: Verificar se FRONTEND_URL está configurada no backend
```

## 📞 Suporte

- **Render Docs:** https://render.com/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **React Deployment:** https://create-react-app.dev/docs/deployment

---

## 🎯 Próximos Passos

Após o deploy bem-sucedido:

1. **Configure domínio customizado** (opcional)
2. **Configure SSL** (automático no Render)
3. **Configure monitoramento** (logs, uptime)
4. **Configure backup do banco** (planos pagos)
5. **Configure CI/CD** para deploys automáticos

---

**✨ Parabéns! Sua Barbearia Solidária está no ar! ✨**
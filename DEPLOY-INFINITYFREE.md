# 🚀 Deploy para InfinityFree - Barbearia Solidária

## 📋 Pré-requisitos

1. **Conta no InfinityFree**: [Criar conta gratuita](https://infinityfree.net/)
2. **Cliente FTP**: FileZilla ou similar
3. **Aplicação buildada localmente**

## 🔧 Preparação do Projeto

### 1. Configurar Variáveis de Ambiente para Produção

Crie um arquivo `.env.production` na raiz do projeto:

```env
# Database (SQLite para InfinityFree)
DATABASE_URL="file:./production.db"

# JWT Secret (use um valor seguro)
JWT_SECRET="sua_chave_jwt_super_segura_aqui"

# URLs de Produção
PORT=3001
FRONTEND_URL="https://seudominio.infinityfreeapp.com"

# Google OAuth (configure no Google Console)
GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"

# EmailJS (configure no EmailJS)
EMAILJS_SERVICE_ID="seu_service_id"
EMAILJS_TEMPLATE_ID="seu_template_id"
EMAILJS_USER_ID="seu_user_id"

# Google Maps (opcional)
GOOGLE_MAPS_API_KEY="sua_api_key_google_maps"
```

### 2. Atualizar Frontend para Produção

Edite `frontend/.env.production`:

```env
REACT_APP_API_URL=https://seudominio.infinityfreeapp.com/api
```

### 3. Build do Frontend

```bash
cd frontend
npm run build
```

## 📁 Estrutura de Deploy

### Para InfinityFree (Hosting Gratuito):

**Limitações do InfinityFree:**
- ❌ Não suporta Node.js/Backend
- ✅ Suporta apenas frontend estático (HTML, CSS, JS)
- ✅ Suporta PHP/MySQL

### Opção 1: Frontend Estático + API Externa

1. **Deploy apenas do Frontend no InfinityFree**
2. **Backend em serviço que suporte Node.js** (Heroku, Railway, Render)

### Opção 2: Conversão para PHP (Recomendado para InfinityFree)

Como o InfinityFree não suporta Node.js, você precisará:

1. **Manter o Frontend React** (build estático)
2. **Reescrever o Backend em PHP** para usar MySQL
3. **Usar MySQL ao invés de SQLite**

## 🚀 Deploy do Frontend (Opção 1)

### Passo 1: Build do Projeto

```bash
# Na raiz do projeto
npm run build
```

### Passo 2: Upload via FTP

1. **Conecte-se ao FTP do InfinityFree**:
   - Host: `ftpupload.net`
   - Usuário: seu username
   - Senha: sua senha
   - Porta: 21

2. **Upload dos arquivos**:
   - Navegue até `/htdocs/`
   - Faça upload de todos os arquivos da pasta `frontend/build/`

### Passo 3: Configurar API Externa

Para o backend, use um dos seguintes serviços gratuitos:

#### Railway (Recomendado)
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway deploy
```

#### Render
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático

#### Heroku
```bash
# Instalar Heroku CLI
# Criar app
heroku create sua-barbearia-api

# Deploy
git push heroku main
```

## 🔄 Opção 2: Conversão Completa para PHP

### Backend PHP (Estrutura Sugerida)

```
api/
├── config/
│   ├── database.php
│   └── cors.php
├── models/
│   ├── User.php
│   ├── Service.php
│   ├── Professional.php
│   └── Appointment.php
├── controllers/
│   ├── AuthController.php
│   ├── ServiceController.php
│   ├── ProfessionalController.php
│   └── AppointmentController.php
├── routes/
│   └── api.php
└── index.php
```

### Banco de Dados MySQL

```sql
-- Criar database no painel do InfinityFree
CREATE DATABASE barbearia_solidaria;

-- Tabelas (converter do Prisma schema)
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    google_id VARCHAR(255),
    avatar TEXT,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Adicionar outras tabelas...
```

## 📝 Checklist de Deploy

### Frontend
- [ ] Build do React criado (`npm run build`)
- [ ] Arquivo `.htaccess` configurado
- [ ] URLs da API atualizadas para produção
- [ ] Upload via FTP para `/htdocs/`
- [ ] Teste do site funcionando

### Backend (se usando serviço externo)
- [ ] Variáveis de ambiente configuradas
- [ ] Database em produção configurado
- [ ] CORS configurado para o domínio do frontend
- [ ] Deploy realizado
- [ ] Teste das APIs funcionando

### Configurações Gerais
- [ ] Google OAuth configurado para domínio de produção
- [ ] EmailJS configurado
- [ ] SSL/HTTPS funcionando
- [ ] Teste completo da aplicação

## 🔧 Troubleshooting

### Problemas Comuns

1. **CORS Error**:
   - Verifique se o backend permite o domínio do frontend
   - Configure `FRONTEND_URL` corretamente

2. **Rotas não funcionam**:
   - Verifique se o `.htaccess` está correto
   - Teste as rotas manualmente

3. **API não responde**:
   - Verifique se o backend está online
   - Teste as URLs da API diretamente

## 💡 Recomendações

### Para Produção Séria:
1. **Use um VPS** (DigitalOcean, Linode)
2. **Configure CI/CD** (GitHub Actions)
3. **Use CDN** (Cloudflare)
4. **Monitore** (Uptime Robot)

### Para Teste/Demo:
1. **Frontend**: InfinityFree
2. **Backend**: Railway/Render
3. **Database**: PostgreSQL (Railway) ou MySQL (PlanetScale)

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs do servidor
2. Teste localmente primeiro
3. Use as ferramentas de desenvolvedor do navegador
4. Consulte a documentação do InfinityFree
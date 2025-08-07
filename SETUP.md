# 🚀 Guia Rápido de Instalação - Barbearia Solidária

## ⚡ Setup em 5 Minutos

### 1. Clone e Instale
```bash
git clone https://github.com/egrinaldo/barbershop.git
cd barbershop
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

### 2. Configure Variáveis de Ambiente

#### Arquivo `.env` (raiz):
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="meu_jwt_secret_super_seguro_123456"
GOOGLE_CLIENT_ID="seu_google_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"
EMAILJS_SERVICE_ID="seu_emailjs_service_id"
EMAILJS_TEMPLATE_ID="seu_emailjs_template_id"
EMAILJS_USER_ID="seu_emailjs_user_id"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

#### Arquivo `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:3001
```

### 3. Configure o Banco
```bash
npx prisma generate
npx prisma db push
npm run seed
```

### 4. Execute
```bash
npm run dev
```

### 5. Acesse
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

---

## 🔧 Configurações Opcionais

### Google OAuth (Para Login)
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie projeto e ative Google+ API
3. Configure OAuth 2.0 com redirect: `http://localhost:3001/api/auth/google/callback`
4. Adicione credenciais no `.env`

### EmailJS (Para Notificações)
1. Crie conta em [EmailJS](https://www.emailjs.com/)
2. Configure serviço de e-mail
3. Crie template de lembrete
4. Adicione credenciais no `.env`

---

## 🚨 Problemas Comuns

### Porta em uso:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Prisma não funciona:
```bash
npx prisma generate
npx prisma db push
```

### Dependências:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ Checklist Rápido

- [ ] Node.js 16+ instalado
- [ ] Git configurado
- [ ] Repositório clonado
- [ ] Dependências instaladas (raiz, frontend, backend)
- [ ] Arquivos `.env` criados
- [ ] Banco inicializado
- [ ] App rodando em localhost:3000

---

**🎉 Pronto! Agora você pode começar a desenvolver!**

Para mais detalhes, consulte o [README.md](./README.md) completo.
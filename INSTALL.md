# 💻 Guia de Instalação por Sistema Operacional

## 🪟 Windows

### Pré-requisitos
1. **Instalar Node.js**:
   - Baixe em: https://nodejs.org/
   - Escolha a versão LTS (recomendada)
   - Execute o instalador e siga as instruções

2. **Instalar Git**:
   - Baixe em: https://git-scm.com/
   - Execute o instalador com configurações padrão

3. **Editor de Código** (opcional):
   - VS Code: https://code.visualstudio.com/

### Comandos Windows (PowerShell/CMD)
```powershell
# Verificar instalações
node --version
npm --version
git --version

# Clonar projeto
git clone https://github.com/egrinaldo/barbershop.git
cd barbershop

# Instalar dependências
npm install
cd frontend
npm install
cd ..\backend
npm install
cd ..

# Configurar banco
npx prisma generate
npx prisma db push
npm run seed

# Executar
npm run dev
```

### Solução de Problemas Windows
```powershell
# Se porta estiver em uso
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Se houver erro de permissão no PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🐧 Linux (Ubuntu/Debian)

### Pré-requisitos
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Git
sudo apt install git -y

# Verificar instalações
node --version
npm --version
git --version
```

### Comandos Linux
```bash
# Clonar projeto
git clone https://github.com/egrinaldo/barbershop.git
cd barbershop

# Instalar dependências
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..

# Configurar banco
npx prisma generate
npx prisma db push
npm run seed

# Executar
npm run dev
```

### Solução de Problemas Linux
```bash
# Se porta estiver em uso
lsof -ti:3000 | xargs kill -9

# Se houver erro de permissão
sudo chown -R $(whoami) ~/.npm
```

---

## 🍎 macOS

### Pré-requisitos
```bash
# Instalar Homebrew (se não tiver)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node

# Instalar Git (se não tiver)
brew install git

# Verificar instalações
node --version
npm --version
git --version
```

### Comandos macOS
```bash
# Clonar projeto
git clone https://github.com/egrinaldo/barbershop.git
cd barbershop

# Instalar dependências
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..

# Configurar banco
npx prisma generate
npx prisma db push
npm run seed

# Executar
npm run dev
```

### Solução de Problemas macOS
```bash
# Se porta estiver em uso
lsof -ti:3000 | xargs kill -9

# Se houver erro de permissão
sudo chown -R $(whoami) ~/.npm
```

---

## 🐳 Docker (Opcional)

### Dockerfile (Backend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3001
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=file:./dev.db
      - JWT_SECRET=your_jwt_secret
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:3001
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
```

---

## 🌐 Configuração de Rede

### Firewall (se necessário)
```bash
# Windows (PowerShell como Admin)
New-NetFirewallRule -DisplayName "Node.js" -Direction Inbound -Protocol TCP -LocalPort 3000,3001 -Action Allow

# Linux (Ubuntu)
sudo ufw allow 3000
sudo ufw allow 3001

# macOS
# Geralmente não é necessário
```

### Hosts (para desenvolvimento)
Adicione ao arquivo hosts se necessário:
- **Windows**: `C:\Windows\System32\drivers\etc\hosts`
- **Linux/macOS**: `/etc/hosts`

```
127.0.0.1 barbershop.local
```

---

## 🔧 IDEs e Extensões Recomendadas

### VS Code
Extensões úteis:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Prisma
- GitLens
- Auto Rename Tag
- Bracket Pair Colorizer

### Configuração VS Code (settings.json)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

---

## 📱 Teste em Dispositivos Móveis

### Acessar de outros dispositivos na rede
1. Descubra seu IP local:
   ```bash
   # Windows
   ipconfig
   
   # Linux/macOS
   ifconfig
   ```

2. Configure o frontend para aceitar conexões externas:
   ```bash
   # No package.json do frontend, modifique o script start:
   "start": "react-scripts start --host 0.0.0.0"
   ```

3. Acesse de outros dispositivos:
   - `http://SEU_IP:3000`

---

## 🚀 Deploy Rápido

### Vercel (Frontend)
```bash
npm install -g vercel
cd frontend
npm run build
vercel --prod
```

### Railway (Backend)
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

---

## 📞 Suporte por Plataforma

- **Windows**: Verifique se o Windows Defender não está bloqueando
- **Linux**: Certifique-se de ter permissões adequadas
- **macOS**: Pode ser necessário permitir apps de desenvolvedores não identificados

**💡 Dica**: Sempre execute os comandos em um terminal com privilégios adequados!
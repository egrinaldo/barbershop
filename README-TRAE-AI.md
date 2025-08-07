# 🤖 Prompt para IA do Trae - Barbearia Solidária

## 📋 Prompt Principal (Copie e Cole no Chat da IA)

```
Olá! Preciso configurar o projeto "Barbearia Solidária" na minha máquina. Este é um sistema de agendamento para barbearia desenvolvido com React (frontend) e Node.js (backend), usando Prisma ORM e SQLite.

Por favor, me ajude a:

1. **Clonar o repositório do GitHub:**
   - URL: https://github.com/egrinaldo/barbershop.git
   - Branch: develop

2. **Instalar todas as dependências:**
   - Dependências da raiz do projeto
   - Dependências do frontend (React)
   - Dependências do backend (Node.js)

3. **Configurar arquivos de ambiente (.env):**
   - Criar .env na raiz com configurações do banco de dados
   - Criar .env no frontend com URL da API
   - Use as configurações do arquivo .env.example como base

4. **Configurar banco de dados:**
   - Executar Prisma generate
   - Executar migrações do banco
   - Executar seed para dados iniciais

5. **Executar a aplicação:**
   - Iniciar o backend na porta 3001
   - Iniciar o frontend na porta 3000
   - Verificar se ambos estão funcionando

6. **Verificar funcionamento:**
   - Acessar http://localhost:3000
   - Testar se a API responde em http://localhost:3001/api/health
   - Confirmar que não há erros no console

**Configurações mínimas necessárias:**
- DATABASE_URL="file:./dev.db"
- JWT_SECRET="seu_jwt_secret_aqui"
- PORT=3001
- FRONTEND_URL="http://localhost:3000"
- REACT_APP_API_URL="http://localhost:3001"

**Comandos esperados:**
```bash
git clone https://github.com/egrinaldo/barbershop.git
cd barbershop
git checkout develop
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
# Criar arquivos .env
npx prisma generate
npx prisma migrate dev
npm run seed
npm run dev
```

Por favor, execute todos esses passos automaticamente e me informe quando estiver pronto para usar!
```

## 🎯 Como Usar Este Prompt

### Para Desenvolvedores:
1. **Abra o Trae AI** no seu IDE
2. **Copie o prompt acima** (da seção "Prompt Principal")
3. **Cole no chat** da IA do Trae
4. **Aguarde a execução** automática
5. **Acesse** http://localhost:3000 quando pronto

### O que a IA Fará Automaticamente:
- ✅ Clonar o repositório
- ✅ Instalar todas as dependências
- ✅ Criar arquivos .env necessários
- ✅ Configurar banco de dados
- ✅ Executar migrações e seed
- ✅ Iniciar backend e frontend
- ✅ Verificar funcionamento

### Informações Opcionais:
Se você tiver essas configurações, pode informar à IA:

**Google OAuth (opcional):**
```
GOOGLE_CLIENT_ID="seu_google_client_id"
```

**EmailJS (opcional):**
```
EMAILJS_SERVICE_ID="seu_service_id"
EMAILJS_TEMPLATE_ID="seu_template_id"
EMAILJS_PUBLIC_KEY="sua_public_key"
```

**JWT Secret personalizado:**
```
JWT_SECRET="seu_jwt_secret_personalizado"
```

## ⚙️ Configurações Mínimas

O projeto funcionará com estas configurações básicas:

### Arquivo .env (raiz):
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="barbearia_solidaria_secret_2024"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

### Arquivo frontend/.env:
```env
REACT_APP_API_URL="http://localhost:3001"
```

## 🎯 Resultado Esperado

Após a execução do prompt:
- ✅ Backend rodando em http://localhost:3001
- ✅ Frontend rodando em http://localhost:3000
- ✅ Banco de dados configurado com dados de exemplo
- ✅ Sistema pronto para desenvolvimento

## 🚨 Comandos de Emergência

Se algo der errado, use estes prompts:

### Reinstalar Dependências:
```
"Reinstale todas as dependências do projeto Barbearia Solidária (raiz, frontend e backend)"
```

### Reconfigurar Banco:
```
"Reconfigure o banco de dados do projeto, execute as migrações e o seed novamente"
```

### Reiniciar Servidores:
```
"Pare e reinicie os servidores do backend e frontend do projeto Barbearia Solidária"
```

## 🧪 Como Testar

Após o setup, teste estas funcionalidades:
1. **Página inicial** - http://localhost:3000
2. **Login/Cadastro** - Botões no header
3. **Agendamento** - Formulário de agendamento
4. **API Health** - http://localhost:3001/api/health

## 🚀 Próximos Passos

Após o setup bem-sucedido:
1. Explore o código no diretório `src/`
2. Veja a documentação completa no `README.md`
3. Use os prompts específicos do `PROMPTS-TRAE-AI.md`
4. Consulte o `CHECKLIST.md` para verificações

## 💡 Dicas Importantes

- **Sempre use a branch `develop`** para desenvolvimento
- **Não commite arquivos .env** (já estão no .gitignore)
- **Use npm run dev** para desenvolvimento
- **Consulte INSTALL.md** para problemas específicos do SO
- **Use SETUP.md** para setup manual se necessário

---

**🎉 Pronto! Com este prompt, qualquer desenvolvedor pode configurar o projeto em minutos usando a IA do Trae!**
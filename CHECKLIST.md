# ✅ Checklist de Verificação - Barbearia Solidária

## 🔍 Verificação Pré-Instalação

### Requisitos do Sistema
- [ ] **Node.js 16+** instalado (`node --version`)
- [ ] **npm** funcionando (`npm --version`)
- [ ] **Git** configurado (`git --version`)
- [ ] **Editor de código** instalado (VS Code recomendado)
- [ ] **Conexão com internet** ativa

---

## 📥 Verificação da Instalação

### 1. Repositório
- [ ] Projeto clonado do GitHub
- [ ] Pasta `barbershop` criada
- [ ] Estrutura de pastas correta:
  ```
  barbershop/
  ├── backend/
  ├── frontend/
  ├── prisma/
  ├── package.json
  └── README.md
  ```

### 2. Dependências
- [ ] **Raiz**: `npm install` executado sem erros
- [ ] **Frontend**: `cd frontend && npm install` executado
- [ ] **Backend**: `cd backend && npm install` executado
- [ ] Pasta `node_modules` criada em cada diretório

### 3. Variáveis de Ambiente
- [ ] Arquivo `.env` criado na **raiz** do projeto
- [ ] Arquivo `.env` criado na pasta **frontend**
- [ ] Todas as variáveis obrigatórias preenchidas:
  - [ ] `DATABASE_URL`
  - [ ] `JWT_SECRET`
  - [ ] `GOOGLE_CLIENT_ID` (se usando OAuth)
  - [ ] `GOOGLE_CLIENT_SECRET` (se usando OAuth)
  - [ ] `REACT_APP_API_URL` (frontend)

---

## 🗄️ Verificação do Banco de Dados

### Prisma
- [ ] `npx prisma generate` executado sem erros
- [ ] `npx prisma db push` executado com sucesso
- [ ] Arquivo `dev.db` criado na raiz
- [ ] `npm run seed` executado (opcional)

### Teste do Banco
```bash
# Execute para verificar se o banco está funcionando
npx prisma studio
```
- [ ] Prisma Studio abre em `http://localhost:5555`
- [ ] Tabelas visíveis na interface
- [ ] Dados de seed carregados (se executou o seed)

---

## 🚀 Verificação da Execução

### Backend (Porta 3001)
```bash
npm run dev:backend
```
- [ ] Servidor inicia sem erros
- [ ] Mensagem "Server running on port 3001" aparece
- [ ] Acesso a `http://localhost:3001` retorna resposta
- [ ] Logs não mostram erros críticos

### Frontend (Porta 3000)
```bash
npm run dev:frontend
```
- [ ] Webpack compila sem erros
- [ ] Mensagem "webpack compiled successfully" aparece
- [ ] Acesso a `http://localhost:3000` carrega a aplicação
- [ ] Interface da barbearia é exibida

### Execução Completa
```bash
npm run dev
```
- [ ] Backend e frontend iniciam simultaneamente
- [ ] Ambos os serviços funcionam sem conflitos
- [ ] Aplicação totalmente funcional

---

## 🌐 Verificação da Interface

### Páginas Principais
- [ ] **Home** (`/`) - Página inicial carrega
- [ ] **Serviços** (`/services`) - Lista de serviços aparece
- [ ] **Agendamento** (`/booking`) - Calendário funciona
- [ ] **Sobre** (`/about`) - Informações da barbearia
- [ ] **Contato** (`/contact`) - Formulário de contato

### Funcionalidades Básicas
- [ ] **Navegação** entre páginas funciona
- [ ] **Responsividade** em diferentes tamanhos de tela
- [ ] **Estilização** Tailwind CSS aplicada corretamente
- [ ] **Ícones** Lucide React carregando

---

## 🔐 Verificação da Autenticação

### Google OAuth (se configurado)
- [ ] Botão "Entrar com Google" aparece
- [ ] Clique redireciona para Google
- [ ] Login funciona sem erros
- [ ] Redirecionamento de volta funciona
- [ ] Usuário logado aparece na interface

### JWT
- [ ] Token gerado após login
- [ ] Rotas protegidas funcionam
- [ ] Logout limpa o token

---

## 📧 Verificação de Notificações

### EmailJS (se configurado)
- [ ] Configuração no `.env` correta
- [ ] Teste de envio de e-mail funciona
- [ ] Templates configurados no EmailJS

---

## 🔧 Verificação de APIs

### Endpoints Principais
Teste com Postman, Insomnia ou curl:

- [ ] `GET http://localhost:3001/api/services` - Lista serviços
- [ ] `GET http://localhost:3001/api/professionals` - Lista profissionais
- [ ] `POST http://localhost:3001/api/appointments` - Cria agendamento
- [ ] `GET http://localhost:3001/api/auth/google` - Inicia OAuth

### Respostas da API
- [ ] Status codes corretos (200, 201, 400, etc.)
- [ ] JSON válido retornado
- [ ] CORS configurado (frontend acessa backend)

---

## 🚨 Verificação de Erros Comuns

### Console do Navegador
- [ ] Sem erros JavaScript críticos
- [ ] Sem erros de CORS
- [ ] Sem erros 404 para recursos
- [ ] Warnings aceitáveis (não críticos)

### Terminal Backend
- [ ] Sem erros de conexão com banco
- [ ] Sem erros de autenticação
- [ ] Logs de requisições aparecem

### Terminal Frontend
- [ ] Webpack compila sem warnings críticos
- [ ] Hot reload funciona
- [ ] Sem erros de importação

---

## 📱 Verificação Mobile

### Responsividade
- [ ] Layout adapta em telas pequenas
- [ ] Botões são clicáveis em touch
- [ ] Texto legível em dispositivos móveis
- [ ] Navegação funciona em mobile

### Teste em Dispositivos
- [ ] Acesso via IP local funciona
- [ ] Performance aceitável em mobile
- [ ] Funcionalidades principais funcionam

---

## 🎯 Verificação Final

### Funcionalidades Completas
- [ ] **Visualizar serviços** - Lista carrega corretamente
- [ ] **Agendar horário** - Processo completo funciona
- [ ] **Escolher profissional** - Seleção funciona
- [ ] **Ver agendamentos** - Lista de agendamentos do usuário
- [ ] **Cancelar agendamento** - Funcionalidade de cancelamento
- [ ] **Perfil do usuário** - Dados e histórico

### Performance
- [ ] Carregamento inicial < 3 segundos
- [ ] Navegação fluida entre páginas
- [ ] Sem travamentos ou lentidão
- [ ] Imagens carregam rapidamente

### Segurança
- [ ] Senhas/tokens não expostos no código
- [ ] HTTPS em produção (se aplicável)
- [ ] Validação de dados funcionando
- [ ] Rate limiting ativo

---

## 🎉 Checklist de Sucesso

Se todos os itens acima estão marcados:

✅ **PARABÉNS!** Sua instalação está completa e funcionando perfeitamente!

### Próximos Passos:
1. 🚀 Comece a desenvolver novas funcionalidades
2. 📚 Leia a documentação completa no README.md
3. 🤝 Configure seu ambiente de desenvolvimento
4. 🔄 Configure CI/CD para deploy automático

---

## 🆘 Se Algo Não Funciona

### Recursos de Ajuda:
1. 📖 Consulte [README.md](./README.md) para documentação completa
2. ⚡ Veja [SETUP.md](./SETUP.md) para instalação rápida
3. 💻 Consulte [INSTALL.md](./INSTALL.md) para seu sistema operacional
4. 🐛 Verifique as issues no GitHub do projeto
5. 💬 Entre em contato com a equipe de desenvolvimento

### Comandos de Reset:
```bash
# Limpar e reinstalar dependências
rm -rf node_modules package-lock.json
npm install

# Resetar banco de dados
npx prisma migrate reset
npx prisma db push
npm run seed

# Limpar cache do npm
npm cache clean --force
```

**🔧 Lembre-se: A maioria dos problemas pode ser resolvida reinstalando as dependências!**
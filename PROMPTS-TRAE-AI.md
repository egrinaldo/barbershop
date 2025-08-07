# 🎯 Coleção de Prompts para IA do Trae - Barbearia Solidária

Esta é uma coleção de prompts específicos para diferentes cenários de desenvolvimento do projeto Barbearia Solidária.

## 🚀 1. Setup Completo

```
Configure completamente o projeto Barbearia Solidária na minha máquina:

1. Clone do GitHub: https://github.com/egrinaldo/barbershop.git (branch develop)
2. Instale todas as dependências (raiz, frontend, backend)
3. Configure arquivos .env usando os exemplos
4. Configure banco de dados Prisma (generate, migrate, seed)
5. Inicie backend (porta 3001) e frontend (porta 3000)
6. Verifique se tudo funciona

Configurações mínimas:
- DATABASE_URL="file:./dev.db"
- JWT_SECRET="barbearia_solidaria_secret"
- PORT=3001
- FRONTEND_URL="http://localhost:3000"
- REACT_APP_API_URL="http://localhost:3001"
```

## 🔧 2. Apenas Instalação

```
Instale todas as dependências do projeto Barbearia Solidária:
- npm install na raiz
- npm install no diretório frontend
- npm install no diretório backend

Verifique se todas as dependências foram instaladas corretamente.
```

## 🗄️ 3. Configuração do Banco

```
Configure o banco de dados do projeto Barbearia Solidária:
1. Execute npx prisma generate
2. Execute npx prisma migrate dev
3. Execute npm run seed para dados iniciais
4. Verifique se o banco foi criado corretamente

Use SQLite como banco padrão (DATABASE_URL="file:./dev.db").
```

## ⚙️ 4. Configuração de Ambiente

```
Crie os arquivos .env necessários para o projeto Barbearia Solidária:

Arquivo .env na raiz:
- DATABASE_URL="file:./dev.db"
- JWT_SECRET="barbearia_solidaria_secret"
- PORT=3001
- FRONTEND_URL="http://localhost:3000"

Arquivo frontend/.env:
- REACT_APP_API_URL="http://localhost:3001"

Use os arquivos .env.example como referência.
```

## 🚀 5. Executar Aplicação

```
Inicie a aplicação Barbearia Solidária:
1. Inicie o backend na porta 3001 (npm start no diretório backend)
2. Inicie o frontend na porta 3000 (npm start no diretório frontend)
3. Verifique se ambos estão rodando sem erros
4. Teste o acesso em http://localhost:3000
```

## 🚨 6. Solução de Problemas

```
Resolva problemas comuns do projeto Barbearia Solidária:
1. Verifique se as portas 3000 e 3001 estão livres
2. Reinstale dependências se necessário
3. Reconfigure o banco de dados
4. Verifique arquivos .env
5. Reinicie os servidores
6. Verifique logs de erro no terminal
```

## 🔄 7. Atualizar Dependências

```
Atualize as dependências do projeto Barbearia Solidária:
1. Execute npm update na raiz
2. Execute npm update no frontend
3. Execute npm update no backend
4. Verifique se não há vulnerabilidades (npm audit)
5. Teste se tudo ainda funciona após as atualizações
```

## 🧪 8. Testar Funcionalidades

```
Teste as principais funcionalidades do projeto Barbearia Solidária:
1. Acesse http://localhost:3000
2. Teste o cadastro/login de usuários
3. Teste o agendamento de serviços
4. Teste a visualização de agendamentos
5. Verifique a API em http://localhost:3001/api/health
6. Teste responsividade mobile
```

## 🔐 9. Configurar Google OAuth

```
Configure Google OAuth no projeto Barbearia Solidária:
1. Acesse Google Cloud Console
2. Crie um projeto ou use existente
3. Ative a Google+ API
4. Crie credenciais OAuth 2.0
5. Configure URLs autorizadas:
   - http://localhost:3000
   - http://localhost:3001/auth/google/callback
6. Adicione GOOGLE_CLIENT_ID no .env
7. Teste o login com Google
```

## 📧 10. Configurar EmailJS

```
Configure EmailJS no projeto Barbearia Solidária:
1. Crie conta no EmailJS
2. Configure um serviço de email
3. Crie um template para notificações
4. Obtenha as chaves:
   - EMAILJS_SERVICE_ID
   - EMAILJS_TEMPLATE_ID
   - EMAILJS_PUBLIC_KEY
5. Adicione no arquivo .env
6. Teste o envio de emails
```

## 🎨 11. Desenvolvimento Frontend

```
Configure ambiente de desenvolvimento frontend:
1. Acesse o diretório frontend
2. Instale dependências (npm install)
3. Configure .env com REACT_APP_API_URL
4. Inicie em modo desenvolvimento (npm start)
5. Configure hot reload
6. Verifique Tailwind CSS
7. Teste componentes React
```

## 🔧 12. Desenvolvimento Backend

```
Configure ambiente de desenvolvimento backend:
1. Acesse o diretório backend
2. Instale dependências (npm install)
3. Configure .env com variáveis necessárias
4. Configure Prisma ORM
5. Inicie servidor (npm start)
6. Teste rotas da API
7. Verifique middleware de autenticação
```

## 📊 13. Análise do Projeto

```
Analise a estrutura do projeto Barbearia Solidária:
1. Examine a arquitetura frontend/backend
2. Analise as dependências utilizadas
3. Verifique a estrutura de pastas
4. Examine os componentes React
5. Analise as rotas da API
6. Verifique o schema do banco de dados
7. Identifique pontos de melhoria
```

## 🚀 14. Deploy em Produção

```
Prepare o projeto Barbearia Solidária para deploy:
1. Configure variáveis de ambiente para produção
2. Configure banco de dados PostgreSQL
3. Execute build do frontend (npm run build)
4. Configure servidor de produção
5. Configure domínio e SSL
6. Teste em ambiente de produção
7. Configure monitoramento
```

## 💡 Como Usar Estes Prompts

### Para Cenários Específicos:
1. **Identifique seu problema** ou necessidade
2. **Encontre o prompt correspondente** nesta lista
3. **Copie o prompt** desejado
4. **Cole no chat da IA** do Trae
5. **Aguarde a execução** automática

### Para Problemas Combinados:
Você pode combinar prompts, por exemplo:
```
Execute os prompts 3 (Configuração do Banco) e 5 (Executar Aplicação) em sequência.
```

### Para Customização:
Modifique os prompts conforme sua necessidade:
- Adicione configurações específicas
- Inclua variáveis de ambiente personalizadas
- Especifique versões de dependências

## 🎯 Prompts de Emergência

### Resetar Tudo:
```
"Pare todos os processos, delete node_modules, reinstale tudo e reconfigure o projeto Barbearia Solidária do zero"
```

### Apenas Reiniciar:
```
"Pare e reinicie apenas os servidores do projeto Barbearia Solidária"
```

### Debug Completo:
```
"Analise todos os logs de erro do projeto Barbearia Solidária e sugira soluções"
```

---

**🎉 Com estes prompts, você pode resolver qualquer situação no desenvolvimento do projeto Barbearia Solidária usando a IA do Trae!**
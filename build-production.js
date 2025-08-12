#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build para produção...\n');

// Função para executar comandos
function runCommand(command, description) {
  console.log(`📦 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} concluído!\n`);
  } catch (error) {
    console.error(`❌ Erro em ${description}:`, error.message);
    process.exit(1);
  }
}

// Função para criar arquivo de configuração
function createProductionConfig() {
  const envContent = `# Configuração de Produção - Barbearia Solidária
# IMPORTANTE: Substitua os valores pelos seus dados reais

# Database
DATABASE_URL="file:./production.db"

# JWT Secret (MUDE ESTE VALOR!)
JWT_SECRET="barbearia_solidaria_production_secret_2024"

# URLs de Produção (SUBSTITUA pelo seu domínio)
PORT=3001
FRONTEND_URL="https://seudominio.infinityfreeapp.com"

# Google OAuth (Configure no Google Console)
GOOGLE_CLIENT_ID="seu_google_client_id_aqui"
GOOGLE_CLIENT_SECRET="seu_google_client_secret_aqui"

# EmailJS (Configure no EmailJS)
EMAILJS_SERVICE_ID="seu_service_id_aqui"
EMAILJS_TEMPLATE_ID="seu_template_id_aqui"
EMAILJS_USER_ID="seu_user_id_aqui"

# Google Maps (Opcional)
GOOGLE_MAPS_API_KEY="sua_api_key_google_maps_aqui"
`;

  fs.writeFileSync('.env.production', envContent);
  console.log('✅ Arquivo .env.production criado!\n');
}

// Função para criar configuração do frontend
function createFrontendProductionConfig() {
  const frontendEnvContent = `# Frontend Production Config
# SUBSTITUA pela URL real da sua API
REACT_APP_API_URL=https://seudominio.infinityfreeapp.com/api
`;

  fs.writeFileSync('frontend/.env.production', frontendEnvContent);
  console.log('✅ Arquivo frontend/.env.production criado!\n');
}

// Função para criar estrutura de deploy
function createDeployStructure() {
  const deployDir = 'deploy';
  
  if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir);
  }
  
  // Criar README para deploy
  const deployReadme = `# 📁 Pasta de Deploy

Esta pasta contém os arquivos prontos para upload:

## 📂 Estrutura:
- \`frontend/\` - Arquivos do React buildado (upload para /htdocs/)
- \`backend/\` - Arquivos do backend (para serviço Node.js)

## 🚀 Próximos Passos:

### Para InfinityFree (Frontend apenas):
1. Faça upload de todos os arquivos da pasta \`frontend/\` para \`/htdocs/\`
2. Configure o backend em um serviço que suporte Node.js

### Para VPS/Servidor completo:
1. Upload de toda a estrutura
2. Configure as variáveis de ambiente
3. Execute \`npm install\` e \`npm start\`

## ⚠️ Importante:
- Verifique as URLs nas configurações
- Configure as variáveis de ambiente
- Teste todas as funcionalidades
`;

  fs.writeFileSync(path.join(deployDir, 'README.md'), deployReadme);
  console.log('✅ Estrutura de deploy criada!\n');
}

// Executar build
async function main() {
  try {
    // 1. Criar configurações de produção
    console.log('📝 Criando configurações de produção...');
    createProductionConfig();
    createFrontendProductionConfig();
    
    // 2. Instalar dependências se necessário
    runCommand('npm install', 'Verificando dependências raiz');
    runCommand('cd frontend && npm install', 'Verificando dependências frontend');
    
    // 3. Gerar Prisma Client
    runCommand('npx prisma generate', 'Gerando Prisma Client');
    
    // 4. Build do frontend
    runCommand('cd frontend && npm run build', 'Build do Frontend React');
    
    // 5. Criar estrutura de deploy
    createDeployStructure();
    
    // 6. Copiar arquivos para deploy
    console.log('📁 Organizando arquivos para deploy...');
    
    // Criar diretórios
    const deployFrontend = 'deploy/frontend';
    const deployBackend = 'deploy/backend';
    
    if (fs.existsSync('deploy/frontend')) {
      execSync('rmdir /s /q deploy\\frontend', { stdio: 'inherit' });
    }
    if (fs.existsSync('deploy/backend')) {
      execSync('rmdir /s /q deploy\\backend', { stdio: 'inherit' });
    }
    
    fs.mkdirSync(deployFrontend, { recursive: true });
    fs.mkdirSync(deployBackend, { recursive: true });
    
    // Copiar frontend build
    execSync(`xcopy frontend\\build\\* deploy\\frontend\\ /E /I /Y`, { stdio: 'inherit' });
    
    // Copiar backend
    execSync(`xcopy backend\\* deploy\\backend\\ /E /I /Y`, { stdio: 'inherit' });
    execSync(`copy package.json deploy\\`, { stdio: 'inherit' });
    execSync(`copy .env.production deploy\\.env`, { stdio: 'inherit' });
    execSync(`xcopy prisma deploy\\prisma\\ /E /I /Y`, { stdio: 'inherit' });
    
    console.log('\n🎉 Build de produção concluído com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('1. ⚙️  Configure as variáveis em .env.production');
    console.log('2. ⚙️  Configure as variáveis em frontend/.env.production');
    console.log('3. 📁 Verifique os arquivos na pasta deploy/');
    console.log('4. 🚀 Siga o guia em DEPLOY-INFINITYFREE.md');
    console.log('\n📖 Documentação completa: DEPLOY-INFINITYFREE.md');
    
  } catch (error) {
    console.error('❌ Erro durante o build:', error.message);
    process.exit(1);
  }
}

main();
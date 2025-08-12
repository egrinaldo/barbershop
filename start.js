#!/usr/bin/env node

console.log('🚀 Iniciando aplicação...');
console.log('📍 NODE_ENV:', process.env.NODE_ENV);
console.log('📍 DATABASE_URL:', process.env.DATABASE_URL ? 'Configurado' : 'Não configurado');

async function start() {
  try {
    // Verificar se estamos no diretório correto
    const fs = require('fs');
    const path = require('path');
    
    console.log('📍 Diretório atual:', process.cwd());
    console.log('📁 Arquivos no diretório:', fs.readdirSync('.').slice(0, 10));
    
    if (!fs.existsSync('backend/index.js')) {
      console.error('❌ Arquivo backend/index.js não encontrado!');
      process.exit(1);
    }

    // Executar migrações apenas em produção
    if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
      console.log('🔄 Tentando executar migrações...');
      try {
        const { exec } = require('child_process');
        await new Promise((resolve, reject) => {
          exec('npx prisma migrate deploy', { timeout: 60000 }, (error, stdout, stderr) => {
            if (error) {
              console.warn('⚠️ Migrate falhou, mas continuando...', error.message);
            } else {
              console.log('✅ Migrações executadas');
            }
            resolve(); // Sempre continuar
          });
        });
      } catch (error) {
        console.warn('⚠️ Erro nas migrações, mas continuando...', error.message);
      }
    }

    // Iniciar servidor diretamente
    console.log('🌟 Iniciando servidor...');
    require('./backend/index.js');

  } catch (error) {
    console.error('❌ Erro durante inicialização:', error.message);
    console.error('📋 Stack trace:', error.stack);
    
    // Fallback final - tentar iniciar servidor diretamente
    console.log('🔄 Fallback: iniciando servidor diretamente...');
    try {
      require('./backend/index.js');
    } catch (fallbackError) {
      console.error('❌ Fallback falhou:', fallbackError.message);
      process.exit(1);
    }
  }
}

start();
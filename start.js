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

    // Tentar gerar cliente Prisma de forma mais simples
    if (process.env.NODE_ENV === 'production') {
      console.log('🔧 Tentando gerar cliente Prisma...');
      try {
        const { exec } = require('child_process');
        await new Promise((resolve, reject) => {
          exec('npx prisma generate', { timeout: 30000 }, (error, stdout, stderr) => {
            if (error) {
              console.warn('⚠️ Prisma generate falhou, mas continuando...', error.message);
              resolve(); // Não falhar
            } else {
              console.log('✅ Prisma generate executado');
              resolve();
            }
          });
        });
      } catch (error) {
        console.warn('⚠️ Erro no Prisma generate, mas continuando...', error.message);
      }

      // Tentar executar migrações
      if (process.env.DATABASE_URL) {
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
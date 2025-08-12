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

    // Forçar regeneração do Prisma Client em produção
    const prismaClientPath = path.join('node_modules', '.prisma', 'client');
    
    if (process.env.NODE_ENV === 'production') {
      console.log('🔧 Ambiente de produção detectado - forçando regeneração do Prisma Client...');
      
      // Remover Prisma Client existente se houver
      if (fs.existsSync(prismaClientPath)) {
        console.log('🗑️ Removendo Prisma Client existente...');
        try {
          fs.rmSync(prismaClientPath, { recursive: true, force: true });
          console.log('✅ Prisma Client removido');
        } catch (error) {
          console.warn('⚠️ Erro ao remover Prisma Client:', error.message);
        }
      }
      
      // Regenerar Prisma Client
      console.log('🔧 Regenerando Prisma Client...');
      try {
        const { exec } = require('child_process');
        await new Promise((resolve, reject) => {
          exec('npx prisma generate', { timeout: 120000 }, (error, stdout, stderr) => {
            if (error) {
              console.warn('⚠️ Prisma generate falhou, mas continuando...', error.message);
              console.warn('📋 Stderr:', stderr);
            } else {
              console.log('✅ Prisma Client regenerado com sucesso!');
              console.log('📋 Output:', stdout);
            }
            resolve(); // Sempre continuar
          });
        });
      } catch (error) {
        console.warn('⚠️ Erro ao regenerar Prisma Client, mas continuando...', error.message);
      }
    } else {
      // Em desenvolvimento, apenas verificar se existe
      if (!fs.existsSync(prismaClientPath)) {
        console.log('🔧 Prisma Client não encontrado, tentando gerar...');
        try {
          const { exec } = require('child_process');
          await new Promise((resolve, reject) => {
            exec('npx prisma generate', { timeout: 60000 }, (error, stdout, stderr) => {
              if (error) {
                console.warn('⚠️ Prisma generate falhou, mas continuando...', error.message);
              } else {
                console.log('✅ Prisma Client gerado com sucesso!');
              }
              resolve(); // Sempre continuar
            });
          });
        } catch (error) {
          console.warn('⚠️ Erro ao gerar Prisma Client, mas continuando...', error.message);
        }
      } else {
        console.log('✅ Prisma Client já existe');
      }
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
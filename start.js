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

    // Verificar e gerar Prisma Client usando API JavaScript
    const prismaClientPath = path.join('node_modules', '.prisma', 'client');
    
    console.log('🔧 Verificando Prisma Client...');
    
    // Sempre tentar gerar em produção para garantir binaryTargets corretos
    if (process.env.NODE_ENV === 'production' || !fs.existsSync(prismaClientPath)) {
      console.log('🔧 Gerando Prisma Client usando API JavaScript...');
      
      try {
        // Usar a API do Prisma diretamente
        const { generateClient } = require('prisma/build/index.js');
        
        await generateClient({
          schemaPath: path.join(process.cwd(), 'prisma', 'schema.prisma'),
          binaryTargets: ['native', 'debian-openssl-3.0.x'],
          generator: {
            name: 'client',
            provider: 'prisma-client-js',
            output: prismaClientPath,
            binaryTargets: ['native', 'debian-openssl-3.0.x']
          }
        });
        
        console.log('✅ Prisma Client gerado com sucesso usando API JavaScript!');
      } catch (apiError) {
        console.warn('⚠️ API JavaScript falhou, tentando método alternativo...', apiError.message);
        
        // Fallback: tentar usar node diretamente
        try {
          const { spawn } = require('child_process');
          await new Promise((resolve, reject) => {
            const child = spawn('node', [
              path.join('node_modules', 'prisma', 'build', 'index.js'),
              'generate'
            ], {
              stdio: 'pipe',
              timeout: 120000
            });
            
            child.stdout.on('data', (data) => {
              console.log('📋 Prisma output:', data.toString());
            });
            
            child.stderr.on('data', (data) => {
              console.warn('📋 Prisma stderr:', data.toString());
            });
            
            child.on('close', (code) => {
              if (code === 0) {
                console.log('✅ Prisma Client gerado com sucesso usando node direto!');
              } else {
                console.warn('⚠️ Prisma generate falhou com código:', code);
              }
              resolve();
            });
            
            child.on('error', (error) => {
              console.warn('⚠️ Erro ao executar prisma generate:', error.message);
              resolve();
            });
          });
        } catch (fallbackError) {
          console.warn('⚠️ Todos os métodos de geração falharam, mas continuando...', fallbackError.message);
        }
      }
    } else {
      console.log('✅ Prisma Client já existe');
    }

    // Executar migrações apenas em produção
    if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
      console.log('🔄 Tentando executar migrações...');
      try {
        const { spawn } = require('child_process');
        await new Promise((resolve, reject) => {
          const child = spawn('node', [
            path.join('node_modules', 'prisma', 'build', 'index.js'),
            'migrate',
            'deploy'
          ], {
            stdio: 'pipe',
            timeout: 120000
          });
          
          child.stdout.on('data', (data) => {
            console.log('📋 Migrate output:', data.toString());
          });
          
          child.stderr.on('data', (data) => {
            console.warn('📋 Migrate stderr:', data.toString());
          });
          
          child.on('close', (code) => {
            if (code === 0) {
              console.log('✅ Migrações executadas com sucesso!');
            } else {
              console.warn('⚠️ Migrate falhou com código:', code, 'mas continuando...');
            }
            resolve();
          });
          
          child.on('error', (error) => {
            console.warn('⚠️ Erro ao executar migrações:', error.message, 'mas continuando...');
            resolve();
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
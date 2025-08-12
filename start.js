#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando aplicação...');
console.log('📍 NODE_ENV:', process.env.NODE_ENV);
console.log('📍 DATABASE_URL:', process.env.DATABASE_URL ? 'Configurado' : 'Não configurado');

// Função para executar comandos
function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`📦 Executando: ${command} ${args.join(' ')}`);
    
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Comando executado com sucesso: ${command} ${args.join(' ')}`);
        resolve();
      } else {
        console.error(`❌ Comando falhou com código ${code}: ${command} ${args.join(' ')}`);
        reject(new Error(`Comando falhou com código ${code}`));
      }
    });

    child.on('error', (error) => {
      console.error(`❌ Erro ao executar comando: ${error.message}`);
      reject(error);
    });
  });
}

async function start() {
  try {
    // Verificar se estamos no diretório correto
    const fs = require('fs');
    if (!fs.existsSync('backend/index.js')) {
      console.error('❌ Arquivo backend/index.js não encontrado!');
      console.log('📍 Diretório atual:', process.cwd());
      console.log('📁 Arquivos no diretório:', fs.readdirSync('.'));
      process.exit(1);
    }

    // 1. Gerar cliente Prisma primeiro
    console.log('🔧 Gerando cliente Prisma...');
    try {
      await runCommand('npx', ['prisma', 'generate']);
    } catch (generateError) {
      console.warn('⚠️ Aviso: Falha ao gerar cliente Prisma, tentando continuar...', generateError.message);
      // Continuar mesmo se falhar - pode já estar gerado
    }

    // 2. Executar prisma migrate deploy (se necessário)
    if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
      console.log('🔄 Executando migrações do banco...');
      try {
        await runCommand('npx', ['prisma', 'migrate', 'deploy']);
      } catch (migrateError) {
        console.warn('⚠️ Aviso: Falha na migração, mas continuando...', migrateError.message);
        // Não falhar se a migração der erro - pode ser que já esteja aplicada
      }
    } else {
      console.log('⏭️ Pulando migrações (não é produção ou DATABASE_URL não configurado)');
    }

    // 3. Iniciar servidor
    console.log('🌟 Iniciando servidor...');
    await runCommand('node', ['backend/index.js']);

  } catch (error) {
    console.error('❌ Erro durante inicialização:', error.message);
    console.error('📋 Stack trace:', error.stack);
    
    // Tentar iniciar o servidor diretamente como fallback
    console.log('🔄 Tentando iniciar servidor diretamente como fallback...');
    try {
      await runCommand('node', ['backend/index.js']);
    } catch (fallbackError) {
      console.error('❌ Fallback também falhou:', fallbackError.message);
      process.exit(1);
    }
  }
}

start();
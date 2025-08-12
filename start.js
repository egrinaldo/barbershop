#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando aplicação...');

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
        resolve();
      } else {
        reject(new Error(`Comando falhou com código ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function start() {
  try {
    // 1. Executar prisma migrate deploy (se necessário)
    if (process.env.NODE_ENV === 'production') {
      console.log('🔄 Executando migrações do banco...');
      await runCommand('npx', ['prisma', 'migrate', 'deploy']);
    }

    // 2. Gerar cliente Prisma
    console.log('🔧 Gerando cliente Prisma...');
    await runCommand('npx', ['prisma', 'generate']);

    // 3. Iniciar servidor
    console.log('🌟 Iniciando servidor...');
    await runCommand('node', ['backend/index.js']);

  } catch (error) {
    console.error('❌ Erro durante inicialização:', error.message);
    process.exit(1);
  }
}

start();
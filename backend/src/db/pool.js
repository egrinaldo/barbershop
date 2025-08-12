const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/db';

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Teste de conexão
pool.on('connect', () => {
  console.log('🐘 Conectado ao PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Erro na conexão PostgreSQL:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
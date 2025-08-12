const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/db';

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const createTables = async () => {
  try {
    console.log('🔄 Criando tabelas no PostgreSQL...');

    // Criar tabela users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        phone TEXT,
        avatar TEXT,
        "googleId" TEXT UNIQUE,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criar tabela services
    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        duration INTEGER NOT NULL,
        active BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criar tabela professionals
    await pool.query(`
      CREATE TABLE IF NOT EXISTS professionals (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        specialty TEXT,
        avatar TEXT,
        active BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criar tabela appointments
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id TEXT PRIMARY KEY,
        date TIMESTAMP NOT NULL,
        "startTime" TEXT NOT NULL,
        "endTime" TEXT NOT NULL,
        status TEXT DEFAULT 'scheduled',
        notes TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        "serviceId" TEXT NOT NULL REFERENCES services(id),
        "professionalId" TEXT REFERENCES professionals(id)
      );
    `);

    // Criar tabela availabilities
    await pool.query(`
      CREATE TABLE IF NOT EXISTS availabilities (
        id TEXT PRIMARY KEY,
        "dayOfWeek" INTEGER NOT NULL,
        "startTime" TEXT NOT NULL,
        "endTime" TEXT NOT NULL,
        active BOOLEAN DEFAULT true,
        "professionalId" TEXT NOT NULL REFERENCES professionals(id) ON DELETE CASCADE
      );
    `);

    console.log('✅ Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar tabelas:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

if (require.main === module) {
  createTables();
}

module.exports = createTables;
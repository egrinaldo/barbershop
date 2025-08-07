const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Listar todos os serviços ativos
router.get('/', optionalAuth, async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { name: 'asc' }
    });

    res.json(services);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar serviço por ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id, active: true }
    });

    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    res.json(service);
  } catch (error) {
    console.error('Erro ao buscar serviço:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
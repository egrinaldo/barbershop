const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Listar todos os profissionais ativos
router.get('/', optionalAuth, async (req, res) => {
  try {
    const professionals = await prisma.professional.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        specialty: true,
        avatar: true
      },
      orderBy: { name: 'asc' }
    });

    res.json(professionals);
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar profissional por ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const professional = await prisma.professional.findUnique({
      where: { id, active: true },
      select: {
        id: true,
        name: true,
        specialty: true,
        avatar: true,
        availabilities: true
      }
    });

    if (!professional) {
      return res.status(404).json({ error: 'Profissional não encontrado' });
    }

    res.json(professional);
  } catch (error) {
    console.error('Erro ao buscar profissional:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
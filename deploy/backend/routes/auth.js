const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Rota para iniciar autenticação Google
router.get('/google', (req, res, next) => {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  
  if (!googleClientId || googleClientId === 'seu_google_client_id_aqui') {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=google_not_configured`);
  }
  
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })(req, res, next);
});

// Callback do Google OAuth
router.get('/google/callback', (req, res, next) => {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  
  if (!googleClientId || googleClientId === 'seu_google_client_id_aqui') {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=google_not_configured`);
  }
  
  passport.authenticate('google', { session: false })(req, res, next);
}, async (req, res) => {
    try {
      // Gerar token JWT
      const token = jwt.sign(
        { 
          userId: req.user.id, 
          email: req.user.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Redirecionar para o frontend com o token
      res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
    } catch (error) {
      console.error('Erro no callback Google:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
  }
);

// Endpoint de login demo removido - apenas Google OAuth é suportado

// Login/Registro com Google OAuth
router.post('/google', async (req, res) => {
  try {
    const { email, name, googleId, avatar } = req.body;

    if (!email || !name || !googleId) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos' });
    }

    // Verificar se o usuário já existe
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Criar novo usuário
      user = await prisma.user.create({
        data: {
          email,
          name,
          googleId,
          avatar
        }
      });
    } else {
      // Atualizar dados do usuário existente
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name,
          googleId,
          avatar
        }
      });
    }

    // Gerar JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        avatar: user.avatar,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Erro no login Google:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Verificar token
router.get('/verify', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Rota para obter dados do usuário autenticado
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Usuário não encontrado' 
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Logout (invalidar token no frontend)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logout realizado com sucesso' });
});

module.exports = router;
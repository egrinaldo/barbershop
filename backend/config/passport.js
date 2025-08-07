const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Verificar se as credenciais do Google estão configuradas
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || googleClientId === 'seu_google_client_id_aqui' || 
    !googleClientSecret || googleClientSecret === 'seu_google_client_secret_aqui') {
  console.warn('⚠️  Google OAuth não configurado. Usando modo de desenvolvimento.');
  console.warn('   Para usar Google OAuth, configure GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET no arquivo .env');
} else {
  console.log('✅ Google OAuth configurado com sucesso!');
  passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "/api/auth/google/callback"
  }, async (accessToken, refreshToken, profile, done) => {
  try {
    // Verificar se o usuário já existe
    let user = await prisma.user.findUnique({
      where: { googleId: profile.id }
    });

    if (user) {
      // Usuário já existe, retornar
      return done(null, user);
    }

    // Verificar se existe usuário com o mesmo email
    const existingUser = await prisma.user.findUnique({
      where: { email: profile.emails[0].value }
    });

    if (existingUser) {
      // Atualizar usuário existente com Google ID
      user = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          googleId: profile.id,
          avatar: profile.photos[0]?.value
        }
      });
      return done(null, user);
    }

    // Criar novo usuário
    user = await prisma.user.create({
      data: {
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0]?.value
      }
    });

    return done(null, user);
  } catch (error) {
    console.error('Erro na autenticação Google:', error);
    return done(error, null);
  }
  }));
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
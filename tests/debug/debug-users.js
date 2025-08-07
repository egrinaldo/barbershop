const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./dev.db'
    }
  }
});

async function debugUsers() {
  try {
    console.log('🔍 Verificando usuários e agendamentos...');
    
    // Buscar todos os usuários
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });
    
    console.log('\n👥 Usuários encontrados:');
    users.forEach((user, index) => {
      console.log(`  ${index + 1}. ID: ${user.id}`);
      console.log(`     Email: ${user.email}`);
      console.log(`     Nome: ${user.name}`);
      console.log(`     Criado em: ${user.createdAt}`);
      console.log('');
    });
    
    // Buscar todos os agendamentos com detalhes
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: { id: true, email: true, name: true }
        },
        service: {
          select: { id: true, name: true, price: true }
        },
        professional: {
          select: { id: true, name: true }
        }
      }
    });
    
    console.log('\n📅 Agendamentos encontrados:');
    appointments.forEach((apt, index) => {
      console.log(`  ${index + 1}. ID: ${apt.id}`);
      console.log(`     Usuário: ${apt.user.name} (${apt.user.email}) - ID: ${apt.user.id}`);
      console.log(`     Serviço: ${apt.service.name}`);
      console.log(`     Profissional: ${apt.professional.name}`);
      console.log(`     Data: ${apt.date}`);
      console.log(`     Horário: ${apt.startTime} - ${apt.endTime}`);
      console.log(`     Status: ${apt.status}`);
      console.log('');
    });
    
    console.log('✅ Debug concluído!');
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugUsers();
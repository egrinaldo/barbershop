const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./dev.db'
    }
  }
});

async function testAppointments() {
  try {
    console.log('🔍 Testando conexão com o banco...');
    
    // Verificar se existem serviços
    const services = await prisma.service.findMany();
    console.log(`📋 Serviços encontrados: ${services.length}`);
    
    // Verificar se existem usuários
    const users = await prisma.user.findMany();
    console.log(`👥 Usuários encontrados: ${users.length}`);
    
    // Verificar se existem profissionais
    const professionals = await prisma.professional.findMany();
    console.log(`👨‍💼 Profissionais encontrados: ${professionals.length}`);
    
    // Verificar se existem agendamentos
    const appointments = await prisma.appointment.findMany({
      include: {
        service: true,
        professional: true,
        user: true
      }
    });
    console.log(`📅 Agendamentos encontrados: ${appointments.length}`);
    
    if (appointments.length > 0) {
      console.log('📋 Detalhes dos agendamentos:');
      appointments.forEach((apt, index) => {
        console.log(`  ${index + 1}. ${apt.service.name} - ${apt.date} ${apt.startTime} (${apt.status})`);
      });
    }
    
    console.log('✅ Teste concluído!');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAppointments();
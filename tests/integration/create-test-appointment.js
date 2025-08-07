const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./dev.db'
    }
  }
});

async function createTestAppointment() {
  try {
    console.log('📅 Criando agendamento de teste...');
    
    // Buscar dados necessários
    const user = await prisma.user.findFirst();
    const service = await prisma.service.findFirst();
    const professional = await prisma.professional.findFirst();
    
    if (!user || !service || !professional) {
      console.log('❌ Dados necessários não encontrados');
      return;
    }
    
    console.log(`👤 Usuário: ${user.name}`);
    console.log(`💼 Serviço: ${service.name}`);
    console.log(`👨‍💼 Profissional: ${professional.name}`);
    
    // Criar agendamento para amanhã
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    
    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        serviceId: service.id,
        professionalId: professional.id,
        date: dateStr,
        startTime: '10:00',
        endTime: '10:30',
        status: 'scheduled',
        notes: 'Agendamento de teste criado automaticamente'
      },
      include: {
        service: true,
        professional: true,
        user: true
      }
    });
    
    console.log('✅ Agendamento criado com sucesso!');
    console.log(`📋 ID: ${appointment.id}`);
    console.log(`📅 Data: ${appointment.date}`);
    console.log(`⏰ Horário: ${appointment.startTime} - ${appointment.endTime}`);
    console.log(`📝 Status: ${appointment.status}`);
    
  } catch (error) {
    console.error('❌ Erro ao criar agendamento:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestAppointment();
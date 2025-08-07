const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestAppointments() {
  try {
    console.log('🔍 Verificando usuários existentes...');
    
    // Buscar um usuário existente
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log('❌ Nenhum usuário encontrado. Execute o seed primeiro.');
      return;
    }
    
    console.log('👤 Usuário encontrado:', user.name, user.id);
    
    // Buscar serviços existentes
    const services = await prisma.service.findMany({ where: { active: true } });
    if (services.length === 0) {
      console.log('❌ Nenhum serviço encontrado. Execute o seed primeiro.');
      return;
    }
    
    console.log('✂️ Serviços encontrados:', services.length);
    
    // Buscar profissionais existentes
    const professionals = await prisma.professional.findMany({ where: { active: true } });
    console.log('👨‍💼 Profissionais encontrados:', professionals.length);
    
    // Criar agendamentos de teste
    const testAppointments = [
      {
        date: new Date('2025-08-10'),
        startTime: '09:00',
        endTime: '10:00',
        status: 'scheduled',
        notes: 'Agendamento de teste 1',
        userId: user.id,
        serviceId: services[0].id,
        professionalId: professionals.length > 0 ? professionals[0].id : null
      },
      {
        date: new Date('2025-08-12'),
        startTime: '14:00',
        endTime: '15:30',
        status: 'scheduled',
        notes: 'Agendamento de teste 2',
        userId: user.id,
        serviceId: services[0].id,
        professionalId: professionals.length > 0 ? professionals[0].id : null
      },
      {
        date: new Date('2025-08-05'),
        startTime: '10:00',
        endTime: '11:00',
        status: 'completed',
        notes: 'Agendamento concluído',
        userId: user.id,
        serviceId: services[0].id,
        professionalId: professionals.length > 0 ? professionals[0].id : null
      }
    ];
    
    console.log('📅 Criando agendamentos de teste...');
    
    for (const appointment of testAppointments) {
      const created = await prisma.appointment.create({
        data: appointment,
        include: {
          service: true,
          professional: true,
          user: { select: { name: true, email: true } }
        }
      });
      
      console.log(`✅ Agendamento criado: ${created.date.toISOString().split('T')[0]} ${created.startTime} - ${created.service.name}`);
    }
    
    // Verificar total de agendamentos
    const total = await prisma.appointment.count();
    console.log(`📊 Total de agendamentos no banco: ${total}`);
    
  } catch (error) {
    console.error('❌ Erro ao criar agendamentos de teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestAppointments();
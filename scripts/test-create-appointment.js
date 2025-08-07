const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testCreateAppointment() {
  try {
    console.log('🔍 Buscando dados necessários...');
    
    // Buscar um usuário existente
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log('❌ Nenhum usuário encontrado');
      return;
    }
    console.log(`✅ Usuário encontrado: ${user.name} (${user.id})`);
    
    // Buscar um serviço ativo
    const service = await prisma.service.findFirst({
      where: { active: true }
    });
    if (!service) {
      console.log('❌ Nenhum serviço ativo encontrado');
      return;
    }
    console.log(`✅ Serviço encontrado: ${service.name} (${service.id})`);
    
    // Buscar um profissional
    const professional = await prisma.professional.findFirst();
    console.log(`✅ Profissional encontrado: ${professional?.name || 'Nenhum'} (${professional?.id || 'N/A'})`);
    
    // Criar um agendamento para amanhã
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const appointmentDate = tomorrow.toISOString().split('T')[0];
    
    const startTime = '14:00';
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + service.duration;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    const endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
    
    console.log(`📅 Criando agendamento para ${appointmentDate} das ${startTime} às ${endTime}`);
    
    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(appointmentDate),
        startTime,
        endTime,
        notes: 'Agendamento de teste criado via script',
        userId: user.id,
        serviceId: service.id,
        professionalId: professional?.id || null,
        status: 'scheduled'
      },
      include: {
        service: true,
        professional: true,
        user: {
          select: { id: true, name: true, email: true, phone: true }
        }
      }
    });
    
    console.log('✅ Agendamento criado com sucesso!');
    console.log('📋 Detalhes do agendamento:');
    console.log(`   ID: ${appointment.id}`);
    console.log(`   Data: ${appointment.date.toISOString().split('T')[0]}`);
    console.log(`   Horário: ${appointment.startTime} - ${appointment.endTime}`);
    console.log(`   Serviço: ${appointment.service.name}`);
    console.log(`   Profissional: ${appointment.professional?.name || 'Qualquer profissional'}`);
    console.log(`   Cliente: ${appointment.user.name}`);
    console.log(`   Status: ${appointment.status}`);
    
    // Verificar quantos agendamentos o usuário tem agora
    const userAppointments = await prisma.appointment.findMany({
      where: { userId: user.id },
      include: {
        service: true,
        professional: true
      },
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' }
      ]
    });
    
    console.log(`\n📊 Total de agendamentos do usuário ${user.name}: ${userAppointments.length}`);
    userAppointments.forEach((apt, index) => {
      console.log(`   ${index + 1}. ${apt.date.toISOString().split('T')[0]} ${apt.startTime} - ${apt.service.name} (${apt.status})`);
    });
    
  } catch (error) {
    console.error('❌ Erro ao criar agendamento:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCreateAppointment();
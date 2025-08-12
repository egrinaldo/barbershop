require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados PostgreSQL...');

  try {
    // Limpar dados existentes (ordem importante devido às foreign keys)
    await prisma.appointment.deleteMany();
    await prisma.availability.deleteMany();
    await prisma.professional.deleteMany();
    await prisma.service.deleteMany();
    await prisma.user.deleteMany();

    // Criar serviços
    const services = await Promise.all([
      prisma.service.create({
        data: {
          name: 'Corte Masculino',
          description: 'Corte de cabelo masculino tradicional ou moderno, com acabamento profissional.',
          price: 25.00,
          duration: 30,
          active: true
        }
      }),
      prisma.service.create({
        data: {
          name: 'Barba Completa',
          description: 'Aparar e modelar barba com navalha, incluindo hidratação e finalização.',
          price: 20.00,
          duration: 25,
          active: true
        }
      }),
      prisma.service.create({
        data: {
          name: 'Corte + Barba',
          description: 'Combo completo: corte de cabelo + barba aparada e modelada.',
          price: 40.00,
          duration: 50,
          active: true
        }
      }),
      prisma.service.create({
        data: {
          name: 'Corte Infantil',
          description: 'Corte especial para crianças até 12 anos, com paciência e carinho.',
          price: 20.00,
          duration: 25,
          active: true
        }
      }),
      prisma.service.create({
        data: {
          name: 'Tratamento Capilar',
          description: 'Hidratação e tratamento para cabelos ressecados ou danificados.',
          price: 35.00,
          duration: 45,
          active: true
        }
      }),
      prisma.service.create({
        data: {
          name: 'Bigode',
          description: 'Aparar e modelar bigode com precisão e estilo.',
          price: 15.00,
          duration: 15,
          active: true
        }
      })
    ]);

    console.log(`✅ Criados ${services.length} serviços`);

    // Criar profissionais
    const professionals = await Promise.all([
      prisma.professional.create({
        data: {
          name: 'João Silva',
          email: 'joao@barbeariasolidaria.com',
          phone: '(11) 99999-0001',
          specialty: 'Cortes clássicos e modernos',
          active: true
        }
      }),
      prisma.professional.create({
        data: {
          name: 'Carlos Santos',
          email: 'carlos@barbeariasolidaria.com',
          phone: '(11) 99999-0002',
          specialty: 'Especialista em barbas',
          active: true
        }
      }),
      prisma.professional.create({
        data: {
          name: 'Pedro Oliveira',
          email: 'pedro@barbeariasolidaria.com',
          phone: '(11) 99999-0003',
          specialty: 'Cortes infantis e tratamentos',
          active: true
        }
      })
    ]);

    console.log(`✅ Criados ${professionals.length} profissionais`);

    // Criar disponibilidades para os profissionais
    const daysOfWeek = [1, 2, 3, 4, 5, 6]; // Segunda a Sábado
    const timeSlots = [
      { start: '09:00', end: '12:00' },
      { start: '13:00', end: '18:00' }
    ];

    for (const professional of professionals) {
      for (const day of daysOfWeek) {
        for (const slot of timeSlots) {
          await prisma.availability.create({
            data: {
              professionalId: professional.id,
              dayOfWeek: day,
              startTime: slot.start,
              endTime: slot.end,
              active: true
            }
          });
        }
      }
    }

    // Sábado tem horário diferente (até 17h)
    for (const professional of professionals) {
      await prisma.availability.updateMany({
        where: {
          professionalId: professional.id,
          dayOfWeek: 6,
          startTime: '13:00'
        },
        data: {
          endTime: '17:00'
        }
      });
    }

    console.log('✅ Criadas disponibilidades para todos os profissionais');

    // Criar usuário de exemplo
    const user = await prisma.user.create({
      data: {
        email: 'cliente@exemplo.com',
        name: 'Cliente Exemplo',
        phone: '(11) 99999-9999',
        avatar: null
      }
    });

    console.log('✅ Criado usuário de exemplo');

    // Criar alguns agendamentos de exemplo
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const appointments = await Promise.all([
      prisma.appointment.create({
        data: {
          userId: user.id,
          serviceId: services[0].id, // Corte Masculino
          professionalId: professionals[0].id,
          date: tomorrow,
          startTime: '10:00',
          endTime: '10:30',
          status: 'scheduled',
          notes: 'Primeiro agendamento de exemplo'
        }
      }),
      prisma.appointment.create({
        data: {
          userId: user.id,
          serviceId: services[2].id, // Corte + Barba
          professionalId: professionals[1].id,
          date: nextWeek,
          startTime: '14:00',
          endTime: '14:50',
          status: 'scheduled',
          notes: 'Combo completo'
        }
      })
    ]);

    console.log(`✅ Criados ${appointments.length} agendamentos de exemplo`);

    console.log('\n🎉 Seed concluído com sucesso!');
    console.log('\n📊 Resumo:');
    console.log(`   • ${services.length} serviços`);
    console.log(`   • ${professionals.length} profissionais`);
    console.log(`   • 1 usuário de exemplo`);
    console.log(`   • ${appointments.length} agendamentos de exemplo`);
    console.log(`   • Disponibilidades configuradas para todos os profissionais`);

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

module.exports = main;
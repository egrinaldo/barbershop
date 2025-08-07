const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const emailjs = require('emailjs-com');

const prisma = new PrismaClient();

// Configuração do EmailJS
const EMAILJS_CONFIG = {
  serviceID: process.env.EMAILJS_SERVICE_ID,
  templateID: process.env.EMAILJS_TEMPLATE_ID,
  userID: process.env.EMAILJS_USER_ID
};

// Função para enviar lembrete por email
const sendEmailReminder = async (appointment) => {
  try {
    const templateParams = {
      to_name: appointment.user.name,
      to_email: appointment.user.email,
      service_name: appointment.service.name,
      appointment_date: appointment.date.toLocaleDateString('pt-BR'),
      appointment_time: appointment.startTime,
      professional_name: appointment.professional?.name || 'Qualquer profissional',
      barbershop_name: 'Barbearia Solidária'
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      templateParams,
      EMAILJS_CONFIG.userID
    );

    console.log(`✅ Lembrete enviado para ${appointment.user.email}`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao enviar lembrete para ${appointment.user.email}:`, error);
    return false;
  }
};

// Função para buscar agendamentos que precisam de lembrete
const getAppointmentsForReminder = async (hoursAhead) => {
  const now = new Date();
  const reminderTime = new Date(now.getTime() + (hoursAhead * 60 * 60 * 1000));
  
  // Buscar agendamentos para o horário específico
  const startOfHour = new Date(reminderTime);
  startOfHour.setMinutes(0, 0, 0);
  
  const endOfHour = new Date(reminderTime);
  endOfHour.setMinutes(59, 59, 999);

  const appointments = await prisma.appointment.findMany({
    where: {
      status: 'scheduled',
      date: {
        gte: startOfHour,
        lte: endOfHour
      }
    },
    include: {
      user: {
        select: { name: true, email: true, phone: true }
      },
      service: {
        select: { name: true, duration: true }
      },
      professional: {
        select: { name: true }
      }
    }
  });

  return appointments;
};

// Função para enviar lembretes
const sendReminders = async (hoursAhead) => {
  try {
    const appointments = await getAppointmentsForReminder(hoursAhead);
    
    if (appointments.length === 0) {
      console.log(`📅 Nenhum agendamento encontrado para lembrete de ${hoursAhead}h`);
      return;
    }

    console.log(`📧 Enviando ${appointments.length} lembrete(s) de ${hoursAhead}h...`);

    for (const appointment of appointments) {
      await sendEmailReminder(appointment);
      // Pequena pausa entre envios para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error('Erro ao enviar lembretes:', error);
  }
};

// Função para enviar notificação push (usando Web Push API)
const sendPushNotification = async (appointment) => {
  // Esta função seria implementada com Web Push API
  // Por simplicidade, vamos apenas logar
  console.log(`🔔 Push notification enviada para ${appointment.user.name}`);
};

// Configurar cron jobs para lembretes automáticos
const setupReminderCronJobs = () => {
  // Lembrete 24 horas antes (todo dia às 9h)
  cron.schedule('0 9 * * *', () => {
    console.log('🕘 Executando lembretes de 24h...');
    sendReminders(24);
  });

  // Lembrete 2 horas antes (a cada hora)
  cron.schedule('0 * * * *', () => {
    console.log('🕐 Executando lembretes de 2h...');
    sendReminders(2);
  });

  // Lembrete 30 minutos antes (a cada 30 minutos)
  cron.schedule('*/30 * * * *', () => {
    console.log('🕕 Executando lembretes de 30min...');
    sendReminders(0.5);
  });

  console.log('⏰ Cron jobs de lembretes configurados');
};

// Função para enviar lembrete manual
const sendManualReminder = async (appointmentId) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        user: {
          select: { name: true, email: true, phone: true }
        },
        service: {
          select: { name: true, duration: true }
        },
        professional: {
          select: { name: true }
        }
      }
    });

    if (!appointment) {
      throw new Error('Agendamento não encontrado');
    }

    const success = await sendEmailReminder(appointment);
    return success;
  } catch (error) {
    console.error('Erro ao enviar lembrete manual:', error);
    throw error;
  }
};

module.exports = {
  setupReminderCronJobs,
  sendManualReminder,
  sendReminders
};
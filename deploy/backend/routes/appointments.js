const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Listar todos os agendamentos (rota principal)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, upcoming, limit = 50 } = req.query;

    let whereClause = { userId };

    if (status) {
      whereClause.status = status;
    }

    if (upcoming === 'true') {
      whereClause.date = { gte: new Date() };
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        service: {
          select: { id: true, name: true, duration: true, price: true }
        },
        professional: {
          select: { id: true, name: true, specialty: true }
        }
      },
      orderBy: [
        { date: 'desc' },
        { startTime: 'desc' }
      ],
      take: parseInt(limit)
    });

    res.json({
      success: true,
      appointments,
      total: appointments.length
    });
  } catch (error) {
    console.error('❌ Erro ao buscar agendamentos:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro interno do servidor',
      message: 'Não foi possível carregar os agendamentos'
    });
  }
});

// Criar novo agendamento
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { date, startTime, serviceId, professionalId, notes } = req.body;
    const userId = req.user.id;

    if (!date || !startTime || !serviceId) {
      return res.status(400).json({ error: 'Data, horário e serviço são obrigatórios' });
    }

    // Validar se a data/hora não é no passado
    // Criar data local para evitar problemas de fuso horário
    const [year, month, day] = date.split('-').map(Number);
    const appointmentDate = new Date(year, month - 1, day);
    const today = new Date();
    
    // Comparar datas usando toDateString() para evitar problemas de fuso horário
    const appointmentDateStr = appointmentDate.toDateString();
    const todayDateStr = today.toDateString();
    
    // Se a data é anterior a hoje, rejeitar
    if (appointmentDate < today && appointmentDateStr !== todayDateStr) {
      return res.status(400).json({ error: 'Não é possível agendar para datas passadas' });
    }
    
    // Se é hoje, verificar se o horário não é no passado
    if (appointmentDateStr === todayDateStr) {
      const appointmentDateTime = new Date(`${date}T${startTime}`);
      const now = new Date();
      
      if (appointmentDateTime <= now) {
        return res.status(400).json({ error: 'Não é possível agendar para horários passados' });
      }
    }

    // Verificar se o serviço existe
    const service = await prisma.service.findUnique({
      where: { id: serviceId, active: true }
    });

    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    // Calcular horário de término baseado na duração do serviço
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + service.duration;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    const endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;

    // Verificar disponibilidade do horário
    // appointmentDate já foi declarado acima para validação
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date: appointmentDate,
        OR: [
          {
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gt: startTime } }
            ]
          },
          {
            AND: [
              { startTime: { lt: endTime } },
              { endTime: { gte: endTime } }
            ]
          }
        ],
        status: { not: 'cancelled' },
        ...(professionalId && { professionalId })
      }
    });

    if (existingAppointment) {
      return res.status(409).json({ error: 'Horário não disponível' });
    }

    // Criar agendamento
    const appointment = await prisma.appointment.create({
      data: {
        date: appointmentDate,
        startTime,
        endTime,
        notes,
        userId,
        serviceId,
        professionalId
      },
      include: {
        service: true,
        professional: true,
        user: {
          select: { id: true, name: true, email: true, phone: true }
        }
      }
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Listar agendamentos do usuário
router.get('/my-appointments', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, upcoming } = req.query;

    console.log('🔍 Buscando agendamentos para usuário:', userId);
    console.log('📋 Parâmetros:', { status, upcoming });

    let whereClause = { userId };

    if (status) {
      whereClause.status = status;
    }

    if (upcoming === 'true') {
      whereClause.date = { gte: new Date() };
    }

    console.log('🔎 Where clause:', whereClause);

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        service: true,
        professional: true
      },
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' }
      ]
    });

    console.log(`✅ Encontrados ${appointments.length} agendamentos`);
    console.log('📅 Agendamentos:', appointments.map(apt => ({
      id: apt.id,
      userId: apt.userId,
      service: apt.service.name,
      date: apt.date,
      startTime: apt.startTime,
      status: apt.status
    })));

    res.json(appointments);
  } catch (error) {
    console.error('❌ Erro ao buscar agendamentos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar agendamento por ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const appointment = await prisma.appointment.findFirst({
      where: { id, userId },
      include: {
        service: true,
        professional: true
      }
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Cancelar agendamento
router.patch('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const appointment = await prisma.appointment.findFirst({
      where: { id, userId, status: { not: 'cancelled' } }
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado ou já cancelado' });
    }

    // Verificar se o agendamento pode ser cancelado (pelo menos 2 horas de antecedência)
    const appointmentDateTime = new Date(`${appointment.date.toISOString().split('T')[0]}T${appointment.startTime}`);
    const now = new Date();
    const timeDiff = appointmentDateTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    if (hoursDiff < 2) {
      return res.status(400).json({ error: 'Agendamentos só podem ser cancelados com pelo menos 2 horas de antecedência' });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: { status: 'cancelled' },
      include: {
        service: true,
        professional: true
      }
    });

    res.json(updatedAppointment);
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Deletar agendamento (apenas para agendamentos passados ou cancelados)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const appointment = await prisma.appointment.findFirst({
      where: { id, userId }
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    // Verificar se o agendamento pode ser deletado
    const appointmentDateTime = new Date(`${appointment.date.toISOString().split('T')[0]}T${appointment.startTime}`);
    const now = new Date();
    const isPast = appointmentDateTime < now;
    const isCancelled = appointment.status === 'cancelled';

    if (!isPast && !isCancelled) {
      return res.status(400).json({ 
        error: 'Apenas agendamentos passados ou cancelados podem ser excluídos. Para agendamentos futuros, use o cancelamento.' 
      });
    }

    await prisma.appointment.delete({
      where: { id }
    });

    res.json({ message: 'Agendamento excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar horários disponíveis para uma data
router.get('/available-times/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const { serviceId, professionalId } = req.query;

    if (!serviceId) {
      return res.status(400).json({ error: 'ID do serviço é obrigatório' });
    }

    // Buscar serviço para obter duração
    const service = await prisma.service.findUnique({
      where: { id: serviceId, active: true }
    });

    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    // Criar data local para evitar problemas de fuso horário
    const [year, month, day] = date.split('-').map(Number);
    const appointmentDate = new Date(year, month - 1, day);
    const dayOfWeek = appointmentDate.getDay();

    // Horários padrão da barbearia (8h às 18h)
    const workingHours = {
      start: '08:00',
      end: '18:00'
    };

    // Buscar agendamentos existentes para a data
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: appointmentDate,
        status: { not: 'cancelled' },
        ...(professionalId && { professionalId })
      },
      select: { startTime: true, endTime: true }
    });

    // Gerar horários disponíveis
    const availableTimes = [];
    const [startHour, startMin] = workingHours.start.split(':').map(Number);
    const [endHour, endMin] = workingHours.end.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const now = new Date();
    
    // Comparar apenas as datas (sem horário) para verificar se é hoje
    // Usar toDateString() para evitar problemas de fuso horário
    const isToday = appointmentDate.toDateString() === now.toDateString();
    

    
    for (let minutes = startMinutes; minutes + service.duration <= endMinutes; minutes += 30) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const timeSlot = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
      
      // Se for hoje, verificar se o horário não é no passado
      if (isToday) {
        const slotDateTime = new Date(`${date}T${timeSlot}`);
        // Adicionar alguns minutos de margem para evitar conflitos
        if (slotDateTime.getTime() <= now.getTime() + (5 * 60 * 1000)) {
          continue; // Pular horários passados (com margem de 5 minutos)
        }
      }
      
      // Verificar se o horário está disponível
      const isAvailable = !existingAppointments.some(apt => {
        const aptStartMinutes = apt.startTime.split(':').reduce((h, m) => h * 60 + parseInt(m));
        const aptEndMinutes = apt.endTime.split(':').reduce((h, m) => h * 60 + parseInt(m));
        const slotEndMinutes = minutes + service.duration;
        
        return (minutes < aptEndMinutes && slotEndMinutes > aptStartMinutes);
      });
      
      if (isAvailable) {
        availableTimes.push(timeSlot);
      }
    }

    res.json(availableTimes);
  } catch (error) {
    console.error('Erro ao buscar horários disponíveis:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
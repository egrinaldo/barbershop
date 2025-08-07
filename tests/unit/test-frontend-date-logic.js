// Teste da nova lógica de data implementada no frontend
const { isAfter, isBefore, startOfDay } = require('date-fns');

// Simular o agendamento retornado pela API
const appointment = {
  id: "cme1eyoaj000413x996z8h77m",
  date: "2025-08-11T00:00:00.000Z", // Data ISO do banco
  startTime: "10:00",
  endTime: "10:25",
  status: "scheduled",
  service: {
    name: "Barba Completa"
  }
};

// Nova função implementada no frontend
const createAppointmentDateTime = (appointment) => {
  // Extrair apenas a parte da data (YYYY-MM-DD) da string ISO
  const dateOnly = appointment.date.split('T')[0];
  return new Date(`${dateOnly}T${appointment.startTime}`);
};

// Simular a lógica do frontend
const today = startOfDay(new Date());
const appointmentDateTime = createAppointmentDateTime(appointment);

console.log('🔧 TESTE DA NOVA LÓGICA DE DATA DO FRONTEND');
console.log('='.repeat(50));
console.log('📅 Data de hoje:', today);
console.log('📅 Data original do banco:', appointment.date);
console.log('📅 Data extraída (dateOnly):', appointment.date.split('T')[0]);
console.log('🕐 Hora do agendamento:', appointment.startTime);
console.log('📅 DateTime criado:', appointmentDateTime);
console.log('✅ Status:', appointment.status);

console.log('\n🔍 Verificações:');
console.log('- É agendado (scheduled)?', appointment.status === 'scheduled');
console.log('- É depois de hoje?', isAfter(appointmentDateTime, today));
console.log('- É antes de hoje?', isBefore(appointmentDateTime, today));

// Simular a lógica de agrupamento
const isUpcoming = appointment.status === 'scheduled' && isAfter(appointmentDateTime, today);
const isPast = appointment.status === 'completed' || 
               (appointment.status === 'scheduled' && isBefore(appointmentDateTime, today));
const isCancelled = appointment.status === 'cancelled';

console.log('\n📊 Classificação:');
if (isUpcoming) {
  console.log('✅ DEVERIA aparecer em "Próximos Agendamentos"');
} else if (isPast) {
  console.log('📅 DEVERIA aparecer em "Histórico de Agendamentos"');
} else if (isCancelled) {
  console.log('❌ DEVERIA aparecer em "Agendamentos Cancelados"');
} else {
  console.log('❓ Não se encaixa em nenhuma categoria');
}
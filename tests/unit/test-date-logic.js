const { isAfter, isBefore, startOfDay } = require('date-fns');

// Simular o agendamento que está no banco
const appointment = {
  id: 'cme1eyoaj000413x996z8h77m',
  date: '2025-08-11T00:00:00.000Z',
  startTime: '10:00',
  status: 'scheduled'
};

const today = startOfDay(new Date());
// Extrair apenas a parte da data (YYYY-MM-DD) da string ISO
const dateOnly = appointment.date.split('T')[0];
const appointmentDateTime = new Date(`${dateOnly}T${appointment.startTime}`);

console.log('📅 Data de hoje:', today);
console.log('📅 Data do agendamento:', appointment.date);
console.log('🕐 Hora do agendamento:', appointment.startTime);
console.log('📅 DateTime completo do agendamento:', appointmentDateTime);
console.log('✅ Status:', appointment.status);

console.log('\n🔍 Verificações:');
console.log('- É agendado (scheduled)?', appointment.status === 'scheduled');
console.log('- É depois de hoje?', isAfter(appointmentDateTime, today));
console.log('- É antes de hoje?', isBefore(appointmentDateTime, today));

console.log('\n📊 Classificação:');
if (appointment.status === 'scheduled' && isAfter(appointmentDateTime, today)) {
  console.log('✅ DEVERIA aparecer em "Próximos Agendamentos"');
} else if (appointment.status === 'completed' || 
           (appointment.status === 'scheduled' && isBefore(appointmentDateTime, today))) {
  console.log('📜 DEVERIA aparecer em "Histórico"');
} else if (appointment.status === 'cancelled') {
  console.log('❌ DEVERIA aparecer em "Cancelados"');
} else {
  console.log('❓ Não se encaixa em nenhuma categoria');
}
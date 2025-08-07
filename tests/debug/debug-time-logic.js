// Teste da lógica de horários
const now = new Date();
const today = new Date().toISOString().split('T')[0];

console.log('🔍 DEBUG: Lógica de horários');
console.log('📅 Data de hoje:', today);
console.log('⏰ Horário atual:', now.toLocaleTimeString());
console.log('⏰ Horário atual (ISO):', now.toISOString());

// Simular a lógica do backend
const appointmentDate = new Date(today);
const isToday = appointmentDate.toDateString() === now.toDateString();

console.log('\n🧪 Teste de comparação de datas:');
console.log('appointmentDate.toDateString():', appointmentDate.toDateString());
console.log('now.toDateString():', now.toDateString());
console.log('isToday:', isToday);

console.log('\n🧪 Testando horários:');
const testTimes = ['08:00', '10:00', '11:00', '11:30', '12:00', '15:00'];

testTimes.forEach(timeSlot => {
  const slotDateTime = new Date(`${today}T${timeSlot}`);
  const isPast = slotDateTime.getTime() <= now.getTime() + (5 * 60 * 1000);
  
  console.log(`⏰ ${timeSlot}:`);
  console.log(`  - slotDateTime: ${slotDateTime.toISOString()}`);
  console.log(`  - now + 5min: ${new Date(now.getTime() + (5 * 60 * 1000)).toISOString()}`);
  console.log(`  - isPast: ${isPast}`);
  console.log(`  - should skip: ${isToday && isPast}`);
  console.log('');
});
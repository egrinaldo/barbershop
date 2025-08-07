const axios = require('axios');

async function debugAvailableTimes() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    
    console.log('🔍 DEBUG: API de horários disponíveis');
    console.log('📅 Data:', today);
    console.log('⏰ Horário atual:', now.toLocaleTimeString());
    console.log('⏰ Horário atual (ISO):', now.toISOString());
    
    // Fazer a requisição para a API
    const response = await axios.get(`http://localhost:3001/api/appointments/available-times/${today}?serviceId=cme1et2lf0000czeamwboti9i`);
    const availableTimes = response.data;
    
    console.log('\n📋 Horários retornados pela API:', availableTimes);
    
    // Analisar cada horário
    console.log('\n🧪 Análise de cada horário:');
    availableTimes.forEach(timeSlot => {
      const slotDateTime = new Date(`${today}T${timeSlot}`);
      const currentTime = now.getTime();
      const slotTime = slotDateTime.getTime();
      const marginTime = currentTime + (5 * 60 * 1000); // 5 minutos de margem
      
      const isPast = slotTime <= marginTime;
      
      console.log(`⏰ ${timeSlot}:`);
      console.log(`  - Slot time: ${slotDateTime.toISOString()}`);
      console.log(`  - Current + 5min: ${new Date(marginTime).toISOString()}`);
      console.log(`  - Is past: ${isPast}`);
      console.log(`  - Should be excluded: ${isPast ? 'YES' : 'NO'}`);
      console.log('');
    });
    
    // Verificar se há horários que deveriam ter sido excluídos
    const pastTimes = availableTimes.filter(timeSlot => {
      const slotDateTime = new Date(`${today}T${timeSlot}`);
      return slotDateTime.getTime() <= now.getTime() + (5 * 60 * 1000);
    });
    
    if (pastTimes.length > 0) {
      console.log('❌ PROBLEMA: Horários passados encontrados:', pastTimes);
    } else {
      console.log('✅ SUCESSO: Nenhum horário passado encontrado');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    if (error.response) {
      console.error('📋 Resposta do servidor:', error.response.data);
    }
  }
}

debugAvailableTimes();
const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';
const JWT_SECRET = 'sua_chave_secreta_jwt_aqui_mude_em_producao';

// Função para gerar token JWT
function generateToken(userId) {
  const jwt = require('jsonwebtoken');
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
}

async function debugHorarios() {
  try {
    const token = generateToken('cm5eyoaj000413x996z8h77m');
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    
    console.log('🔍 DEBUG: Testando validação de agendamento');
    console.log('📅 Data:', today);
    console.log('⏰ Horário atual:', now.toLocaleTimeString());
    
    // Teste 1: Horário passado
    console.log('\n🧪 TESTE 1: Horário passado (10:00)');
    try {
      const response = await axios.post(`${BASE_URL}/appointments`, {
        date: today,
        startTime: '10:00',
        serviceId: 'cme1et2lf0000czeamwboti9i',
        notes: 'Teste horário passado'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('❌ ERRO: Agendamento foi aceito!', response.data);
    } catch (error) {
      console.log('✅ SUCESSO: Agendamento rejeitado');
      console.log('📋 Mensagem:', error.response?.data?.error);
    }
    
    // Teste 2: Horário futuro
    console.log('\n🧪 TESTE 2: Horário futuro (15:00)');
    try {
      const response = await axios.post(`${BASE_URL}/appointments`, {
        date: today,
        startTime: '15:00',
        serviceId: 'cme1et2lf0000czeamwboti9i',
        notes: 'Teste horário futuro'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ SUCESSO: Agendamento aceito!', response.data.id);
      
      // Deletar o agendamento criado
      await axios.delete(`${BASE_URL}/appointments/${response.data.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.log('❌ ERRO: Agendamento futuro foi rejeitado');
      console.log('📋 Mensagem:', error.response?.data?.error);
    }
    
    // Teste 3: Horários disponíveis
    console.log('\n🧪 TESTE 3: Horários disponíveis');
    try {
      const response = await axios.get(`${BASE_URL}/appointments/available-times/${today}?serviceId=cme1et2lf0000czeamwboti9i`);
      const availableTimes = response.data;
      console.log('📋 Horários disponíveis:', availableTimes);
      
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute < 30 ? '00' : '30'}`;
      
      console.log('⏰ Horário atual aproximado:', currentTimeString);
      
      const pastTimes = availableTimes.filter(time => {
        const [hour, minute] = time.split(':').map(Number);
        const timeMinutes = hour * 60 + minute;
        const currentMinutes = currentHour * 60 + currentMinute;
        return timeMinutes <= currentMinutes;
      });
      
      if (pastTimes.length > 0) {
        console.log('❌ ERRO: Horários passados encontrados:', pastTimes);
      } else {
        console.log('✅ SUCESSO: Nenhum horário passado encontrado');
      }
      
    } catch (error) {
      console.log('❌ ERRO ao buscar horários:', error.response?.data?.error);
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

debugHorarios();
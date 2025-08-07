// Teste para validar que horários passados não podem ser agendados
const axios = require('axios');
const jwt = require('jsonwebtoken');

const API_BASE_URL = 'http://localhost:3001/api';

const testUser = {
  userId: 'cme1eyd3a000213x9gl1d7o7k',
  email: 'egrinaldo19@gmail.com'
};

const token = jwt.sign(testUser, 'sua_chave_secreta_jwt_aqui_mude_em_producao', { expiresIn: '24h' });

const axiosConfig = {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

async function testPastTimeValidation() {
  console.log('\n🔍 TESTE: Validação de horários passados');
  console.log('='.repeat(60));
  
  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  
  // Criar um horário que já passou (1 hora atrás)
  const pastHour = now.getHours() - 1;
  const pastTime = `${pastHour.toString().padStart(2, '0')}:00`;
  
  console.log(`📅 Data: ${today}`);
  console.log(`⏰ Horário atual: ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
  console.log(`⏰ Tentando agendar para: ${pastTime}`);
  
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments`, {
      serviceId: 'cme1et2lg0002czeafihwqjf0',
      date: today,
      startTime: pastTime,
      notes: 'Teste de horário passado'
    }, axiosConfig);
    
    console.log('❌ ERRO: Agendamento em horário passado foi aceito!');
    console.log('📋 Resposta:', response.data);
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ SUCESSO: Agendamento em horário passado foi rejeitado');
      console.log('📋 Mensagem:', error.response.data.error);
    } else {
      console.log('❓ Erro inesperado:', error.response?.data || error.message);
    }
  }
}

async function testCurrentTimeValidation() {
  console.log('\n🔍 TESTE: Validação de horário atual');
  console.log('='.repeat(60));
  
  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  
  // Tentar agendar para o horário atual
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  console.log(`📅 Data: ${today}`);
  console.log(`⏰ Horário atual: ${currentTime}`);
  console.log(`⏰ Tentando agendar para: ${currentTime}`);
  
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments`, {
      serviceId: 'cme1et2lg0002czeafihwqjf0',
      date: today,
      startTime: currentTime,
      notes: 'Teste de horário atual'
    }, axiosConfig);
    
    console.log('❌ ERRO: Agendamento no horário atual foi aceito!');
    console.log('📋 Resposta:', response.data);
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ SUCESSO: Agendamento no horário atual foi rejeitado');
      console.log('📋 Mensagem:', error.response.data.error);
    } else {
      console.log('❓ Erro inesperado:', error.response?.data || error.message);
    }
  }
}

async function testFutureTimeValidation() {
  console.log('\n🔍 TESTE: Validação de horário futuro');
  console.log('='.repeat(60));
  
  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  
  // Criar um horário futuro (2 horas à frente)
  const futureHour = now.getHours() + 2;
  const futureTime = `${futureHour.toString().padStart(2, '0')}:00`;
  
  console.log(`📅 Data: ${today}`);
  console.log(`⏰ Horário atual: ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
  console.log(`⏰ Tentando agendar para: ${futureTime}`);
  
  try {
    const response = await axios.post(`${API_BASE_URL}/appointments`, {
      serviceId: 'cme1et2lg0002czeafihwqjf0',
      date: today,
      startTime: futureTime,
      notes: 'Teste de horário futuro'
    }, axiosConfig);
    
    console.log('✅ SUCESSO: Agendamento em horário futuro foi aceito');
    console.log('📋 ID do agendamento:', response.data.id);
    
    // Cancelar o agendamento criado para limpeza
    try {
      await axios.patch(`${API_BASE_URL}/appointments/${response.data.id}/cancel`, {}, axiosConfig);
      console.log('🧹 Agendamento cancelado para limpeza');
    } catch (cancelError) {
      console.log('⚠️ Não foi possível cancelar o agendamento de teste');
    }
    
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('❌ ERRO: Agendamento em horário futuro foi rejeitado');
      console.log('📋 Mensagem:', error.response.data.error);
    } else {
      console.log('❓ Erro inesperado:', error.response?.data || error.message);
    }
  }
}

async function testAvailableTimesToday() {
  console.log('\n🔍 TESTE: Horários disponíveis para hoje (deve excluir passados)');
  console.log('='.repeat(60));
  
  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  
  console.log(`📅 Data: ${today}`);
  console.log(`⏰ Horário atual: ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
  
  try {
    const response = await axios.get(
      `${API_BASE_URL}/appointments/available-times/${today}?serviceId=cme1et2lg0002czeafihwqjf0`
    );
    
    console.log('✅ Horários disponíveis para hoje:');
    console.log(response.data);
    
    // Verificar se há horários passados na lista
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const pastTimes = response.data.filter(time => {
      const [hours, minutes] = time.split(':').map(Number);
      const timeMinutes = hours * 60 + minutes;
      return timeMinutes <= currentMinutes;
    });
    
    if (pastTimes.length > 0) {
      console.log('❌ ERRO: Horários passados encontrados na lista:', pastTimes);
    } else {
      console.log('✅ SUCESSO: Nenhum horário passado na lista');
    }
    
  } catch (error) {
    console.log('❌ Erro ao buscar horários:', error.response?.data || error.message);
  }
}

async function runAllTests() {
  console.log('🧪 INICIANDO TESTES DE VALIDAÇÃO DE HORÁRIOS PASSADOS');
  console.log('='.repeat(60));
  
  await testPastTimeValidation();
  await testCurrentTimeValidation();
  await testFutureTimeValidation();
  await testAvailableTimesToday();
  
  console.log('\n✅ TESTES CONCLUÍDOS');
}

runAllTests().catch(console.error);
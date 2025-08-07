const jwt = require('jsonwebtoken');

// Simular o token JWT do usuário
const userId = 'cme1eyd3a000213x9gl1d7o7k'; // ID do usuário Egrinaldo
const token = jwt.sign(
  { userId, email: 'egrinaldo19@gmail.com' },
  'sua_chave_secreta_jwt_aqui_mude_em_producao', // Mesma chave do backend
  { expiresIn: '7d' }
);

console.log('🔑 Token gerado:', token);

// Fazer requisição para a API
const fetch = require('node-fetch');

async function testMyAppointments() {
  try {
    console.log('🚀 Testando rota /api/appointments/my-appointments...');
    
    const response = await fetch('http://localhost:3001/api/appointments/my-appointments', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📊 Status da resposta:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Dados retornados:', JSON.stringify(data, null, 2));
      console.log('📈 Quantidade de agendamentos:', data.length);
    } else {
      const error = await response.text();
      console.log('❌ Erro na resposta:', error);
    }
  } catch (error) {
    console.error('💥 Erro na requisição:', error);
  }
}

testMyAppointments();
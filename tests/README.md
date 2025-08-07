# 🧪 Pasta de Testes - Barbearia Solidária

Esta pasta contém todos os arquivos de teste e debug do projeto, organizados por categoria.

## 📁 Estrutura de Pastas

### 🔧 `/debug`
Arquivos para debug e análise de problemas específicos:
- `debug-available-times.js` - Debug de horários disponíveis
- `debug-horarios.js` - Debug da lógica de horários
- `debug-time-logic.js` - Debug da lógica de tempo
- `debug-users.js` - Debug de usuários

### 🧪 `/unit`
Testes unitários para funções e componentes específicos:
- `test-appointments.js` - Testes de agendamentos
- `test-date-logic.js` - Testes da lógica de datas
- `test-frontend-date-logic.js` - Testes da lógica de datas do frontend
- `test-horarios-passados.js` - Testes de horários passados
- `test-my-appointments.js` - Testes de "meus agendamentos"

### 🔗 `/integration`
Testes de integração entre componentes e sistemas:
- `create-test-appointment.js` - Teste de criação de agendamentos

## 🚀 Como Executar os Testes

### Testes de Debug:
```bash
# Executar debug específico
node tests/debug/debug-available-times.js
node tests/debug/debug-horarios.js
node tests/debug/debug-time-logic.js
node tests/debug/debug-users.js
```

### Testes Unitários:
```bash
# Executar teste específico
node tests/unit/test-appointments.js
node tests/unit/test-date-logic.js
node tests/unit/test-frontend-date-logic.js
node tests/unit/test-horarios-passados.js
node tests/unit/test-my-appointments.js
```

### Testes de Integração:
```bash
# Executar teste de integração
node tests/integration/create-test-appointment.js
```

## 📋 Convenções

### Nomenclatura:
- **Debug:** `debug-[funcionalidade].js`
- **Teste Unitário:** `test-[funcionalidade].js`
- **Teste Integração:** `create-test-[funcionalidade].js`

### Estrutura dos Arquivos:
Cada arquivo de teste deve conter:
1. **Descrição** do que está sendo testado
2. **Configuração** necessária
3. **Execução** dos testes
4. **Resultados** esperados

## 🔄 Adicionando Novos Testes

### Para Debug:
```bash
# Criar novo arquivo de debug
touch tests/debug/debug-nova-funcionalidade.js
```

### Para Testes Unitários:
```bash
# Criar novo teste unitário
touch tests/unit/test-nova-funcionalidade.js
```

### Para Testes de Integração:
```bash
# Criar novo teste de integração
touch tests/integration/create-test-nova-funcionalidade.js
```

## 🎯 Objetivos dos Testes

- **Debug:** Identificar e resolver problemas específicos
- **Unitários:** Validar funcionamento de componentes isolados
- **Integração:** Verificar interação entre componentes

## 📊 Status dos Testes

| Categoria | Arquivos | Status |
|-----------|----------|--------|
| Debug | 4 | ✅ Organizados |
| Unitários | 5 | ✅ Organizados |
| Integração | 1 | ✅ Organizados |

## 🚨 Importante

- **Sempre execute os testes** antes de fazer commits
- **Mantenha os testes atualizados** com as mudanças do código
- **Documente novos testes** neste README
- **Use dados de teste** que não afetem o banco de produção

---

**💡 Esta organização facilita a manutenção e execução dos testes do projeto!**
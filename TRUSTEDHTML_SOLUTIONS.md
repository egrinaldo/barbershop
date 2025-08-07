# Soluções para Erro TrustedHTML

Este documento descreve as soluções implementadas para resolver o erro `TypeError: Failed to set the 'innerHTML' property on 'Element': This document requires 'TrustedHTML' assignment.`

## Problema

O erro ocorre quando navegadores com políticas de segurança rigorosas (Content Security Policy) impedem a atribuição direta de HTML via `innerHTML`. Isso é comum em:

- Navegadores com configurações de segurança elevadas
- Ambientes corporativos com políticas restritivas
- Extensões de navegador que modificam CSP
- Bibliotecas que manipulam DOM diretamente

## Soluções Implementadas

### 1. Content Security Policy Permissiva

**Arquivo:** `frontend/public/index.html`

Adicionada meta tag CSP que permite:
- Scripts inline e externos
- Estilos inline e externos
- Conexões para APIs externas
- Fontes e imagens de qualquer origem

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:; style-src 'self' 'unsafe-inline' https: http:; img-src 'self' data: blob: https: http:; font-src 'self' data: https: http:; connect-src 'self' https: http: ws: wss:;" />
```

### 2. Utilitário TrustedHTML

**Arquivo:** `frontend/src/utils/trustedHTML.js`

Criado utilitário que:
- Detecta suporte a TrustedHTML
- Cria políticas seguras quando necessário
- Fornece fallbacks para navegadores sem suporte
- Sanitiza HTML removendo elementos perigosos

**Funções disponíveis:**
- `createTrustedHTML(html)` - Cria HTML confiável
- `setInnerHTMLSafely(element, html)` - Define innerHTML com segurança
- `sanitizeHTML(html)` - Remove elementos perigosos
- `useSafeHTML(html)` - Hook React para HTML seguro

### 3. Componente SafeHTML

**Arquivo:** `frontend/src/components/SafeHTML.jsx`

Componente React que renderiza HTML de forma segura:

```jsx
import SafeHTML from '../components/SafeHTML';

// Uso
<SafeHTML 
  html="<p>Conteúdo HTML</p>" 
  tag="div" 
  className="minha-classe" 
/>
```

### 4. Configuração do React Hot Toast

**Arquivo:** `frontend/src/App.jsx`

Melhorada a configuração do Toaster para compatibilidade:
- Adicionadas propriedades ARIA para acessibilidade
- Configurados estilos inline seguros
- Adicionada classe CSS específica

### 5. Estilos CSS Específicos

**Arquivo:** `frontend/src/index.css`

Adicionados estilos para:
- Garantir z-index correto dos toasts
- Melhorar acessibilidade
- Evitar conflitos de fonte

### 6. Remoção de Configuração Conflitante

**Arquivo:** `frontend/package.json`

Removida configuração de proxy que poderia causar conflitos:
```json
// Removido:
"proxy": "http://localhost:3001"
```

## Como Usar

### Para HTML Dinâmico Seguro

```jsx
import { useSafeHTML } from '../utils/trustedHTML';

const MeuComponente = ({ htmlContent }) => {
  const safeHTML = useSafeHTML(htmlContent);
  
  return (
    <div dangerouslySetInnerHTML={safeHTML} />
  );
};
```

### Para Manipulação DOM Direta

```javascript
import { setInnerHTMLSafely } from '../utils/trustedHTML';

const element = document.getElementById('meu-elemento');
setInnerHTMLSafely(element, '<p>Conteúdo seguro</p>');
```

### Para Componentes com HTML

```jsx
import SafeHTML from '../components/SafeHTML';

const MeuComponente = () => (
  <SafeHTML 
    html="<strong>Texto em negrito</strong>"
    className="minha-classe"
  />
);
```

## Prevenção

Para evitar futuros problemas:

1. **Use React adequadamente** - Prefira JSX ao invés de HTML strings
2. **Sanitize dados externos** - Sempre limpe HTML vindo de APIs
3. **Use os utilitários criados** - Para casos onde HTML dinâmico é necessário
4. **Teste em diferentes navegadores** - Especialmente com configurações de segurança elevadas

## Bibliotecas Afetadas

As seguintes bibliotecas podem causar este erro:
- `react-hot-toast` - Resolvido com configuração específica
- `react-big-calendar` - Monitorar se necessário
- `react-datepicker` - Monitorar se necessário

## Monitoramento

Para detectar novos casos:
1. Monitore console do navegador
2. Teste em diferentes ambientes
3. Verifique logs de erro em produção
4. Teste com extensões de navegador ativas
# 📜 Componentes de Scroll

Este documento explica os componentes e utilitários relacionados ao scroll implementados no projeto.

## 🚀 Componentes Disponíveis

### 1. ScrollToTop
**Localização**: `src/components/ScrollToTop.jsx`

Componente que automaticamente faz scroll para o topo da página sempre que a rota muda.

```jsx
import ScrollToTop from './components/ScrollToTop';

// Usado no App.jsx dentro do Router
<Router>
  <ScrollToTop />
  {/* resto da aplicação */}
</Router>
```

### 2. BackToTop
**Localização**: `src/components/BackToTop.jsx`

Botão flutuante que aparece quando o usuário faz scroll para baixo (mais de 300px) e permite voltar ao topo com um clique.

**Características**:
- Aparece automaticamente após scroll de 300px
- Posicionado no canto inferior direito
- Animação suave de hover e scroll
- Acessibilidade completa (aria-label, title)

```jsx
import BackToTop from './components/BackToTop';

// Usado no App.jsx
<BackToTop />
```

## 🛠️ Utilitários de Scroll

### Hook useScrollToTop
**Localização**: `src/utils/useScrollToTop.js`

Hook personalizado para controle de scroll.

```jsx
import { useScrollToTop } from '../utils/useScrollToTop';

// Uso básico
useScrollToTop(); // Scroll suave para o topo

// Com dependências
const { pathname } = useLocation();
useScrollToTop(true, [pathname]); // Scroll quando pathname muda

// Sem animação
useScrollToTop(false, [someDependency]);
```

### Funções Utilitárias

```jsx
import { scrollToTop, scrollToElement } from '../utils/useScrollToTop';

// Scroll para o topo
scrollToTop(); // Suave
scrollToTop(false); // Instantâneo

// Scroll para elemento específico
scrollToElement('meu-elemento-id'); // Suave
scrollToElement('meu-elemento-id', false); // Instantâneo
```

## 🎯 Casos de Uso

### 1. Scroll Automático em Mudança de Rota
✅ **Implementado**: O componente `ScrollToTop` resolve automaticamente o problema de páginas que não voltam ao topo ao navegar.

### 2. Botão "Voltar ao Topo"
✅ **Implementado**: O componente `BackToTop` fornece uma forma rápida de voltar ao topo em páginas longas.

### 3. Scroll Programático
✅ **Disponível**: Use as funções utilitárias para scroll programático em componentes específicos.

### 4. Scroll para Seções Específicas
✅ **Disponível**: Use `scrollToElement()` para navegar para seções específicas da página.

## 🔧 Personalização

### Modificar Threshold do BackToTop
Edite o valor em `BackToTop.jsx`:

```jsx
// Linha 15 - altere 300 para o valor desejado
if (window.pageYOffset > 300) {
```

### Modificar Estilo do Botão
O botão usa classes Tailwind CSS que podem ser personalizadas:

```jsx
className="fixed bottom-8 right-8 z-50 bg-primary-600 hover:bg-primary-700..."
```

### Desabilitar Scroll Suave
Para scroll instantâneo, passe `false` como parâmetro:

```jsx
useScrollToTop(false, [pathname]);
scrollToTop(false);
```

## 🐛 Solução de Problemas

### Problema: Scroll não funciona
- Verifique se o `ScrollToTop` está dentro do `<Router>`
- Confirme se as dependências estão corretas no hook

### Problema: Botão não aparece
- Verifique se há conteúdo suficiente para scroll (>300px)
- Confirme se o `BackToTop` está renderizado

### Problema: Scroll muito lento/rápido
- Ajuste o `behavior` de `'smooth'` para `'auto'` ou vice-versa
- Considere usar CSS `scroll-behavior: smooth` para controle global

## 📱 Responsividade

Todos os componentes são totalmente responsivos:
- **BackToTop**: Posicionamento fixo que funciona em todas as telas
- **ScrollToTop**: Funciona independente do dispositivo
- **Utilitários**: Compatíveis com touch e desktop

## ♿ Acessibilidade

- **BackToTop** inclui `aria-label` e `title` para leitores de tela
- **Focus management** adequado para navegação por teclado
- **Contraste** adequado seguindo as diretrizes WCAG

## 🚀 Performance

- **Debounce** automático no listener de scroll do BackToTop
- **useCallback** para otimização de re-renders
- **Cleanup** adequado de event listeners
- **Lazy loading** - componentes só executam quando necessário
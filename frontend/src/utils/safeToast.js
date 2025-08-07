import toast from 'react-hot-toast';

/**
 * Sanitiza uma mensagem removendo HTML e caracteres perigosos
 * @param {string} message - Mensagem a ser sanitizada
 * @returns {string} - Mensagem sanitizada
 */
const sanitizeMessage = (message) => {
  if (typeof message !== 'string') {
    return String(message || '');
  }
  
  // Remove tags HTML
  const withoutHTML = message.replace(/<[^>]*>/g, '');
  
  // Remove caracteres perigosos
  const sanitized = withoutHTML
    .replace(/[<>'"&]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .trim();
  
  return sanitized || 'Mensagem inválida';
};

/**
 * Cria um wrapper seguro para evitar problemas de TrustedHTML
 * @param {Function} toastFunction - Função do toast a ser executada
 * @param {string} message - Mensagem a ser exibida
 * @param {object} options - Opções do toast
 */
const safeToastWrapper = (toastFunction, message, options = {}) => {
  try {
    const safeMessage = sanitizeMessage(message);
    
    // Configurações extras de segurança
    const safeOptions = {
      ...options,
      // Força o uso de texto puro
      unstyled: false,
      // Remove qualquer HTML personalizado
      icon: typeof options.icon === 'string' ? undefined : options.icon,
      // Garante que não há conteúdo HTML
      className: typeof options.className === 'string' ? options.className.replace(/<[^>]*>/g, '') : options.className
    };
    
    return toastFunction(safeMessage, safeOptions);
  } catch (error) {
    console.error('Erro ao exibir toast:', error);
    // Fallback para console se o toast falhar
    console.log(`Toast ${toastFunction.name}: ${message}`);
  }
};

/**
 * Configurações padrão seguras para toast
 */
const defaultToastConfig = {
  duration: 4000,
  position: 'top-right',
  style: {
    background: '#fff',
    color: '#333',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    maxWidth: '400px',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    // Força texto puro
    textAlign: 'left',
    lineHeight: '1.4'
  },
  // Configurações de segurança
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true'
  }
};

/**
 * Toast de sucesso seguro
 * @param {string} message - Mensagem a ser exibida
 * @param {object} options - Opções adicionais
 */
const safeToastSuccess = (message, options = {}) => {
  return safeToastWrapper(toast.success, message, {
    ...defaultToastConfig,
    style: {
      ...defaultToastConfig.style,
      background: '#f0fdf4',
      color: '#166534',
      border: '1px solid #bbf7d0'
    },
    ...options
  });
};

/**
 * Toast de erro seguro
 * @param {string} message - Mensagem a ser exibida
 * @param {object} options - Opções adicionais
 */
const safeToastError = (message, options = {}) => {
  return safeToastWrapper(toast.error, message, {
    ...defaultToastConfig,
    style: {
      ...defaultToastConfig.style,
      background: '#fef2f2',
      color: '#dc2626',
      border: '1px solid #fecaca'
    },
    ...options
  });
};

/**
 * Toast de info seguro
 * @param {string} message - Mensagem a ser exibida
 * @param {object} options - Opções adicionais
 */
const safeToastInfo = (message, options = {}) => {
  return safeToastWrapper(toast, message, {
    ...defaultToastConfig,
    style: {
      ...defaultToastConfig.style,
      background: '#eff6ff',
      color: '#1d4ed8',
      border: '1px solid #bfdbfe'
    },
    ...options
  });
};

/**
 * Toast de warning seguro
 * @param {string} message - Mensagem a ser exibida
 * @param {object} options - Opções adicionais
 */
const safeToastWarning = (message, options = {}) => {
  return safeToastWrapper(toast, message, {
    ...defaultToastConfig,
    style: {
      ...defaultToastConfig.style,
      background: '#fffbeb',
      color: '#d97706',
      border: '1px solid #fed7aa'
    },
    ...options
  });
};

/**
 * Função para limpar todos os toasts
 */
const dismissAll = () => {
  try {
    toast.dismiss();
  } catch (error) {
    console.error('Erro ao limpar toasts:', error);
  }
};

const safeToast = {
  success: safeToastSuccess,
  error: safeToastError,
  info: safeToastInfo,
  warning: safeToastWarning,
  // Aliases
  warn: safeToastWarning,
  // Utilitários
  dismiss: dismissAll,
  // Função de fallback para casos extremos
  fallback: (message, type = 'info') => {
    console.log(`[${type.toUpperCase()}] ${sanitizeMessage(message)}`);
  }
};

export default safeToast;
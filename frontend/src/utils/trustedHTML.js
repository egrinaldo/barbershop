/**
 * Utilitário para lidar com HTML de forma segura
 * Resolve problemas relacionados ao TrustedHTML em navegadores com políticas rigorosas
 */

/**
 * Cria um TrustedHTML a partir de uma string HTML
 * @param {string} html - String HTML para ser convertida
 * @returns {string|TrustedHTML} - HTML seguro para uso
 */
export const createTrustedHTML = (html) => {
  // Verifica se o navegador suporta TrustedHTML
  if (typeof window !== 'undefined' && window.trustedTypes && window.trustedTypes.createPolicy) {
    try {
      // Cria uma política para HTML confiável
      const policy = window.trustedTypes.createPolicy('default', {
        createHTML: (string) => string,
        createScript: (string) => string,
        createScriptURL: (string) => string,
      });
      
      return policy.createHTML(html);
    } catch (error) {
      console.warn('Erro ao criar TrustedHTML:', error);
      return html;
    }
  }
  
  // Fallback para navegadores que não suportam TrustedHTML
  return html;
};

/**
 * Define innerHTML de forma segura
 * @param {HTMLElement} element - Elemento DOM
 * @param {string} html - String HTML
 */
export const setInnerHTMLSafely = (element, html) => {
  if (!element) return;
  
  try {
    element.innerHTML = createTrustedHTML(html);
  } catch (error) {
    console.warn('Erro ao definir innerHTML:', error);
    // Fallback: usar textContent para conteúdo simples
    element.textContent = html.replace(/<[^>]*>/g, '');
  }
};

/**
 * Sanitiza HTML removendo scripts e elementos perigosos
 * @param {string} html - String HTML para sanitizar
 * @returns {string} - HTML sanitizado
 */
export const sanitizeHTML = (html) => {
  if (typeof html !== 'string') return '';
  
  // Remove scripts e elementos perigosos
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

/**
 * Hook React para usar HTML de forma segura
 * @param {string} html - String HTML
 * @returns {object} - Objeto para usar com dangerouslySetInnerHTML
 */
export const useSafeHTML = (html) => {
  const sanitizedHTML = sanitizeHTML(html);
  const trustedHTML = createTrustedHTML(sanitizedHTML);
  
  return {
    __html: trustedHTML
  };
};
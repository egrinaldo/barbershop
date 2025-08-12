import { useEffect, useCallback } from 'react';

/**
 * Hook personalizado para scroll to top
 * @param {boolean} smooth - Se deve usar scroll suave (padrão: true)
 * @param {Array} dependencies - Dependências para re-executar o scroll (padrão: [])
 */
export const useScrollToTop = (smooth = true, dependencies = []) => {
  const scrollToTopFn = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }, [smooth]);

  useEffect(() => {
    scrollToTopFn();
  }, [scrollToTopFn, ...dependencies]);
};

/**
 * Função utilitária para scroll to top
 * @param {boolean} smooth - Se deve usar scroll suave (padrão: true)
 */
export const scrollToTop = (smooth = true) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

/**
 * Função para scroll para um elemento específico
 * @param {string} elementId - ID do elemento
 * @param {boolean} smooth - Se deve usar scroll suave (padrão: true)
 */
export const scrollToElement = (elementId, smooth = true) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start'
    });
  }
};

export default useScrollToTop;
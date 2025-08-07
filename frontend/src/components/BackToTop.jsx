import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { scrollToTop } from '../utils/useScrollToTop';

/**
 * Componente de botão "Voltar ao Topo"
 * Aparece quando o usuário faz scroll para baixo
 */
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostra o botão quando o usuário faz scroll para baixo mais de 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Adiciona o listener de scroll
    window.addEventListener('scroll', toggleVisibility);

    // Remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleClick = () => {
    scrollToTop(true);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

export default BackToTop;
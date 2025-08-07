import { useLocation } from 'react-router-dom';
import { useScrollToTop } from '../utils/useScrollToTop';

/**
 * Componente que força o scroll para o topo da página
 * sempre que a rota muda
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  // Usa o hook personalizado para scroll to top
  useScrollToTop(true, [pathname]);

  return null;
};

export default ScrollToTop;
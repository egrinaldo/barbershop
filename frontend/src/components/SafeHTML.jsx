import React from 'react';
import { useSafeHTML } from '../utils/trustedHTML';

/**
 * Componente para renderizar HTML de forma segura
 * Resolve problemas relacionados ao TrustedHTML
 */
const SafeHTML = ({ 
  html, 
  tag = 'div', 
  className = '', 
  style = {},
  ...props 
}) => {
  const safeHTML = useSafeHTML(html || '');
  const Tag = tag;

  return (
    <Tag
      className={className}
      style={style}
      dangerouslySetInnerHTML={safeHTML}
      {...props}
    />
  );
};

export default SafeHTML;
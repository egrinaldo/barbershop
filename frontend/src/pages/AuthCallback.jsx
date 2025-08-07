import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        console.error('Erro na autenticação:', error);
        navigate('/login?error=auth_failed');
        return;
      }

      if (token) {
        try {
          // Validar formato do token antes de decodificar
          const tokenParts = token.split('.');
          if (tokenParts.length !== 3) {
            throw new Error('Token JWT inválido');
          }
          
          // Decodificar o token de forma segura
          let payload;
          try {
            const base64Payload = tokenParts[1];
            // Adicionar padding se necessário
            const paddedPayload = base64Payload + '='.repeat((4 - base64Payload.length % 4) % 4);
            const decodedPayload = atob(paddedPayload);
            payload = JSON.parse(decodedPayload);
          } catch (decodeError) {
            console.error('Erro ao decodificar token:', decodeError);
            throw new Error('Falha na decodificação do token');
          }
          
          // Buscar dados completos do usuário
          const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const userData = await response.json();
            console.log('Dados do usuário recebidos:', userData);
            
            if (userData.success && userData.user) {
              await loginWithToken(token, userData.user);
              navigate('/profile');
            } else {
              throw new Error('Formato de resposta inválido do servidor');
            }
          } else {
            const errorData = await response.text();
            console.error('Erro na resposta do servidor:', response.status, errorData);
            throw new Error(`Falha ao obter dados do usuário: ${response.status} - ${errorData}`);
          }
        } catch (error) {
          console.error('Erro ao processar token:', error);
          navigate('/login?error=token_invalid');
        }
      } else {
        navigate('/login?error=no_token');
      }
    };

    handleCallback();
  }, [searchParams, navigate, loginWithToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Processando autenticação...
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Aguarde enquanto validamos suas credenciais.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
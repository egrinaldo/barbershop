import React, { useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Scissors } from 'lucide-react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import safeToast from '../utils/safeToast';

const Login = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Verificar se há erro na URL
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      switch (error) {
        case 'auth_failed':
          safeToast.error('Falha na autenticação com Google');
          break;
        case 'token_invalid':
          safeToast.error('Token inválido recebido');
          break;
        case 'no_token':
          safeToast.error('Nenhum token recebido');
          break;
        case 'google_not_configured':
          safeToast.error('Google OAuth não está configurado. Entre em contato com o administrador.');
          break;
        default:
          safeToast.error('Erro na autenticação');
      }
    }
  }, [searchParams]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
            <Scissors className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-secondary-900">
            Bem-vindo de volta!
          </h2>
          <p className="mt-2 text-secondary-600">
            Faça login para agendar seus serviços
          </p>
        </div>

        {/* Login Card */}
        <div className="card p-8">
          <div className="space-y-6">
            {/* Google Login Button */}
            <GoogleLoginButton className="py-3 rounded-lg" />

            {/* Info */}
            <div className="bg-primary-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-primary-800 mb-2">
                Por que fazer login?
              </h3>
              <ul className="text-sm text-primary-700 space-y-1">
                <li>• Agendar seus serviços</li>
                <li>• Visualizar histórico de agendamentos</li>
                <li>• Receber lembretes automáticos</li>
                <li>• Gerenciar seu perfil</li>
              </ul>
            </div>

            {/* Privacy */}
            <p className="text-xs text-secondary-500 text-center">
              Ao fazer login, você concorda com nossos{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Termos de Uso
              </a>{' '}
              e{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Política de Privacidade
              </a>
              .
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-secondary-600">
            Primeira vez aqui?{' '}
            <span className="text-primary-600 font-medium">
              Ganhe 10% de desconto no primeiro serviço!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
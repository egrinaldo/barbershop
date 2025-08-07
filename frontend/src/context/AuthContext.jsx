import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../config/axios';
import safeToast from '../utils/safeToast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Token é configurado automaticamente pelo interceptor do axios

  // Verificar token ao carregar a aplicação
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/auth/verify');
          setUser(response.data.user);
        } catch (error) {
          console.error('Token inválido:', error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, [token]);

  const login = async (googleData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/google', {
        email: googleData.email,
        name: googleData.name,
        googleId: googleData.googleId,
        avatar: googleData.imageUrl
      });

      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      
      safeToast.success(`Bem-vindo(a), ${userData.name}!`);
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      safeToast.error('Erro ao fazer login. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithToken = async (jwtToken, userData) => {
    try {
      setLoading(true);
      setToken(jwtToken);
      setUser(userData);
      localStorage.setItem('token', jwtToken);
      
      safeToast.success(`Bem-vindo(a), ${userData.name}!`);
      return true;
    } catch (error) {
      console.error('Erro no login com token:', error);
      safeToast.error('Erro ao fazer login. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    safeToast.success('Logout realizado com sucesso!');
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const value = {
    user,
    token,
    loading,
    login,
    loginWithToken,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
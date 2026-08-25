import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../_api/axios';


export interface User {
  id: number;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'client' | string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

interface UseLoginOptions {
  onSuccess?: (user: User) => void;
  redirectDelayMs?: number; // default 5000
}

export function useLogin(options: UseLoginOptions = {}) {
  const { onSuccess, redirectDelayMs = 5000 } = options;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(Math.round(redirectDelayMs / 1000));
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await api.post<LoginResponse>('/user/login', { username, password });
      const { user, token } = response.data;
      const userRole = user?.role;

      if (!userRole || !['superadmin', 'admin', 'client'].includes(userRole)) {
        setErrorMessage('Access denied: Unauthorized role or insufficient permissions.');
        setLoading(false);
        return;
      }

      if (token) localStorage.setItem('auth_token', token);
      if (user) localStorage.setItem('user', JSON.stringify(user));

      setIsRedirecting(true);
      setLoading(false);
      onSuccess?.(user!);

      let timeLeft = Math.round(redirectDelayMs / 1000);
      setCountdown(timeLeft);
      const intervalId = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        if (timeLeft <= 0) clearInterval(intervalId);
      }, 1000);

      setTimeout(() => {
        if (userRole === 'superadmin' || userRole === 'admin') {
          navigate('/dashboard', { replace: true });
        } else if (userRole === 'client') {
          navigate('/', { replace: true });
        }
      }, redirectDelayMs);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data?.message || 'Invalid username or password.');
        } else if (error.request) {
          setErrorMessage('Unable to reach the server. Please check backend connection.');
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      setLoading(false);
    }
  };

  return {
    username, setUsername,
    password, setPassword,
    loading, errorMessage,
    isRedirecting, countdown,
    handleLogin,
  };
}
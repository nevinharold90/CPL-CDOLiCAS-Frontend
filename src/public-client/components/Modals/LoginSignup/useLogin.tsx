import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../../../_api/axios';
import { useCheckSession } from "../../../../utils/ActiveStatusChecker";


export interface User {
  id: number;
  name: string;
  email: string;
  first_name?: string;
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
  redirectDelayMs?: number; // default 1500ms for quick feedback
}

export function useLogin(options: UseLoginOptions = {}) {
  const { onSuccess, redirectDelayMs = 1500 } = options;
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(Math.round(redirectDelayMs / 1000));

  const hasCheckedSessionOnMount = useRef(false);
  const { isActive, user } = useCheckSession();  
  const sessionStatus = isActive; 

  const handleRedirectFlow = (userRole: string, user: User) => {
    setIsRedirecting(true);
    
    // 1. Immediately notify parent to close modal
    onSuccess?.(user);

    let timeLeft = Math.round(redirectDelayMs / 1000);
    setCountdown(timeLeft);

    const intervalId = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
      if (timeLeft <= 0) clearInterval(intervalId);
    }, 1000);

    // 2. Perform hard reload to '/' after brief feedback timer
    setTimeout(() => {
      window.location.href = '/';
    }, redirectDelayMs);
  };

  useEffect(() => {
    if (sessionStatus === null) return;
    if (hasCheckedSessionOnMount.current) return;
    hasCheckedSessionOnMount.current = true;

    setCheckingSession(false);
  }, [sessionStatus]);

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

      // Save both auth_token and user_data to LocalStorage for instant UI updates
      if (token) localStorage.setItem('auth_token', token);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('user_data', JSON.stringify(user)); 
      }

      setLoading(false);
      handleRedirectFlow(userRole, user!);

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
    checkingSession,
    isRedirecting, countdown,
    handleLogin,
  };
}
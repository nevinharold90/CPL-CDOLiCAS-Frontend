import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../_api/axios';
import { useCheckSession } from "../../utils/ActiveStatusChecker";

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
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(Math.round(redirectDelayMs / 1000));

  const hasCheckedSessionOnMount = useRef(false);
  const sessionStatus = useCheckSession();

  // Helper function to trigger redirection/countdown logic
  const handleRedirectFlow = (userRole: string, user: User) => {
    setIsRedirecting(true);
    onSuccess?.(user);

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
        console.log('Client session confirmed. Staying on current route.');
      }
    }, redirectDelayMs);
  };

// 1. Initial Session Check Logic on Component Mount
useEffect(() => {
  if (sessionStatus === null) return;
  if (hasCheckedSessionOnMount.current) return;
  hasCheckedSessionOnMount.current = true;

  const verifyActiveUser = async () => {
    if (sessionStatus === true) {
      const storedUserRaw = localStorage.getItem('user');
      const storedUser: User | null = storedUserRaw ? JSON.parse(storedUserRaw) : null;
      const userRole = storedUser?.role;

      console.log('Active session detected. User Role:', userRole);

      // ❌ REMOVED: Auto-redirecting on mount.
      // Admins can now view the public client homepage while logged in.
    }
    setCheckingSession(false);
  };

  verifyActiveUser();
}, [sessionStatus]);

  // 2. Form Submission Login Handler (Original restored)
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
    checkingSession, // Use this in your UI to show initial session checking state
    isRedirecting, countdown,
    handleLogin,
  };
}
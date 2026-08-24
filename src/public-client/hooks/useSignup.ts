import { useState } from 'react';
import axios from 'axios';
import api from '../../_api/axios';

export interface SignupPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  number: string;
  gender: string;
  age: string;
  location: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
}

interface UseSignupOptions {
  onSuccess?: () => void;
}

export function useSignup(options: UseSignupOptions = {}) {
  const { onSuccess } = options;

  const [form, setForm] = useState<SignupPayload>({
    name: '',
    username: '',
    email: '',
    password: '',
    number: '',
    gender: '',
    age: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateField = (field: keyof SignupPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      name: '', username: '', email: '', password: '',
      number: '', gender: '', age: '', location: '',
    });
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSignup = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // 👇 adjust this endpoint to match your Laravel route
      const response = await api.post<SignupResponse>('/user/register', form);

      setSuccessMessage(response.data.message || 'Account created successfully! You can now log in.');
      resetForm();
      onSuccess?.();

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data?.message || 'Signup failed. Please check your details.');
        } else if (error.request) {
          setErrorMessage('Unable to reach the server. Please check backend connection.');
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form, updateField,
    loading, errorMessage, successMessage,
    handleSignup, resetForm,
  };
}
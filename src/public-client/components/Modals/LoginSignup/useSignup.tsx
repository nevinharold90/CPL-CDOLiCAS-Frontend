import { useState } from 'react';
import axios from 'axios';
import api from '../../../../_api/axios';

export interface SignupPayload {
  first_name: string;
  middle_name?: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  sex?: string;
  c_number?: string;
  is_gov_employee?: boolean;
  employee_id_no?: string;
  organization_office?: string;
  office_address?: string;
  address?: string;
}

interface SignupResponse {
  status: string;
  message?: string;
  data?: {
    id: number;
    username: string;
    email: string;
    role: string;
    first_name?: string;
    last_name?: string;
  };
}

interface UseSignupOptions {
  onSuccess?: () => void;
}

const initialFormState: SignupPayload = {
  first_name: '',
  middle_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  role: 'Client',
  sex: '',
  c_number: '',
  is_gov_employee: false,
  employee_id_no: '',
  organization_office: '',
  office_address: '',
  address: '',
};

export function useSignup(options: UseSignupOptions = {}) {
  const { onSuccess } = options;

  const [form, setForm] = useState<SignupPayload>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateField = (field: keyof SignupPayload, value: string | boolean) => {
    setForm((prev) => {
      if (field === 'is_gov_employee' && value === false) {
        return {
          ...prev,
          is_gov_employee: false,
          employee_id_no: '',
          office_address: '',
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const resetForm = () => {
    setForm(initialFormState);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSignup = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    // 1. Log outgoing React form payload before API call
    console.log('📤 Submitting Form Payload to Backend:', form);

    try {
      const response = await api.post<SignupResponse>('/user/register/client', form);

      // 2. Log full successful backend response
      console.log('✅ Signup Success Response:', response.data);

      setSuccessMessage(response.data.message || 'Account created successfully!');
      resetForm();
      onSuccess?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 3. Log error response details if backend returns validation errors
        console.error('❌ Signup Error Response:', error.response?.data);

        if (error.response) {
          setErrorMessage(error.response.data?.message || 'Signup failed. Please check your details.');
        } else if (error.request) {
          setErrorMessage('Unable to reach the server. Please check backend connection.');
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      } else {
        console.error('❌ Unexpected Error:', error);
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    updateField,
    loading,
    errorMessage,
    successMessage,
    handleSignup,
    resetForm,
  };
}
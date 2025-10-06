'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setToken } from '@/store/features/auth/authSlice';
import apiClient from '@/lib/api';
import Link from 'next/link';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormData) => {
    console.log('🔐 Login attempt started');
    console.log('📍 API Base URL:', apiClient.defaults.baseURL);
    console.log('📧 Email:', data.email);
    console.log('🌐 Environment:', process.env.NODE_ENV);

    try {
      console.log('🚀 Sending login request...');
      const response = await apiClient.post('/users/login', data);
      console.log('✅ Login response received:', response.status);

      dispatch(setToken(response.data.token));
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: unknown) {
      const axiosError = error as {
        message?: string;
        response?: {
          status?: number;
          statusText?: string;
          data?: { message?: string };
        };
        config?: {
          url?: string;
          baseURL?: string;
          method?: string;
        };
      };

      console.error('❌ Login error details:', {
        message: axiosError.message,
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        config: {
          url: axiosError.config?.url,
          baseURL: axiosError.config?.baseURL,
          method: axiosError.config?.method,
        },
      });

      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        'Login failed. Please check your credentials.';

      toast.error(errorMessage);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '80px',
        minHeight: '100vh',
        backgroundColor: '#f7fafc',
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          width: '300px',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: '#111827',
          }}
        >
          Login
        </h1>

        {/* Test Credentials Info */}
        <div
          style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
          }}
        >
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#166534',
              marginBottom: '8px',
            }}
          >
            Test Account
          </h3>
          <p style={{ fontSize: '12px', color: '#166534', margin: '2px 0' }}>
            Email: test@camplots.com
          </p>
          <p style={{ fontSize: '12px', color: '#166534', margin: '2px 0' }}>
            Password: password123
          </p>
        </div>

        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#111827',
            }}
          >
            Email
          </label>
          <input
            type="email"
            {...register('email', { required: true })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '16px',
              color: '#111827',
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#111827',
            }}
          >
            Password
          </label>
          <input
            type="password"
            {...register('password', { required: true })}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '16px',
              color: '#111827',
            }}
          />
        </div>

        <div style={{ textAlign: 'right', marginTop: '-8px' }}>
          <Link
            href="/forgot-password"
            style={{
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '13px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#10b981';
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6b7280';
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Login
        </button>

        {/* Quick Debug Tests */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={async () => {
              console.log('🧪 Testing direct API call...');
              try {
                const response = await fetch(
                  'https://camplots-backend.onrender.com/api/v1/users/login',
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email: 'test@camplots.com',
                      password: 'password123',
                    }),
                  }
                );
                console.log(
                  '🧪 Direct fetch response:',
                  response.status,
                  response.statusText
                );
                const data = await response.json();
                console.log('🧪 Direct fetch data:', data);
                toast.success('Direct API test successful!');
              } catch (err) {
                console.error('🧪 Direct fetch error:', err);
                toast.error('Direct API test failed!');
              }
            }}
            style={{
              flex: 1,
              padding: '8px',
              backgroundColor: '#7c3aed',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            🧪 Direct
          </button>

          <button
            type="button"
            onClick={async () => {
              console.log('⚙️ Testing apiClient...');
              console.log('⚙️ Base URL:', apiClient.defaults.baseURL);
              console.log('⚙️ Full apiClient config:', {
                baseURL: apiClient.defaults.baseURL,
                headers: apiClient.defaults.headers,
                timeout: apiClient.defaults.timeout
              });
              console.log('⚙️ Environment vars:', {
                NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
                NODE_ENV: process.env.NODE_ENV
              });
              
              try {
                console.log('⚙️ Making apiClient request...');
                const response = await apiClient.post('/users/login', {
                  email: 'test@camplots.com',
                  password: 'password123',
                });
                console.log('⚙️ ApiClient response:', {
                  status: response.status,
                  statusText: response.statusText,
                  data: response.data,
                  headers: response.headers
                });
                toast.success('ApiClient test successful!');
              } catch (err: unknown) {
                const axiosError = err as {
                  message?: string;
                  code?: string;
                  response?: {
                    status?: number;
                    statusText?: string;
                    data?: unknown;
                  };
                  config?: {
                    url?: string;
                    baseURL?: string;
                    method?: string;
                    headers?: unknown;
                  };
                };
                console.error('⚙️ ApiClient error details:', {
                  message: axiosError.message,
                  code: axiosError.code,
                  status: axiosError.response?.status,
                  statusText: axiosError.response?.statusText,
                  data: axiosError.response?.data,
                  config: {
                    url: axiosError.config?.url,
                    baseURL: axiosError.config?.baseURL,
                    method: axiosError.config?.method,
                    headers: axiosError.config?.headers
                  }
                });
                toast.error(`ApiClient failed: ${axiosError.message || 'Unknown error'}`);
              }
            }}
            style={{
              flex: 1,
              padding: '8px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            ⚙️ ApiClient
          </button>
        </div>

        <div
          style={{
            marginTop: '16px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#6b7280',
          }}
        >
          <p style={{ marginBottom: '8px' }}>
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              style={{
                color: '#10b981',
                textDecoration: 'none',
                fontWeight: '600',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Sign up
            </Link>
          </p>
          <Link
            href="/"
            style={{
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '13px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#111827';
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6b7280';
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            ← Back to home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

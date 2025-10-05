'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
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
    try {
      const response = await apiClient.post('/users/login', data);
      dispatch(setToken(response.data.token));
      alert('Login successful!');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials.');
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

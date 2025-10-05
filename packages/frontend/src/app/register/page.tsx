'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';
import Link from 'next/link';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await apiClient.post('/users/register', data);
      alert('Registration successful! You can now log in.');
      router.push('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
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
          Register
        </h1>

        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#111827',
            }}
          >
            Username
          </label>
          <input
            type="text"
            {...register('username', { required: true })}
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
          Register
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
            Already have an account?{' '}
            <Link
              href="/login"
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
              Sign in
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

export default RegisterPage;

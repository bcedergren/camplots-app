'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import apiClient from '@/lib/api';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage = () => {
  const { register, handleSubmit } = useForm<ResetPasswordFormData>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      setError('Invalid reset link. Please request a new password reset.');
    } else {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid reset token');
      return;
    }

    try {
      await apiClient.post('/users/reset-password', {
        token,
        password: data.password,
      });
      setIsSuccess(true);
      setError('');

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err) {
      console.error(err);
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string } } })
          .response;
        setError(
          response?.data?.message ||
            'Failed to reset password. The link may have expired.'
        );
      } else {
        setError('Failed to reset password. The link may have expired.');
      }
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '32px',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          width: '400px',
          maxWidth: '90%',
        }}
      >
        {!isSuccess ? (
          <>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '8px',
                color: '#111827',
              }}
            >
              Reset Your Password
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: '#6b7280',
                textAlign: 'center',
                marginBottom: '16px',
              }}
            >
              Enter your new password below.
            </p>

            {error && (
              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '4px',
                  color: '#991b1b',
                  fontSize: '14px',
                }}
              >
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontWeight: '500',
                    color: '#111827',
                  }}
                >
                  New Password
                </label>
                <input
                  type="password"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                  })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '16px',
                    color: '#111827',
                  }}
                  placeholder="Enter new password"
                />
                <p
                  style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginTop: '4px',
                  }}
                >
                  Must be at least 6 characters
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
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register('confirmPassword', { required: true })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '16px',
                    color: '#111827',
                  }}
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                disabled={!token}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: token ? '#10b981' : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: token ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (token) {
                    e.currentTarget.style.backgroundColor = '#059669';
                  }
                }}
                onMouseLeave={(e) => {
                  if (token) {
                    e.currentTarget.style.backgroundColor = '#10b981';
                  }
                }}
              >
                Reset Password
              </button>
            </form>
          </>
        ) : (
          <>
            <div
              style={{
                textAlign: 'center',
                padding: '20px',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                }}
              >
                ✅
              </div>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '12px',
                }}
              >
                Password Reset Successful!
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                }}
              >
                Your password has been successfully reset. You will be
                redirected to the login page in a moment...
              </p>
              <Link
                href="/login"
                style={{
                  display: 'inline-block',
                  padding: '12px 32px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                }}
              >
                Go to Login
              </Link>
            </div>
          </>
        )}

        <div
          style={{
            marginTop: '16px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#6b7280',
          }}
        >
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
      </div>
    </div>
  );
};

export default ResetPasswordPage;

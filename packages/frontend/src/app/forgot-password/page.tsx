'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import apiClient from '@/lib/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordPage = () => {
  const { register, handleSubmit } = useForm<ForgotPasswordFormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await apiClient.post('/users/forgot-password', data);
      setIsSubmitted(true);
      toast.success('Reset instructions sent to your email!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send reset email. Please try again.');
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
        {!isSubmitted ? (
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
              Forgot Password?
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: '#6b7280',
                textAlign: 'center',
                marginBottom: '16px',
              }}
            >
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>

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
                  placeholder="your@email.com"
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                }}
              >
                Send Reset Link
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
                ✉️
              </div>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '12px',
                }}
              >
                Check Your Email
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                }}
              >
                If an account exists with that email, we&apos;ve sent you a link
                to reset your password. Please check your inbox and spam folder.
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
                Back to Login
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
          <p style={{ marginBottom: '8px' }}>
            Remember your password?{' '}
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
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

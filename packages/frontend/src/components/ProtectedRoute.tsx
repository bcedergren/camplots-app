'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setUser, logout } from '@/store/features/auth/authSlice';
import apiClient from '@/lib/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      // If no token, redirect to login
      if (!token) {
        setLoading(false);
        router.push('/login');
        return;
      }

      try {
        // Verify token by calling profile endpoint
        const response = await apiClient.get('/users/profile');
        dispatch(setUser(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        // Token is invalid, clear it and redirect
        dispatch(logout());
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    checkAuth();
  }, [token, router, dispatch]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f9fafb',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
};

export default ProtectedRoute;

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '@/lib/api';

interface DebugResponse {
  status: number;
  statusText: string;
  data?: unknown;
  headers?: unknown;
  body?: string;
}

interface DebugError {
  message: string;
  response?: {
    status: number;
    statusText: string;
    data: unknown;
  } | null;
  type?: string;
}

const DebugPage = () => {
  const [response, setResponse] = useState<DebugResponse | null>(null);
  const [error, setError] = useState<DebugError | null>(null);
  const [loading, setLoading] = useState(false);

  const testBackendConnection = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      // Test basic connection
      const result = await fetch('https://camplots-backend.onrender.com');
      const text = await result.text();

      setResponse({
        status: result.status,
        statusText: result.statusText,
        headers: Object.fromEntries(result.headers.entries()),
        body: text.substring(0, 500) + '...',
      });

      toast.success('Backend connection successful!');
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Unknown error',
      });
      toast.error('Backend connection failed!');
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      console.log('Testing login with apiClient...');
      console.log('Base URL:', apiClient.defaults.baseURL);

      const result = await apiClient.post('/users/login', {
        email: 'test@camplots.com',
        password: 'password123',
      });

      setResponse({
        status: result.status,
        statusText: result.statusText,
        data: result.data,
        headers: result.headers,
      });

      toast.success('Login test successful!');
    } catch (err: unknown) {
      console.error('Login test error:', err);
      const errorObj = err as {
        message?: string;
        response?: { status: number; statusText: string; data: unknown };
      };
      setError({
        message: errorObj.message || 'Unknown error',
        response: errorObj.response
          ? {
              status: errorObj.response.status,
              statusText: errorObj.response.statusText,
              data: errorObj.response.data,
            }
          : null,
      });
      toast.error('Login test failed!');
    } finally {
      setLoading(false);
    }
  };

  const testDirectFetch = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const result = await fetch(
        'https://camplots-backend.onrender.com/api/v1/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@camplots.com',
            password: 'password123',
          }),
        }
      );

      if (!result.ok) {
        throw new Error(`HTTP ${result.status}: ${result.statusText}`);
      }

      const data = await result.json();

      setResponse({
        status: result.status,
        statusText: result.statusText,
        data: data,
        headers: Object.fromEntries(result.headers.entries()),
      });

      toast.success('Direct fetch login successful!');
    } catch (err: unknown) {
      setError({
        message: err instanceof Error ? err.message : 'Unknown error',
        type: 'Direct fetch error',
      });
      toast.error('Direct fetch login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Frontend-Backend Debug Page</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>API Configuration</h2>
        <p>
          <strong>Base URL:</strong> {apiClient.defaults.baseURL}
        </p>
        <p>
          <strong>Environment:</strong> {process.env.NODE_ENV}
        </p>
        <p>
          <strong>NEXT_PUBLIC_API_URL:</strong>{' '}
          {process.env.NEXT_PUBLIC_API_URL || 'Not set'}
        </p>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={testBackendConnection}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Testing...' : 'Test Backend Connection'}
        </button>

        <button
          onClick={testLogin}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Testing...' : 'Test Login (axios)'}
        </button>

        <button
          onClick={testDirectFetch}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Testing...' : 'Test Login (fetch)'}
        </button>
      </div>

      {response && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'green' }}>Success Response:</h3>
          <pre
            style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px',
            }}
          >
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'red' }}>Error:</h3>
          <pre
            style={{
              backgroundColor: '#fee',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px',
            }}
          >
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DebugPage;

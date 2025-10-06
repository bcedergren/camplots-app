import axios from 'axios';

// Ensure we always have the correct API URL with /api/v1 path
const getBaseURL = () => {
  const envURL = process.env.NEXT_PUBLIC_API_URL;
  if (envURL) {
    // If env var is set, make sure it ends with /api/v1
    return envURL.endsWith('/api/v1') ? envURL : `${envURL}/api/v1`;
  }
  // Default fallback
  return 'https://camplots-backend.onrender.com/api/v1';
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default apiClient;

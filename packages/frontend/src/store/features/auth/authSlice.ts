import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  userId: string;
  username: string;
  email: string;
  subscriptionType: string;
  createdAt: string;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

// Get initial state from localStorage
const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return {
      token,
      isAuthenticated: !!token,
      user: null,
    };
  }
  return {
    token: null,
    isAuthenticated: false,
    user: null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload);
      }
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, logout, setUser } = authSlice.actions;
export default authSlice.reducer;

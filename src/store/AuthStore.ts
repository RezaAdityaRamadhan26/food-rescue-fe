import { create } from 'zustand';
import Cookies from 'js-cookie';
import axiosInstance from '@/lib/axios';

interface User {
  id: string;
  fullname: string;
  email: string;
  role: 'CUSTOMER' | 'MERCHANT';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  fetchProfile: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

interface RegisterData {
  fullname: string;
  email: string;
  password: string;
  role: 'CUSTOMER' | 'MERCHANT';
  restaurantName?: string;
  restaurantAddress?: string;
  restaurantDescription?: string;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: Cookies.get('jwt') || null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post('/auth/login', { email, password });
      const { token, user } = res.data.data;
      Cookies.set('jwt', token, { expires: 7 });
      set({ token, user, isLoading: false });

      // Fetch full profile after login
      await get().fetchProfile();
      return true;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login gagal';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post('/auth/register', data);
      set({ isLoading: false });
      return true;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registrasi gagal';
      set({ error: message, isLoading: false });
      return false;
    }
  },

  fetchProfile: async () => {
    const token = Cookies.get('jwt');
    if (!token) return;

    try {
      const res = await axiosInstance.get('/auth/profile');
      set({ user: res.data.data, token });
    } catch {
      // Token invalid, clear it
      Cookies.remove('jwt');
      set({ user: null, token: null });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch {
      // Ignore errors, logout locally anyway
    }
    Cookies.remove('jwt');
    set({ user: null, token: null });
  },

  clearError: () => set({ error: null }),
}));
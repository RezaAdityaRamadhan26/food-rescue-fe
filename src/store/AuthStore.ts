import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: string;
  fullname: string;
  email: string;
  role: 'CUSTOMER' | 'MERCHANT';
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: Cookies.get('jwt') || null,

  login: (user, token) => {
    Cookies.set('jwt', token, { expires: 7 });
    set({ user, token });
  },
  logout: () => {
    Cookies.remove('jwt');
    set({ user: null, token: null });
  },
}));
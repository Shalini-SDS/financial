import { create } from 'zustand';

type Role = 'MSME' | 'INVESTOR' | 'ADMIN';

type AuthState = {
  token?: string;
  role?: Role;
  setAuth: (token?: string, role?: Role) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: undefined,
  role: undefined,
  setAuth: (token, role) => set({ token, role }),
  logout: () => set({ token: undefined, role: undefined }),
}));


import { create } from 'zustand';

import { JobKey } from '@/constants/jobTypes';
import { safeRemoveItem } from '@/utils/storage';

interface UserInfo {
  nickname: string;
  email: string;
  role: JobKey;
  profileImageUrl?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: UserInfo | null;
  login: (data: UserInfo) => void;
  logout: () => void;
  hydrate: () => Promise<void>;
}

const STORAGE_KEYS = {
  nickname: 'nickname',
  email: 'email',
  profile: 'profileImageUrl',
  role: 'role',
} as const;

const DEV_AUTH_BYPASS_USER: UserInfo = {
  nickname: '개발자',
  email: 'dev@hackplay.local',
  role: 'FRONT',
};

const isDevAuthBypassEnabled =
  import.meta.env.MODE === 'development' && import.meta.env.VITE_DEV_AUTH_BYPASS === 'true';

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  login: ({ nickname, email, profileImageUrl, role }) => {
    set({
      isLoggedIn: true,
      isLoading: false,
      user: { nickname, email, profileImageUrl, role },
    });
  },
  logout: () => {
    safeRemoveItem('local', STORAGE_KEYS.nickname);
    safeRemoveItem('local', STORAGE_KEYS.email);
    safeRemoveItem('local', STORAGE_KEYS.profile);
    safeRemoveItem('local', STORAGE_KEYS.role);

    set({ isLoggedIn: false, isLoading: false, user: null });
  },
  hydrate: async () => {
    try {
      set({ isLoading: true });
      if (isDevAuthBypassEnabled) {
        set({
          isLoggedIn: true,
          isLoading: false,
          user: DEV_AUTH_BYPASS_USER,
        });
        return;
      }

      set({ isLoggedIn: false, isLoading: false, user: null });
    } catch (error) {
      console.error('Hydration error:', error);
      set({ isLoggedIn: false, isLoading: false, user: null });
    }
  },
}));

import { create } from 'zustand';

import { JobKey } from '@/constants/jobTypes';

interface UserInfo {
  nickname: string;
  email: string;
  role: JobKey;
  profileImageUrl?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: UserInfo | null;
  login: (data: { accessToken: string } & UserInfo) => void;
  logout: () => void;
  hydrate: () => void;
}

const STORAGE_KEYS = {
  token: 'accessToken',
  nickname: 'nickname',
  email: 'email',
  profile: 'profileImageUrl',
  role: 'role',
};

const hasWindow = typeof window !== 'undefined';

const getStoredAuth = (): { isLoggedIn: boolean; user: UserInfo | null } => {
  if (!hasWindow) return { isLoggedIn: false, user: null };

  const accessToken = sessionStorage.getItem(STORAGE_KEYS.token);

  if (!accessToken) return { isLoggedIn: false, user: null };

  return {
    isLoggedIn: true,
    user: {
      nickname: localStorage.getItem(STORAGE_KEYS.nickname) ?? '',
      email: localStorage.getItem(STORAGE_KEYS.email) ?? '',
      profileImageUrl: localStorage.getItem(STORAGE_KEYS.profile) ?? undefined,
      role: localStorage.getItem(STORAGE_KEYS.role) as JobKey,
    },
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: ({ accessToken, nickname, email, profileImageUrl, role }) => {
    if (!hasWindow) return;

    sessionStorage.setItem(STORAGE_KEYS.token, accessToken);
    if (nickname) localStorage.setItem(STORAGE_KEYS.nickname, nickname);
    if (email) localStorage.setItem(STORAGE_KEYS.email, email);
    if (profileImageUrl) localStorage.setItem(STORAGE_KEYS.profile, profileImageUrl);
    if (role) localStorage.setItem(STORAGE_KEYS.role, role);

    set({
      isLoggedIn: true,
      user: { nickname, email, profileImageUrl, role },
    });
  },
  logout: () => {
    if (hasWindow) {
      sessionStorage.removeItem(STORAGE_KEYS.token);
      localStorage.removeItem(STORAGE_KEYS.nickname);
      localStorage.removeItem(STORAGE_KEYS.email);
      localStorage.removeItem(STORAGE_KEYS.profile);
      localStorage.removeItem(STORAGE_KEYS.role);
    }

    set({ isLoggedIn: false, user: null });
  },
  hydrate: () => {
    const stored = getStoredAuth();
    set(stored);
  },
}));

import axios from 'axios';

import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASEURL}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (request) => {
    if (import.meta.env.MODE === 'development') {
      console.log('🚀 Axios Request:', {
        method: request.method?.toUpperCase(),
        fullURL: `${request.baseURL}${request.url}`,
        data: request.data,
      });
    }
    return request;
  },
  (error) => {
    if (import.meta.env.MODE === 'development') {
      console.error('❌ Axios Request Error:', error);
    }
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (import.meta.env.MODE === 'development') {
      console.log('✅ Axios Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;

    // 인증 만료 또는 로그아웃 이후 보호된 API 접근 시 처리
    if (status === 401) {
      const { isLoggedIn, logout } = useAuthStore.getState();

      // 스토어/스토리지 정리
      if (isLoggedIn) {
        logout();
      }

      // 로그인 페이지로 이동 (이미 로그인 페이지가 아니라면)
      if (typeof window !== 'undefined' && window.location.pathname !== ROUTES.SIGNIN) {
        window.location.replace(ROUTES.SIGNIN);
      }
    }

    if (import.meta.env.MODE === 'development') {
      console.error('❌ Axios Response Error:', {
        status,
        statusText: error.response?.statusText,
        fullURL: `${error.config?.baseURL}${error.config?.url}`,
        data: error.response?.data,
        message: error.message,
      });
    }
    return Promise.reject(error);
  },
);

export { axiosInstance };

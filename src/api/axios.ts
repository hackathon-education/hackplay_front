import axios from 'axios';

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
    if (import.meta.env.MODE === 'development') {
      console.error('❌ Axios Response Error:', {
        status: error.response?.status,
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

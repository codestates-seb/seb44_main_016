import axios from 'axios';
import { store } from '../components/redux/store';
import { toast } from 'react-toastify';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const MAX_RETRY_COUNT = 3;

/** INSTANCE WITH TOKEN */
export const instance = axios.create({});

/** REQUEST INTERCEPTORS */
instance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().authnReducer.login.accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/** RESPONSE INTERCEPTORS */
instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    try {
      const { response, config } = error;
      const originalRequest = config;
      const shouldRetry = response.data.status;
      originalRequest._retryCount < MAX_RETRY_COUNT;

      if (shouldRetry) {
        originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

        const res = await axios.post(`${BASE_URL}/auth/refresh`, null, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        originalRequest.headers['Authorization'] = res.headers.authorization;
        return axios(originalRequest);
      }
    } catch (error) {
      toast.info('로그인이 필요한 서비스입니다.');
      return false;
    }
    return Promise.reject(error);
  }
);

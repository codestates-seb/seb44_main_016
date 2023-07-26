import axios from 'axios';
import { store } from '../components/redux/store';
import { toast } from 'react-toastify';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

      if (!originalRequest.isRetryAttempted && response.data.status) {
        originalRequest.isRetryAttempted = true;

        const refreshToken = localStorage.getItem('refreshToken');
        console.log(`tokenInstance ${refreshToken}`);

        const res = await axios.post(`${BASE_URL}/auth/refresh`, null, {
          headers: {
            'Content-Type': 'application/json',
            Refresh: `${refreshToken}`,
          },
          withCredentials: true,
        });
        originalRequest.headers['Authorization'] = res.headers.authorization;
        return axios(originalRequest);
      }
    } catch (error) {
      localStorage.removeItem('refreshToken');
      return false;
    }
    return Promise.reject(error);
  }
);

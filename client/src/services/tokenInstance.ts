import axios from 'axios';
import { store } from '../components/redux/store';
import { getAccessByRefresh } from '../components/auth/getAccessByRefresh';

/** INSTANCE WITH TOKEN */
export const instance = axios.create({
  withCredentials: true,
});

/** REQUEST INTERCEPTORS */
instance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().authnReducer.login.accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      config.headers['Refresh'] = `${refreshToken}`;
    }

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
      if (response.data.status === 404) {
        const newAccessToken = await getAccessByRefresh();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    } catch (error) {
      return false;
    }
    return Promise.reject(error);
  }
);

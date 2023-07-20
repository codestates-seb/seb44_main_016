import axios from 'axios';
import { store } from '../components/redux/store';
import { toast } from 'react-toastify';

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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/** RESPONSE INTERCEPTORS */
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      const { response, config } = error;
      const originalRequest = config;
      console.log(response);
      if (response.data.status === 403) {
        /** GET : NEW ACCESS TOKEN */
        const res = await axios.post(`http://localhost:8080/auth/refresh`, null, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        /** CHANGE ACCESS TOKEN AND RETRY THE REQUEST*/
        originalRequest.headers['Authorization'] = res.headers.authorization;
        return axios(originalRequest);
      }
    } catch (error) {
      toast.error('로그인 먼저 해주세요.');
      return false;
    }
    return Promise.reject(error);
  }
);

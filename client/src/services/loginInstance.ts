import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/store';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

/** INSTANCE WITH TOKEN */
export const tokenInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

/** REQUEST INTERCEPTORS */
tokenInstance.interceptors.request.use(
  (config) => {
    const accessToken = useSelector<RootState>(
      (state) => state.authnReducer.login.accessToken
    );

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/** RESPONSE INTERCEPTORS */
tokenInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      const { message, response, config } = error;
      const originalRequest = config;

      // if (errorResponse.status === 401) {
      //   return await resetTokenAndReattemptRequest(error);
      // }

      if (message === 'Network Error' || response?.data?.errorCode === '400') {
        // 몇으로?
        const refreshToken = getCookie('refreshToken');
        /** GET : NEW ACCESS TOKEN */
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/auth/user/token`,
          {
            headers: {
              'Content-Type': 'application/json',
              refreshToken: refreshToken,
            },
          }
        );
        /** CHANGE ACCESS TOKEN */
        originalRequest.headers.Authorization = response.headers.authorization;
        setCookie('accessToken', response.headers.authorization);
        return axios(originalRequest);
      }
    } catch (error) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      window.location.href = '/';
      return false;
    }
    return Promise.reject(error);
  }
);

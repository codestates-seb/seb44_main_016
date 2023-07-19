import axios from 'axios';
import { store } from '../components/redux/store';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

/** INSTANCE WITH TOKEN */
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

/** REQUEST INTERCEPTORS */
instance.interceptors.request.use(
  (config) => {
    // const accessToken = store.getState().authnReducer.login.accessToken;
    const accessToken = 'test'; // accessToken 만료 test용
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
    // console.log('리스펀스!');
    return response;
  },
  async (error) => {
    try {
      console.log(error);
      const { status, message, response, config } = error;
      const originalRequest = config;

      if (status === '401') {
        console.log('액세스 없음! 받아와야 함 ');

        /** GET : NEW ACCESS TOKEN */
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        /** CHANGE ACCESS TOKEN */
        originalRequest.headers['Authorization'] = res.headers['Authorization'];
        getCookie('Refresh');
        return axios(originalRequest);
      }
    } catch (error) {
      console.log('둘 다 없음! 로그아웃됨 ');

      window.location.href = '/';
      return false;
    }
    return Promise.reject(error);
  }
);

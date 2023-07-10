import { cookies } from 'next/headers';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/store';

// const cookieStore = cookies();

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
        const refreshToken = cookies().get('refreshToken');
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
        cookies().set('accessToken', '');
        cookies().set('accessToken', response.headers.authorization);
        return axios(originalRequest);
      }
    } catch (error) {
      cookies().set('accessToken', '');
      cookies().set('refreshToken', '');
      window.location.href = '/';
      return false;
    }
    return Promise.reject(error);
  }
);

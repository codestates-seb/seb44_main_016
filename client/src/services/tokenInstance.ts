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

      if (response.data.status === 403) {
        /** GET : NEW ACCESS TOKEN */
        const res = await axios.post(`/auth/refresh`, null, {
          // 서버 배포 링크로 추후 변경 예정
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        /** CHANGE ACCESS TOKEN AND RETRY THE REQUEST*/
        originalRequest.headers['Authorization'] = res.headers.authorization;
        console.log(res.headers.authorization);
        return axios(originalRequest);
      }
    } catch (error) {
      // toast.info('로그인이 필요한 서비스입니다.'); 서버 연결 후 살릴 예정
      return false;
    }
    return Promise.reject(error);
  }
);

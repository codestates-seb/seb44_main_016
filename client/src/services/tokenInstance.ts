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
      console.log('액세스 있어서 통과');
    }
    return config;
  },
  (error) => {
    console.log('액세스 없음');
    return Promise.reject(error);
  }
);

/** RESPONSE INTERCEPTORS */
instance.interceptors.response.use(
  (response) => {
    console.log('리스펀스!');

    return response;
  },
  async (error) => {
    try {
      const { response, config } = error;
      const originalRequest = config;
      console.log('액세스 없어세 에러났어 ');
      console.log(error);
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
      console.log('액세스 없어서 다시 받아왔음!!');
      console.log(res.headers);

      return axios(originalRequest);
    } catch (error) {
      toast.info('로그인이 필요한 서비스입니다.');
      return false;
    }
    return Promise.reject(error);
  }
);

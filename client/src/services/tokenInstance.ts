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
      console.log('액세스 있어서 통과');
    }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    console.log('액세스 없음');
    return Promise.reject(error);
  }
);

/** RESPONSE INTERCEPTORS */
instance.interceptors.response.use(
  async (response) => {
    console.log('리스펀스!');

    return response;
  },
  async (error) => {
    try {
      const { response, config } = error;
      const originalRequest = config;
      console.log('액세스 없어세 에러났어 ');
      if (response.data.status) {
        console.log(response.data.status);
        const res = await axios.post(`${BASE_URL}/auth/refresh`, null, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        originalRequest.headers['Authorization'] = res.headers.authorization;
        console.log('액세스 없어서 다시 받아왔음!!');
        console.log(res);
        return axios(originalRequest);
      }
    } catch (error) {
      toast.info('로그인이 필요한 서비스입니다.');
      return false;
    }
    return Promise.reject(error);
  }
);

// // 토큰 새로고침 요청을 담당하는 함수
// async function refreshTokenAndRetry(error) {
//   try {
//     if (!isRefreshing) {
//       isRefreshing = true;
//       const { response, config } = error;
//       const originalRequest = config;
//       console.log('액세스 없어서 에러났어 ');
//       console.log(error);

//       /** GET : NEW ACCESS TOKEN */
//       const res = await axios.post(`/auth/refresh`, null, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//       });

//       /** CHANGE ACCESS TOKEN AND RETRY THE REQUEST */
//       originalRequest.headers['Authorization'] = res.headers.authorization;
//       console.log('액세스 없어서 다시 받아왔음!!');
//       console.log(res);

//       isRefreshing = false; // 토큰 새로고침 완료
//       return axios(originalRequest); // 재시도
//     }
//   } catch (error) {
//     toast.info('로그인이 필요한 서비스입니다.');
//     return false;
//   }
// }

// instance.interceptors.response.use(
//   (response) => {
//     // 정상 응답 처리 로직
//     return response;
//   },
//   async (error) => {
//     const { response } = error;

//     // 토큰 만료 시 (예: 401 Unauthorized)
//     if (response && response.status === 401) {
//       // 토큰 새로고침 시도
//       return refreshTokenAndRetry(error);
//     }

//     // 그 외 에러 처리
//     return Promise.reject(error);
//   }
// );

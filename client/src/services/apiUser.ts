import axios, { AxiosResponse } from 'axios';
import { PostSignUp, LoginReqData } from '../types/user';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const BASE_URL = 'https://zerohip-git-user-30-everland.vercel.app/api';

const apiUser = {
  /** 회원 가입 */
  postSignUp: async (signUpData: PostSignUp) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/signup`, signUpData);
      return res.data;
    } catch (err) {
      console.error('Error:', err.response.data);
      const field = err.response.data.fieldErrors.field;
      const reason = err.response.data.fieldErrors.reason;
      return { field, reason };
    }
  },

  /** 로그인 */
  postLogin: async (loginData: LoginReqData): Promise<AxiosResponse> => {
    try {
      const res = await axios.post(`${BASE_URL}/user/login`, loginData, {
        withCredentials: true,
      });
      return res;
    } catch (err) {
      // console.error('Error:', err.response.data.error);
      return err.response;
    }
  },
};

export default apiUser;

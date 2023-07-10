import axios, { AxiosResponse } from 'axios';
import { PostSignUp, LoginData } from '../types/user';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const userAPI = {
  /** 회원 가입 */
  postSignUp: async (signUpData: PostSignUp) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/signup`, signUpData);
      return res.data;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  },

  /** 로그인 */
  apiLogin: async (loginData: LoginData): Promise<AxiosResponse> => {
    try {
      const res = await axios.post(`${BASE_URL}/user/login`, loginData, {
        withCredentials: true,
      });
      return res;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  },
};

export default userAPI;

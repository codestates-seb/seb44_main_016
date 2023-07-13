import axios, { AxiosResponse } from 'axios';
import { PostSignUp, LoginReqData } from '../types/user';
import { tokenInstance } from './loginInstance';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const BASE_URL = 'https://zerohip-git-user-175-everland.vercel.app/api';

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
      return err.response;
    }
  },

  /** 회원 탈퇴 */
  deleteUser: async () => {
    try {
      await axios.delete(`${BASE_URL}/user/delete`); // 토큰 담아 보냄 - 인스턴스로 교체
    } catch (err) {
      throw err;
    }
  },
};

export default apiUser;

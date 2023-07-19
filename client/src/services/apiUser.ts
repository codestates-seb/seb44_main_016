import axios, { AxiosResponse } from 'axios';
import { PostSignUp, LoginReqData, UserUpdateReqData } from '../types/user';
import { instance } from './loginInstance';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

  /** 로그아웃 */
  deleteLogout: async () => {
    const res = await instance.delete(`${BASE_URL}/auth/logout`);
    console.log(res);
    return Promise.resolve();
  },

  /** 회원 탈퇴 */
  deleteMyInfo: async () => {
    try {
      await instance.delete(`${BASE_URL}/user/delete`);
    } catch (err) {
      throw err.response;
    }
  },

  /** 회원 정보 불러오기 */
  getMyInfo: async () => {
    const res = await instance.get(`${BASE_URL}/user/mypage`);
    return res.data;
  },

  /** 회원 정보 수정 */
  updateMyInfo: async (userUpdateData: FormData) => {
    try {
      const res = await instance.patch(`${BASE_URL}/user/update`, userUpdateData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res;
    } catch (err) {
      throw err.response;
    }
  },

  getNewRefresh: async () => {
    try {
      const res = await instance.delete(`${BASE_URL}/auth/refresh`);
      return res;
    } catch (err) {
      throw err.response;
    }
  },
};

export default apiUser;

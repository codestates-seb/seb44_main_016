import axios, { AxiosResponse } from 'axios';
import { PostSignUp, LoginReqData, UserUpdateReqData } from '../types/user';
import { instance } from './loginInstance';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const apiUser = {
  /** 회원 가입 */
  postSignUp: async (signUpData: PostSignUp) => {
    const res = await axios.post(`${BASE_URL}/user/signup`, signUpData);
    return res;
  },

  /** 로그인 */
  postLogin: async (loginData: LoginReqData): Promise<AxiosResponse> => {
    const res = await axios.post(`${BASE_URL}/user/login`, loginData, {
      withCredentials: true,
    });
    return res;
  },

  /** 로그아웃 */
  deleteLogout: async () => {
    const res = await instance.delete(`${BASE_URL}/auth/logout`);
    return res;
  },

  /** 회원 탈퇴 */
  deleteMyInfo: async (password: string) => {
    const res = await instance.delete(`${BASE_URL}/user/delete`, { data: { password: password } });
    return res;
  },

  /** 회원 정보 불러오기 */
  getMyInfo: async () => {
    const res = await instance.get(`${BASE_URL}/user/mypage`);
    return res.data;
  },

  /** 회원 정보 수정 */
  updateMyInfo: async (userUpdateData: FormData) => {
    const res = await instance.patch(`${BASE_URL}/user/update`, userUpdateData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
  },

  getNewRefresh: async () => {
    const res = await instance.post(`${BASE_URL}/auth/refresh`);
    return res;
  },
};

export default apiUser;

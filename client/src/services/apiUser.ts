import axios, { AxiosResponse } from 'axios';
import { PostSignUp, LoginReqData, OAuthReqData, UserUpdateReqData } from '../types/user';
import { instance } from './tokenInstance';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const apiUser = {
  /** 회원 가입 */
  postSignUp: async (signUpData: PostSignUp) => {
    const response = await axios.post(`${BASE_URL}/user/signup`, signUpData);
    return response;
  },

  /** 로그인 */
  postLogin: async (loginData: LoginReqData): Promise<AxiosResponse> => {
    const response = await axios.post(`${BASE_URL}/user/login`, loginData, {
      withCredentials: true,
    });
    return response;
  },

  /** OAuth 인증코드 보내기 */
  postOAuthCode: async (OAuthReqData: OAuthReqData) => {
    const response = await axios.post(
      `${BASE_URL}/login/oauth2/code/${OAuthReqData.targetOAuth}`,
      OAuthReqData.oAuthData,
      {
        withCredentials: true,
      }
    );
    return response;
  },

  /** 로그아웃 */
  deleteLogout: async () => {
    const response = await instance.delete(`${BASE_URL}/auth/logout`, {
      withCredentials: true,
    });
    return response;
  },

  /** 회원 탈퇴 */
  deleteMyInfo: async (password: string) => {
    const response = await instance.delete(`${BASE_URL}/user/delete`, { data: { password: password } });
    return response;
  },

  /** 마이 페이지 불러오기 */
  getMyInfo: async () => {
    const response = await instance.get(`${BASE_URL}/user/mypage`, {
      withCredentials: true,
    });
    return response.data;
  },

  /** 회원정보 불러오기 */
  getUserInfo: async () => {
    const response = await instance.get(`${BASE_URL}/user/info`, {
      withCredentials: true,
    });
    return response.data;
  },

  /** 내가 쓴 글 불러오기 */
  getMyFeeds: async (userId: number, page: number, size: number) => {
    const res = await instance.get(`${BASE_URL}/user/${userId}/feedArticles?page=${page}&size=${size}`);
    console.log(res);
    const { data, pageData } = res.data;
    return { data, pageData };
  },

  /** 회원 정보 수정 */
  updateMyInfo: async (userUpdateData: UserUpdateReqData) => {
    const response = await instance.patch(`${BASE_URL}/user/update`, userUpdateData);
    return response;
  },

  /** Access Token 갱신 */
  getNewAccess: async () => {
    const response = await instance.post(`${BASE_URL}/auth/refresh`);
    return response;
  },
};

export default apiUser;

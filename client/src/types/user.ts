export interface PostSignUp {
  email: string | null;
  loginId: string | null;
  password: string | null;
  nickname: string | null;
}

export interface LoginReqData {
  loginId: string | null;
  password: string | null;
}

export interface LoginResData {
  userId?: number | null;
  loginId?: number | null;
  nickname?: string | null;
  accessToken?: string | null;
  isLoggedIn: boolean;
}

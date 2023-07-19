export interface ValidationValues {
  loginId?: string | null;
  pwValue?: string | null;
  password?: string | null;
  nickname?: string | null;
  domainValue?: string | null;
  emailValue?: string | null;
  isChecked?: boolean | null;
}
export interface SignUpError {
  loginId: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  email: string;
  policy: string;
}

export interface PostSignUp {
  email: string | null;
  loginId: string | null;
  password: string | null;
  nickname: string | null;
  profileImgPath: string | null;
}

export interface LoginReqData {
  loginId: string | null;
  password: string | null;
}

export interface LoginResData {
  userId?: number | null;
  loginId?: number | null;
  nickname?: string | null;
  accessToken?: string | null | unknown;
  isLoggedIn: boolean;
}

export interface UserUpdateReqData {
  profileImgPath?: string | null;
  nickname?: string | null;
  password?: string | null;
}

export interface FollowUsersInfoData {
  userId: number;
  imgId: string;
  isAlsoFollowed: boolean;
  loginId: string;
  nickname: string;
}

export interface GetUserInfoData {
  userId: string;
  loginId: string;
  nickname: string;
  profileImgPath: string;
  followingList: FollowUsersInfoData[];
  followerList: FollowUsersInfoData[];
}

// export interface MyInFoResData {} // api 작성되면

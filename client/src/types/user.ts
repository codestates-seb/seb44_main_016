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

export interface UserInputLabel {
  htmlFor: string;
  text: string;
  required?: boolean;
}

export interface UserInputData {
  label: UserInputLabel;
  component: React.ReactNode;
  error: string;
}

export type UserInputDataArray = UserInputData[];

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

export interface OAuthData {
  grantType: string;
  code: string;
  state?: string;
  redirectURI: string;
  clientId: string;
  clientSecret: string;
}

export interface OAuthReqData {
  oAuthData: OAuthData;
  targetOAuth: string;
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

export interface UserFeedData {
  feedArticleId: number;
  feedType: number;
  user: {
    userId: number;
    nickname: string;
    profileImgPath: string;
  };
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  imgPath: string;
}
export interface UserInfoResData {
  userId: string;
  loginId: string;
  nickname: string;
  profileImgPath: string;
  followingList: FollowUsersInfoData[];
  followerList: FollowUsersInfoData[];
  myContents?: UserFeedData[];
}

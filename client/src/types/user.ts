import { ReactNode } from 'react';

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

export interface InputData {
  label: {
    htmlFor: string;
    text: string;
    required?: boolean;
  };
  guide?: string;
  component: ReactNode;
  subComponent?: ReactNode;
  error: string | undefined;
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
  loginId?: string | null;
  nickname?: string | null;
  accessToken?: string | null | undefined;
  isLoggedIn?: boolean;
  profileImgPath?: string | null;
}

export interface OAuthData {
  grantType?: string;
  code: string;
  state?: string;
  redirectURI?: string;
  clientId?: string;
  clientSecret?: string;
}

export interface OAuthReqData {
  oAuthData: OAuthData;
  targetOAuth: string;
}

export interface UserUpdateReqData {
  loginId: string | null | undefined;
  profileImgPath?: string | null;
  nickname?: string | null;
  password?: string | null;
}

export interface FollowingUsersInfoData {
  email: string;
  followId: number;
  followingId: string;
  isFollow: boolean;
  nickname: string;
  profileImgPath: string;
  isFollowed: boolean;
}

export interface FollowerUsersInfoData {
  email: string;
  followId: number;
  followerId: string;
  followingId: string;
  nickname: string;
  profileImgPath: string;
  isFollowing: boolean;
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
  email: string;
  loginId: string;
  nickname: string;
  profileImgPath: string;
  followerCount: number;
  followingCount: number;
  followingList: FollowingUsersInfoData[];
  followerList: FollowerUsersInfoData[];
}

export interface UserPageInfoProps {
  infoData: UserInfoResData;
  loginId?: string | string[];
  isMyPage: boolean;
  isFollowing?: boolean;
  isFollowed?: boolean;
  isLoggedIn?: boolean;
  globalLoginId?: string;
  followingFollowId?: number;
  followerFollowId?: number;
}

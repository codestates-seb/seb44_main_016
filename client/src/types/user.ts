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

export interface UserInput {
  label: UserInputLabel;
  component: React.ReactNode;
  error: string;
  subComponent?: boolean;
  guide?: string;
}

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

export interface UserUpdateReqData {
  imgUrl?: string | null;
  nickname?: string | null;
  password?: string | null;
}

export interface FollowUsersInfoData {
  imgId: string;
  isAlsoFollowed: boolean;
  loginId: string;
  nickname: string;
}

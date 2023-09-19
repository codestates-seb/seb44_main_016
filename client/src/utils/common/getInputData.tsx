import { ReactNode } from 'react';
import { USER_UPDATE_MESSAGES } from '../../constants/messages/user';
import { InputData } from '../../types/user';

interface GenerateInputDataProps {
  type: string;
  IdInput?: ReactNode;
  PwInput: ReactNode;
  PwConfirmInput: ReactNode;
  nicknameInput?: ReactNode;
  emailInput?: ReactNode;
  error: {
    loginId?: string;
    password: string;
    passwordConfirm: string;
    nickname?: string;
    email?: string;
    policy?: string;
  };
}

const generateInputData = ({
  type,
  IdInput,
  PwInput,
  PwConfirmInput,
  nicknameInput,
  emailInput,
  error,
}: GenerateInputDataProps) => {
  let inputData: InputData[] = [];

  if (type === '회원가입') {
    inputData = [
      {
        label: {
          htmlFor: 'loginId',
          text: '아이디',
          required: true,
        },
        component: IdInput,
        error: error.loginId,
      },
      {
        label: {
          htmlFor: 'pw',
          text: '비밀번호',
          required: true,
        },
        component: PwInput,
        error: error.password,
      },
      {
        label: {
          htmlFor: 'pwConfirm',
          text: '비밀번호 확인',
          required: true,
        },
        component: PwConfirmInput,
        error: error.passwordConfirm,
      },
      {
        label: {
          htmlFor: 'nickname',
          text: '닉네임',
          required: true,
        },
        component: nicknameInput,
        error: error.nickname,
      },
      {
        label: {
          htmlFor: 'email',
          text: '이메일',
          required: true,
        },
        component: emailInput,
        subComponent: true,
        error: error.email,
      },
    ];
  } else if (type === '회원탈퇴') {
    inputData = [
      {
        label: {
          htmlFor: 'pw',
          text: '비밀번호',
        },
        component: PwInput,
        error: error.password,
      },
      {
        label: {
          htmlFor: 'pwConfirm',
          text: '비밀번호 확인',
        },
        component: PwConfirmInput,
        error: error.passwordConfirm,
      },
    ];
  } else if (type === '회원수정') {
    inputData = [
      {
        label: {
          htmlFor: 'nickname',
          text: '닉네임',
        },
        guide: USER_UPDATE_MESSAGES.NICKNAME_GUIDE,
        component: nicknameInput,
        error: error.nickname,
      },
      {
        label: {
          htmlFor: 'pw',
          text: '비밀번호',
        },
        guide: USER_UPDATE_MESSAGES.PASSWORD_GUIDE,
        component: PwInput,
        error: error.password,
      },
      {
        label: {
          htmlFor: 'pwConfirm',
          text: '비밀번호 확인',
        },
        guide: USER_UPDATE_MESSAGES.PASSWORD_CONFIRM_GUIDE,
        component: PwConfirmInput,
        error: error.passwordConfirm,
      },
    ];
  }

  return inputData;
};

export default generateInputData;

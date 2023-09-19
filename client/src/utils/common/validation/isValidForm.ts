import { toast } from 'react-toastify';

interface Error {
  loginId?: string;
  password: string;
  passwordConfirm: string;
  nickname?: string;
  email?: string;
  policy?: string;
}

interface UpdateParams {
  nickname: string | null;
  password: string | null;
  pwValue: string | null;
  currentImgSrc: string | unknown;
  error: Error;
}

const isValidForm = {
  login: (loginId: string | null, pwValue: string | null) => {
    if (!loginId || !pwValue) {
      toast.error('아이디나 비밀번호를 입력해주세요.');
      return false;
    }
    return true;
  },
  signUp: (error: Error) => {
    if (error.loginId || error.passwordConfirm || error.nickname || error.email || error.policy) {
      return false;
    }
    return true;
  },
  update: ({ nickname, password, pwValue, currentImgSrc, error }: UpdateParams) => {
    if (
      (nickname && error.nickname) ||
      (pwValue && !password) ||
      (password && !pwValue) ||
      (pwValue && error.password) ||
      (password && error.passwordConfirm)
    ) {
      toast.error('에러 메시지를 확인해주세요.');
      return false;
    }

    if (!currentImgSrc && !nickname && !password && !pwValue) {
      toast.error('수정할 정보가 없습니다.');
      return false;
    }
    return true;
  },
  delete: (error: Error) => {
    if (error.password || error.passwordConfirm || error.policy) {
      toast.error('에러 메시지를 확인해주세요.');
      return false;
    }
    return true;
  },
};

export default isValidForm;

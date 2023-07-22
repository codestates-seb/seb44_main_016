import validation from './validationCheck';
import { SIGN_UP_MESSAGES, USER_DELETE_MESSAGES } from '../constants/messages/user';
import { ValidationValues } from '../types/user';

const getNewError = {
  signUp: ({
    loginId,
    pwValue,
    password,
    nickname,
    domainValue,
    emailValue,
    isChecked,
  }: ValidationValues) => {
    const newError = {
      loginId: loginId ? validation.loginId(loginId || '') : SIGN_UP_MESSAGES.LOGIN_ID_GUIDE,
      password: pwValue ? validation.password(pwValue || '') : SIGN_UP_MESSAGES.PASSWORD_GUIDE,
      passwordConfirm: password
        ? validation.passwordMatch(pwValue || '', password || '')
        : SIGN_UP_MESSAGES.PASSWORD_CONFIRM_GUIDE,
      nickname: nickname ? validation.nickname(nickname || '') : SIGN_UP_MESSAGES.NICKNAME_GUIDE,
      email: domainValue && emailValue ? validation.email(domainValue || '') : SIGN_UP_MESSAGES.EMAIL_GUIDE,
      policy: isChecked ? '' : SIGN_UP_MESSAGES.POLICY_GUIDE,
    };

    return newError;
  },

  update: ({ pwValue, password, nickname }: ValidationValues) => {
    const newError = {
      nickname: nickname ? validation.nickname(nickname || '') : '',
      password: pwValue ? validation.password(pwValue || '') : '',
      passwordConfirm: password ? validation.passwordMatch(pwValue || '', password || '') : '',
    };

    return newError;
  },
  delete: ({ pwValue, password, isChecked }: ValidationValues) => {
    const newError = {
      password: pwValue ? '' : USER_DELETE_MESSAGES.PASSWORD_GUIDE,
      passwordConfirm: password
        ? validation.passwordMatch(pwValue || '', password || '')
        : USER_DELETE_MESSAGES.PASSWORD_CONFIRM_GUIDE,
      policy: isChecked ? '' : USER_DELETE_MESSAGES.POLICY_GUIDE,
    };

    return newError;
  },
};

export default getNewError;

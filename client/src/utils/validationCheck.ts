// 아이디 유효성 검사
export const validateLoginId = (loginId: string) => {
  const loginIdFormat = /^[a-z0-9]{4,10}$/;
  let errorMessage = '';

  if (loginId.length < 4 || loginId.length > 10) {
    return (errorMessage += '아이디는 4자 이상 10자 이하이어야 합니다.\n');
  }
  if (!loginIdFormat.test(loginId)) {
    return (errorMessage +=
      '아이디는 영문 소문자나 숫자로 구성되어야 합니다.\n');
  }

  return '';
};

// 비밀번호 유효성 검사
export const validatePassword = (password: string) => {
  let errorMessage = '';

  if (password.length < 8 || password.length > 16)
    return (errorMessage += '비밀번호는 8~16자리여야 합니다.\n');

  if (!/[a-z]/.test(password))
    return (errorMessage += '비밀번호는 소문자를 포함해야 합니다.\n');

  if (!/\d/.test(password))
    return (errorMessage += '비밀번호는 숫자를 포함해야 합니다.\n');

  if (/[^a-zA-Z\d!@#$%^&*()]/.test(password))
    return (errorMessage += '비밀번호는 !@#$%^&*() 특수문자만 허용합니다.\n');

  if (errorMessage === '') return (errorMessage = '유효한 비밀번호입니다.');

  return errorMessage;
};

export const checkPasswordMatch = (
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) {
    return '비밀번호가 일치하지 않습니다';
  }
  return '';
};

// 닉네임 유효성 검사
export const validateNickname = (nickname: string) => {
  const nicknameFormat = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{4,10}$/;

  if (!nicknameFormat.test(nickname)) {
    return '닉네임은 영문 대소문자, 숫자, 한글로 구성된 4~10자리여야 합니다.';
  }

  return '';
};

// 이메일 유효성 검사 (doyu@doyu.com 형태)
export const validateEmail = (email: string) => {
  if (!email.includes('.')) {
    return '유효한 이메일 형식이 아닙니다.';
  }

  return '';
};

import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import CommonStyles from '../../../styles/CommonStyles';
import useInput from '../../../hooks/useComponents';
import useCheckboxError from '../../../hooks/useCheckoutError';
import { SIGN_UP_MESSAGES } from '../../../constants/user';
import apiUser from '../../../services/apiUser';
import { useRefusalAni, isClickedStyled, SubmitBoxProps } from '../../../hooks/useRefusalAni';
import PolicyAgreement from './PolicyAgreement';
import InputForms from './SignUpInputForms';
import getSignUpNewError from './inputValidationError';

export default function SignUpForm() {
  const router = useRouter();
  const [IdInput, loginId] = useInput('text', '아이디', 'loginId', 'username');
  const [PwInput, pwValue] = useInput('password', '비밀번호', 'pw', 'new-password');
  const [PwConfirmInput, password] = useInput('password', '비밀번호 확인', 'pwConfirm', 'new-password');
  const [nicknameInput, nickname] = useInput('text', '닉네임', 'nickname', 'nickname');
  const [emailInput, emailValue] = useInput('text', '이메일', 'email', 'email');
  const [domainValue, setDomainValue] = useState('');
  const [error, setError] = useState({
    loginId: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
    policy: '',
  });
  const [isClickedProps, RefusalAnimation] = useRefusalAni();
  const { CheckboxComponent, isChecked } = useCheckboxError({
    labelTitle: '전체동의',
    checkboxAgreement: SIGN_UP_MESSAGES.POLICY_EXPLAIN,
    agreementError: error.policy,
    isBackgroundWhite: true,
  });

  useEffect(() => {
    const newError = getSignUpNewError.signUp({
      loginId,
      pwValue,
      password,
      nickname,
      domainValue,
      emailValue,
      isChecked,
    });
    setError(newError);
  }, [loginId, pwValue, password, nickname, domainValue, isChecked]);

  const inputData = [
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

  const requestBody = {
    email: emailValue + '@' + domainValue,
    loginId,
    password,
    nickname,
  };

  const { mutateAsync } = useMutation(() => apiUser.postSignUp(requestBody));

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error.loginId || error.passwordConfirm || error.nickname || error.email || error.policy) {
      RefusalAnimation();
      return;
    }

    const res = await mutateAsync();

    if (res.field === '아이디') {
      setError({ ...error, loginId: res.reason });
      return;
    }

    toast.success('회원가입에 성공했습니다.');
    toast.info('로그인을 해 주세요.');
    router.push('/user/login');
  };

  return (
    <S.FormContainer>
      {inputData.map((el, i) => (
        <InputForms
          key={el.label.text}
          i={i}
          el={el}
          inputData={inputData}
          domainValue={domainValue}
          setDomainValue={setDomainValue}
        />
      ))}
      <PolicyAgreement error={error} CheckboxComponent={CheckboxComponent} />
      <S.SubmitBox {...isClickedProps}>
        <S.SubmitBtn large onClick={handleSignUpSubmit}>
          회원가입
        </S.SubmitBtn>
      </S.SubmitBox>
    </S.FormContainer>
  );
}

const S = {
  ...CommonStyles,
  FormContainer: styled.form`
    width: 50%;
    height: 100%;
    padding: 8px;
    margin-top: 20px;
  `,
  SubmitBox: styled.div<SubmitBoxProps>`
    margin: 2rem 0 4rem 0;
    ${isClickedStyled}
    font-size: 1.2rem;
    font-weight: 500;
  `,
};

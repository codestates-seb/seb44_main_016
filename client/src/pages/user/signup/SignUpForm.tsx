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
import SelectBox from '../../../components/SelectBox';
import { EMAIL_DOMAIN } from '../../../constants/selectItems';
import getSignUpNewError from '../../../utils/inputValidationError';

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
  console.log(error);
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
        <S.InputContainer key={i}>
          <S.LabelBox>
            <S.Label htmlFor={el.label.htmlFor}>
              {el.label.text}
              <span>{el.label.required && '*'}</span>
            </S.Label>
          </S.LabelBox>
          <S.EmailAddress className={i === inputData.length - 1 ? 'email' : ''}>
            <S.InputBox className={i === inputData.length - 1 ? 'email' : ''}>{el.component}</S.InputBox>
            {el.subComponent && (
              <S.DomainBox>
                <div>@</div>
                <SelectBox
                  totalItem={EMAIL_DOMAIN}
                  searchItem={domainValue}
                  setSearchItem={setDomainValue}
                  placeholder='직접 입력'
                  ariaLabel='이메일 도메인 입력 또는 찾기'
                />
              </S.DomainBox>
            )}
          </S.EmailAddress>
          <S.ErrorBox>
            <S.Error>{el.error}</S.Error>
          </S.ErrorBox>
        </S.InputContainer>
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
  InputContainer: styled.div`
    margin-bottom: 48px;
  `,
  LabelBox: styled.div``,
  Label: styled.label`
    font-weight: 600;
    font-size: 1.13rem;
    display: inline-block;
    margin-bottom: 10px;
    > span {
      color: var(--color-point-pink);
      display: inline-block;
      margin-left: 0.5rem;
    }
  `,
  ErrorBox: styled.div`
    margin-top: 0.5rem;
    padding-left: 1rem;
  `,
  Error: styled.label`
    color: var(--color-point-pink);
    font-size: 0.98rem;
    border: 1px solid transparent;
  `,
  InputBox: styled.div`
    &.email {
      width: 44%;
    }
  `,
  DomainBox: styled.div`
    width: 56%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    > div:first-of-type {
      color: #c4c4c4;
      margin: 0 1rem;
      font-size: 1.2rem;
    }
  `,
  EmailAddress: styled.div`
    &.email {
      display: flex;
    }
  `,
};

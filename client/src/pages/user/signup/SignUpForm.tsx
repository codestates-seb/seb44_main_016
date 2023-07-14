import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommonStyles from '../../../styles/CommonStyles';
import useInput from '../../../hooks/useComponents';
import useCheckboxError from '../../../hooks/useCheckoutError';
import { SIGN_UP_MESSAGES } from '../../../constants/user';
import SelectBox from '../../../components/SelectBox';
import validation from '../../../utils/validationCheck';
import apiUser from '../../../services/apiUser';
import { EMAIL_DOMAIN } from '../../../constants/selectItems';
import { useRefusalAni, isClickedStyled, SubmitBoxProps } from '../../../hooks/useRefusalAni';

export default function SignUpForm() {
  const router = useRouter();
  const [IdInput, loginId] = useInput('text', '아이디', 'loginId');
  const [PwInput, pwValue] = useInput('password', '비밀번호', 'pw');
  const [PwConfirmInput, password] = useInput('password', '비밀번호 확인', 'pwConfirm');
  const [nicknameInput, nickname] = useInput('text', '닉네임', 'nickname');
  const [emailInput, emailValue] = useInput('text', '이메일', 'email');
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

    router.push('/user/login');
  };

  return (
    <S.FormContainer>
      <S.InputMapWrapper>
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
                    aria-label='이메일 도메인 입력 또는 찾기'
                  />
                </S.DomainBox>
              )}
            </S.EmailAddress>
            <S.Error>{el.error}</S.Error>
          </S.InputContainer>
        ))}
      </S.InputMapWrapper>

      <S.PolicyContainer>
        <S.PolicyLabel>
          약관동의
          <span>*</span>
        </S.PolicyLabel>
        {CheckboxComponent}
      </S.PolicyContainer>
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
  InputContainer: styled.div`
    margin-bottom: 48px;
  `,
  InputMapWrapper: styled.div``,
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
  Error: styled.div`
    padding-left: 1rem;
    margin-top: 8px;
    color: var(--color-point-pink);
    font-size: 0.98rem;
    font-weight: 400;
  `,
  PolicyContainer: styled.div`
    margin: 4rem 0 1rem 0;
  `,
  Policy: styled.div`
    padding: 1rem 0.6rem 0.1rem 0.6rem;
    display: flex;
    align-items: center;
  `,
  PolicyLabel: styled.div`
    font-weight: 600;
    font-size: 1.13rem;
    display: inline-block;
    padding-left: 10px;
    margin-bottom: 1.3rem;

    > span {
      color: var(--color-point-pink);
      display: inline-block;
      margin-left: 0.5rem;
    }
  `,
  PolicyGuide: styled.label`
    font-size: 0.9rem;
    color: #a4a7b5;
    margin-left: 0.7rem;
  `,
  RadioBtnLabel: styled.label`
    font-weight: 600;
    margin-left: 0.6rem;
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

  SubmitBox: styled.div<SubmitBoxProps>`
    margin: 2rem 0 4rem 0;
    ${isClickedStyled}
    font-size: 1.2rem;
    font-weight: 500;
  `,
};

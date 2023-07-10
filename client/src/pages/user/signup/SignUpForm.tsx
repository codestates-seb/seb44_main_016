// 'use client';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommonStyles from '../../../styles/CommonStyles';
import useInput from '../../../hooks/useComponents';
import CheckboxAgreement from '../../../components/CheckboxAgreement';
import { SIGN_UP_MESSAGES } from '../../../constants/user';
import SelectBox from '../../../components/SelectBox';
import validation from '../../../utils/validationCheck';
import { bounce } from '../../../animation/keyframe';
import apiUser from '../../../services/apiUser';

export default function SignUpForm() {
  const router = useRouter();
  const [IdInput, loginId, setLoginId] = useInput('text', '아이디', 'loginId');
  const [PwInput, pwValue, setPwValue] = useInput('password', '비밀번호', 'pw');
  const [PwConfirmInput, password, setPassword] = useInput(
    'password',
    '비밀번호 확인',
    'pwConfirm'
  );
  const [nicknameInput, nickname, setNickname] = useInput(
    'text',
    '닉네임',
    'nickname'
  );
  const [emailInput, emailValue, setEmailValue] = useInput(
    'text',
    '이메일',
    'email'
  );

  const [error, setError] = useState({
    loginId: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
    policy: '',
  });

  const { CheckboxComponent, isChecked, setIsChecked } = CheckboxAgreement({
    labelTitle: '전체동의',
    checkboxAgreement: SIGN_UP_MESSAGES.POLICY_GUIDE,
    agreementError: error.policy,
    isBackgroundWhite: true,
  });

  const [isClicked, setIsClicked] = useState(false);
  const [domainValue, setDomainValue] = useState('');

  useEffect(() => {
    const newError = {
      loginId: loginId
        ? validation.loginId(loginId || '')
        : '다른 사용자와 겹치지 않도록 아이디를 입력해주세요. (4~10자)',
      password: pwValue
        ? validation.password(pwValue || '')
        : '영문 소문자와 숫자, 특수기호(!@#$%^&*())를 모두 포함하여 입력해주세요. (8~16자)',
      passwordConfirm: password
        ? validation.passwordMatch(pwValue || '', password || '')
        : '확인을 위해 비밀번호를 다시 입력해주세요.',
      nickname: nickname
        ? validation.nickname(nickname || '')
        : '닉네임을 입력해주세요. 마이 페이지에서 변경 가능합니다.',
      email:
        domainValue && emailValue
          ? validation.email(domainValue || '')
          : '이메일을 입력해주세요.',
      policy: isChecked ? '' : '필수 약관에 동의해주세요.',
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
    if (
      error.loginId ||
      error.passwordConfirm ||
      error.nickname ||
      error.email ||
      error.policy
    ) {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 1000);
      return;
    }

    const res = await mutateAsync();
    console.log(res);
    setLoginId('');
    setPwValue('');
    setPassword('');
    setNickname('');
    setEmailValue('');
    setDomainValue('');
    router.push('/');
  };

  return (
    <S.FormContainer>
      <S.InputMapWrapper>
        {inputData.map((el, i) => (
          <S.InputContainer key={i}>
            <S.LabelBox>
              <S.Label htmlFor={el.label.htmlFor}>
                <h2>{el.label.text}</h2>
                <span>{el.label.required && '*'}</span>
              </S.Label>
            </S.LabelBox>
            <S.EmailAddress
              className={i === inputData.length - 1 ? 'email' : ''}
            >
              <S.InputBox className={i === inputData.length - 1 ? 'email' : ''}>
                {el.component}
              </S.InputBox>
              {el.subComponent && (
                <S.DomainBox>
                  <div>@</div>
                  <SelectBox
                    searchItem={domainValue}
                    setSearchItem={setDomainValue}
                    aria-label='이메일 도메인 입력 또는 찾기'
                  />
                </S.DomainBox>
              )}
            </S.EmailAddress>
            <S.Error>
              <h3 className='blind'>에러 메시지</h3>
              <h4>{el.error}</h4>{' '}
            </S.Error>
          </S.InputContainer>
        ))}
      </S.InputMapWrapper>

      <S.PolicyContainer>
        <S.PolicyLabel>
          <h2>약관동의</h2>
          <span>*</span>
        </S.PolicyLabel>
        {CheckboxComponent}
      </S.PolicyContainer>
      <S.SubmitBox isClicked={isClicked ? 'true' : undefined}>
        <S.SubmitBtn large onClick={handleSignUpSubmit}>
          <h2>회원가입</h2>
        </S.SubmitBtn>
      </S.SubmitBox>
    </S.FormContainer>
  );
}

interface SubmitBoxProps {
  isClicked?: string | undefined;
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
    h2 {
      font-weight: 600;
      font-size: 1.13rem;
      display: inline-block;
      margin-bottom: 10px;
    }
    > span {
      color: var(--color-point-pink);
      display: inline-block;
      margin-left: 0.5rem;
    }
  `,
  Error: styled.div`
    padding-left: 20px;
    margin-top: 8px;
    color: var(--color-point-pink);
    h4 {
      font-size: 0.98rem;
      font-weight: 400;
    }
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
    h2 {
      font-weight: 600;
      font-size: 1.13rem;
      display: inline-block;
      padding-left: 10px;
      margin-bottom: 1.3rem;
    }
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
    > div:first-child {
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
    ${({ isClicked }) =>
      isClicked &&
      css`
        animation: ${bounce} 1s infinite;
      `}
    h2 {
      font-size: 1.2rem;
      font-weight: 500;
    }
  `,
};

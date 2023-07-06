// 'use client';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommonStyles from '../../../styles/CommonStyles';
import useInput, { useCheckboxInput } from '../../../hooks/useComponents';
import { SIGN_UP_MESSAGES } from '../../../constants/signUp';
import SelectBox from '../../../components/SelectBox';
import {
  validateEmail,
  validateLoginId,
  validatePassword,
  validateNickname,
  checkPasswordMatch,
} from '../../../utils/validationCheck';
import postSignUpData from '../../../services/apiRequest';
import { PostSignUp } from '../../../types/SignUp';

export default function SignUpForm() {
  const router = useRouter();
  const [Checkbox, isChecked, setIsChecked] = useCheckboxInput(
    'checkbox',
    'policy'
  );
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

  const [isClicked, setIsClicked] = useState(false);
  const [domainValue, setDomainValue] = useState('');

  useEffect(() => {
    const newError = {
      loginId: loginId
        ? validateLoginId(loginId || '')
        : '아이디를 입력해주세요.',
      password: pwValue
        ? validatePassword(pwValue || '')
        : '비밀번호를 입력해주세요.',
      passwordConfirm: password
        ? checkPasswordMatch(pwValue || '', password || '')
        : '확인을 위해 비밀번호를 다시 입력해주세요.',
      nickname: nickname
        ? validateNickname(nickname || '')
        : '닉네임을 입력해주세요. 마이 페이지에서 변경 가능합니다.',
      email: domainValue
        ? validateEmail(domainValue || '')
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
      guide: SIGN_UP_MESSAGES.LOGIN_ID_GUIDE,
      component: IdInput,
      error: error.loginId,
    },
    {
      label: {
        htmlFor: 'pw',
        text: '비밀번호',
        required: true,
      },
      guide: SIGN_UP_MESSAGES.PASSWORD_GUIDE,
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

  async function sendPostRequest(data: PostSignUp) {
    const url =
      'https://zerohip-git-user-55-everland.vercel.app/api/user/signup';
    try {
      const responseData = await postSignUpData(url, data);
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !loginId ||
      !pwValue ||
      !password ||
      !nickname ||
      !emailValue ||
      !domainValue
    ) {
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 1000);
      return;
    }

    const data = {
      email: emailValue + '@' + domainValue,
      loginId,
      password,
      nickname,
    };

    sendPostRequest(data);
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
                {el.label.text}
                <span>{el.label.required && '*'}</span>
              </S.Label>
              <S.Guide>{el.guide ? el.guide : null}</S.Guide>
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
                  />
                </S.DomainBox>
              )}
            </S.EmailAddress>
            <S.Error>{el.error} </S.Error>
          </S.InputContainer>
        ))}
      </S.InputMapWrapper>

      <S.PolicyContainer>
        <S.PolicyLabel htmlFor='라벨'>
          약관동의
          <span>*</span>
        </S.PolicyLabel>
        <S.Policy>
          {Checkbox}
          <S.RadioBtnLabel htmlFor='policy'>전체동의</S.RadioBtnLabel>
          <S.PolicyGuide htmlFor='policy'>
            {SIGN_UP_MESSAGES.POLICY_GUIDE}
          </S.PolicyGuide>
        </S.Policy>
        <S.Error>{error.policy}</S.Error>
      </S.PolicyContainer>
      <S.SubmitBox isClicked={isClicked ? 'true' : undefined}>
        <S.SubmitBtn large onClick={handleSubmit}>
          회원가입
        </S.SubmitBtn>
      </S.SubmitBox>
    </S.FormContainer>
  );
}

const bounce = keyframes`
  0% {
    transform: translateX(0);
  }
  30% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
  70% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
`;
interface SubmitBoxProps {
  isClicked?: string | undefined;
}
const S = {
  ...CommonStyles,
  FormContainer: styled.form`
    width: 50%;
    padding: 8px;
    margin-top: 20px;
  `,
  InputContainer: styled.div`
    margin-bottom: 48px;
  `,
  InputMapWrapper: styled.div``,
  LabelBox: styled.div`
    padding-left: 10px;
  `,
  Label: styled.label`
    font-weight: 700;
    font-size: 1.13rem;
    display: inline-block;
    margin-bottom: 10px;
    > span {
      color: #e483b0;
      display: inline-block;
      margin-left: 0.5rem;
    }
  `,
  Guide: styled.div`
    font-size: 1rem;
    color: #a4a7b5;
    margin-bottom: 14px;
  `,
  Error: styled.div`
    padding-left: 20px;
    font-size: 0.9rem;
    margin-top: 8px;
    color: #e483b0;
  `,
  PolicyContainer: styled.div`
    margin: 5rem 0 1rem 0;
  `,
  Policy: styled.div`
    padding: 1rem 0.6rem 0.1rem 0.6rem;
    display: flex;
    align-items: center;
  `,
  PolicyLabel: styled.label`
    font-weight: 700;
    font-size: 1.13rem;
    display: inline-block;
    margin-bottom: 10px;
    padding-left: 10px;
    > span {
      color: #e483b0;
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
  `,
};

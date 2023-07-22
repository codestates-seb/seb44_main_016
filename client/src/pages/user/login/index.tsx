import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/redux/store';
import styled from '@emotion/styled';
import useInput from '../../../hooks/useComponents';
import Logo from '../../../../public/images/logo.svg';
import CommonStyles from '../../../styles/CommonStyles';
import Oauth from './OAuth';
import apiUser from '../../../services/apiUser';
import { useRefusalAni, isClickedStyled, SubmitBoxProps } from '../../../hooks/useRefusalAni';
import { toast } from 'react-toastify';
import useMutateUser from '../../../services/useMutateUser';

export default function Login() {
  const [IdInput, loginId, setLoginId] = useInput('text', '아이디', 'loginId', 'username');
  const [PwInput, pwValue, setPwValue] = useInput('password', '비밀번호', 'pw', 'current-password');
  const [isClickedProps, RefusalAnimation] = useRefusalAni();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const router = useRouter();

  const loginData = {
    loginId,
    password: pwValue,
  };
  const { LoginMutate } = useMutateUser.login(apiUser.postLogin);
  const isLoggedIn = useSelector<RootState>((state) => state.authnReducer.login.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) router.push('/');
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginId || !pwValue) {
      toast.error('아이디나 비밀번호를 입력해주세요.');
      RefusalAnimation();
      return;
    }

    LoginMutate(loginData);
    setLoginId('');
    setPwValue('');
    return;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <S.LoginContainer>
      <Head>
        <title>제로힙 로그인 페이지</title>
        <meta name='description' content='제로힙 서비스를 이용하기 위해 로그인을 하는 페이지입니다.' />
      </Head>
      <S.LoginWrapper>
        <S.HomeBtn type='button' onClick={() => router.push(`/`)}>
          <Logo width={isSmallScreen ? '260' : '337'} aria-label='제로힙 로고' />
        </S.HomeBtn>
        <S.LoginFormBox>
          <S.inputBox>{IdInput}</S.inputBox>
          <S.inputBox>{PwInput}</S.inputBox>
          <S.LoginBtnBox {...isClickedProps}>
            <S.SubmitBtn large onClick={handleLoginSubmit}>
              로그인
            </S.SubmitBtn>
          </S.LoginBtnBox>
        </S.LoginFormBox>
        <S.Guide>
          <S.SignUpBtn type='button' onClick={() => router.push('/user/signup')}>
            회원가입
          </S.SignUpBtn>
          <div> | </div>
          <S.FindPasswordBtn>비밀번호 찾기</S.FindPasswordBtn>
        </S.Guide>
        <Oauth />
      </S.LoginWrapper>
    </S.LoginContainer>
  );
}

const S = {
  ...CommonStyles,
  LoginContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `,
  HomeBtn: styled.button`
    margin: 0 0.7rem 2.5rem 0;
    @media screen and (max-width: 768px) {
      margin: 2.2rem 0em 1.5rem 0;
    }
  `,
  LoginWrapper: styled.div`
    width: 300px;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.2rem;
  `,
  LoginFormBox: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  inputBox: styled.div`
    width: 94%;
    &:first-of-type {
      margin-bottom: 0.9rem;
    }
    @media screen and (max-width: 768px) {
      width: 260px;
    }
    @media screen and (max-width: 480px) {
      width: 230px;
    }
  `,
  LoginBtnBox: styled.div<SubmitBoxProps>`
    width: 60%;
    margin: 2.3rem 0 3rem 0;
    ${isClickedStyled}
    font-size: 1.1rem;
    font-weight: 500;
  `,
  Guide: styled.div`
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.8rem;
    color: var(--color-point-gray);
  `,
  SignUpBtn: styled.button`
    color: var(--color-gray04);
    margin-right: 1.5rem;
    &:hover {
      color: var(--color-primary);
    }
  `,
  FindPasswordBtn: styled.button`
    color: var(--color-gray04);
    margin-left: 1.5rem;
    &:hover {
      color: var(--color-primary);
    }
  `,
};

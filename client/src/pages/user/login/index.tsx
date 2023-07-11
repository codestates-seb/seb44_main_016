'use server';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useInput from '../../../hooks/useComponents';
import Logo from '../../../../public/image/logo.svg';
import CommonStyles from '../../../styles/CommonStyles';
import { bounce } from '../../../animation/keyframe';
import Oauth from './OAuth';
import apiUser from '../../../services/apiUser';
import { useAppDispatch } from '../../../components/redux/hooks';
import { login } from '../../../components/redux/authnReducer';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export default function Login() {
  const [IdInput, loginId, setLoginId] = useInput('text', '아이디', 'loginId');
  const [PwInput, pwValue, setPwValue] = useInput('password', '비밀번호', 'pw');

  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loginData = {
    loginId,
    password: pwValue,
  };

  const { mutateAsync } = useMutation(() => apiUser.postLogin(loginData));

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await mutateAsync();
    console.log(res.data.user);

    if (res.status === 200) {
      // console.log('here');
      // const accessToken = res.headers.Authorization;
      const accessToken = 'ggg';
      // console.log(accessToken);
      const { loginId, nickname, userId } = res.data.user;
      // const refreshToken = getCookie('refreshToken'); 나중에 서버 연결 후
      // console.log(refreshToken); 나중에 서버 연결 후
      setCookie('refreshToken', '리프레쉬톸흔'); // 나중에 refreshToken 자동으로 받아옴

      dispatch(login({ userId, accessToken, loginId, nickname, isLoggedIn: true }));
      router.push(`/user/mypage/${userId}`);
    }

    return;
  };

  return (
    <S.LoginContainer>
      <Head>
        <title>제로힙 로그인 페이지</title>
      </Head>
      <S.LoginWrapper>
        <S.HomeBtnBox>
          <Link href='/'>
            <Logo width='300' />
          </Link>
        </S.HomeBtnBox>
        <S.LoginFormBox>
          <S.inputBox>{IdInput}</S.inputBox>
          <S.inputBox>{PwInput}</S.inputBox>
          <S.LoginBox isClicked={isClicked ? 'true' : undefined}>
            <S.SubmitBtn large onClick={handleLoginSubmit}>
              <h1>로그인</h1>
            </S.SubmitBtn>
          </S.LoginBox>
        </S.LoginFormBox>
        <S.Guide>
          <S.SignUpBtn onClick={() => router.push('/user/signup')}>
            <h2>회원가입</h2>
          </S.SignUpBtn>
          <div> | </div>
          <S.FindPasswordBtn>
            <h2>비밀번호 찾기</h2>
          </S.FindPasswordBtn>
        </S.Guide>
        <S.OauthBox>
          <Oauth />
        </S.OauthBox>
      </S.LoginWrapper>
    </S.LoginContainer>
  );
}

interface SubmitBoxProps {
  isClicked?: string | undefined;
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
  HomeBtnBox: styled.div`
    margin: 0 0.7rem 2.5rem 0;
  `,
  LogoBtn: styled.button``,

  LoginWrapper: styled.div`
    width: 28%;
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
    width: 100%;
    margin-bottom: 0.5rem;
  `,
  AutoLogin: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.6rem 0;
  `,
  LoginBox: styled.div<SubmitBoxProps>`
    width: 60%;
    margin: 1.6rem 0 3rem 0;
    ${({ isClicked }) =>
      isClicked &&
      css`
        animation: ${bounce} 1s infinite;
      `}
    h1 {
      font-size: 1.1rem;
      font-weight: 500;
    }
  `,
  Guide: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 1.8rem;
    color: var(--color-point-gray);
  `,
  SignUpBtn: styled.button`
    h2 {
      font-size: 1rem;
      font-weight: 400;
      color: var(--color-gray04);
      margin-right: 1.5rem;
      &:hover {
        color: var(--color-primary);
      }
    }
  `,
  FindPasswordBtn: styled.button`
    h2 {
      font-size: 1rem;
      font-weight: 400;
      color: var(--color-gray04);
      margin-left: 1.5rem;
      &:hover {
        color: var(--color-primary);
      }
    }
  `,
  OauthBox: styled.div``,
};
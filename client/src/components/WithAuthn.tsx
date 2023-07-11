'use client';

import { useEffect } from 'react';
import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import MyPage from '../pages/user/mypage/[slug]';

const withAuthn =
  (MyPage: ComponentType) =>
  // <P extends {}>(props: P) => {
  (props) => {
    const router = useRouter();
    const refreshToken = getCookie('refreshToken'); // 임시
    // 리프레시 토큰만 있어도 accessToken과 유저 정보 갱신 가능
    console.log(refreshToken);
    useEffect(() => {
      if (!refreshToken) {
        console.log('no!');
        alert('로그인 먼저!');
        router.replace('/');
        return;
      }
    }, []);

    if (refreshToken) {
      return <MyPage {...props} />;
    }
    return;
  };

export default withAuthn;

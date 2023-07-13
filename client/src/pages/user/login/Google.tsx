import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Google from '../../../../public/icon/google.svg';

export default function GoogleOauth() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectURI = 'http://localhost:3000/oauth/google';
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid%20profile%20email&redirect_uri=${redirectURI}`;

  const handleGoogleLogin = () => {
    window.location.href = googleURL;
  };

  return (
    <S.OauthLoginBtn type='button' aria-label='카카오 로그인 버튼' onClick={handleGoogleLogin}>
      <Google width='60' aria-hidden={true} />
    </S.OauthLoginBtn>
  );
}

const S = {
  OauthLoginBtn: styled.button``,
};

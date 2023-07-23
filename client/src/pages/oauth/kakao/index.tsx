import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Loading from '../../../components/Loading';
import useMutateUser from '../../../services/useMutateUser';
import apiUser from '../../../services/apiUser';

const KakaoOauthRedirection = () => {
  let code: string | null = null;
  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const clientSecret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;
  console.log(clientId, clientSecret);

  useEffect(() => {
    const codeValue = new URLSearchParams(window.location.search).get('code');
    if (codeValue) {
      code = codeValue;
      console.log(code);
    }
  }, []);

  useEffect(() => {
    if (code && clientId && clientSecret) {
      const oAuthData = {
        grantType: 'authorization_code',
        code: code,
        redirectURI: 'https://zerohip.co.kr/oauth/kakao',
        clientId,
        clientSecret,
      };
      const targetOAuth = 'kakao';
      const oAuthReqBody = { oAuthData, targetOAuth };
      console.log(oAuthReqBody);

      const { LoginMutate } = useMutateUser.login(apiUser.postOAuthCode);
      LoginMutate(oAuthReqBody);
    }
  }, [code]);

  return <Loading />;
};

export default KakaoOauthRedirection;

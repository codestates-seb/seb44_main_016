import React, { useEffect } from 'react';
import Loading from '../../../components/Loading';
import useMutateUser from '../../../services/useMutateUser';
import apiUser from '../../../services/apiUser';

const GoogleOauthRedirection = () => {
  let code: string | null = null;
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

  const { LoginMutate } = useMutateUser.login(apiUser.postOAuthCode);

  useEffect(() => {
    const codeValue = new URLSearchParams(window.location.search).get('code');
    if (codeValue) {
      code = codeValue;
    }
  }, []);

  const handleOAuthLogin = () => {
    if (code && clientId && clientSecret) {
      const oAuthData = {
        grantType: 'authorization_code',
        code: code,
        redirectURI: 'https://zerohip.co.kr/oauth/google',
        clientId,
        clientSecret,
      };
      const targetOAuth = 'google';
      const oAuthReqBody = { oAuthData, targetOAuth };
      console.log(oAuthReqBody);
      LoginMutate(oAuthReqBody);
    }
  };

  useEffect(() => {
    handleOAuthLogin();
  }, [code]);

  return <Loading />;
};

export default GoogleOauthRedirection;

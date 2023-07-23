import React, { useEffect } from 'react';
import Loading from '../../../components/Loading';
import useMutateUser from '../../../services/useMutateUser';
import apiUser from '../../../services/apiUser';

const NaverOauthRedirection = () => {
  let code: string | null = null;
  let state: string | null = null;
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;

  useEffect(() => {
    const codeValue = new URLSearchParams(window.location.search).get('code');
    const stateValue = new URLSearchParams(window.location.search).get('state');
    if (codeValue && stateValue) {
      code = codeValue;
      state = stateValue;
    }
  }, []);

  useEffect(() => {
    if (code && state && clientId && clientSecret) {
      const oAuthData = {
        grantType: 'authorization_code',
        code: code,
        state: state,
        redirectURI: 'https://zerohip.co.kr',
        clientId,
        clientSecret,
      };
      const targetOAuth = 'naver';
      const oAuthReqBody = { oAuthData, targetOAuth };

      const { LoginMutate } = useMutateUser.login(apiUser.postOAuthCode);
      LoginMutate(oAuthReqBody);
    }
  }, [code]);

  return <Loading />;
};

export default NaverOauthRedirection;

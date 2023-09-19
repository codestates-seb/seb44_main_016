import React, { useEffect } from 'react';
import Loading from '../../../components/Loading';
import useMutateUser from '../../../services/mutate/useMutateUser';
import apiUser from '../../../services/apiUser';
import { handleOAuthLogin } from '../../../utils/oauth/handleOAuthLogin';

const NaverOauthRedirection = () => {
  let code: string | null = null;
  let state: string | null = null;
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;

  const { LoginMutate } = useMutateUser.login(apiUser.postOAuthCode);

  useEffect(() => {
    const codeValue = new URLSearchParams(window.location.search).get('code');
    const stateValue = new URLSearchParams(window.location.search).get('state');
    if (codeValue && stateValue) {
      code = codeValue;
      state = stateValue;
    }
  }, []);

  useEffect(() => {
    handleOAuthLogin({ name: 'naver', code, clientId, clientSecret, state, LoginMutate });
  }, [code]);

  return <Loading />;
};

export default NaverOauthRedirection;

import React, { useEffect } from 'react';
import Loading from '../../../components/Loading';
import useMutateUser from '../../../services/mutate/useMutateUser';
import apiUser from '../../../services/apiUser';
import { handleOAuthLogin } from '../../../utils/oauth/handleOAuthLogin';

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

  useEffect(() => {
    handleOAuthLogin({ name: 'google', code, clientId, clientSecret, LoginMutate });
  }, [code]);

  return <Loading />;
};

export default GoogleOauthRedirection;

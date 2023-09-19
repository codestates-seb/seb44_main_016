import React, { useEffect } from 'react';
import Loading from '../../../components/Loading';
import useMutateUser from '../../../services/mutate/useMutateUser';
import apiUser from '../../../services/apiUser';
import { handleOAuthLogin } from '../../../utils/oauth/handleOAuthLogin';
import { OAUTH } from '../../../constants/oauth/oauth';

const KakaoOauthRedirection = () => {
  let code: string | null = null;
  const clientId = OAUTH.KAKAO_API_KEY;

  const { LoginMutate } = useMutateUser.login(apiUser.postOAuthCode);

  useEffect(() => {
    const codeValue = new URLSearchParams(window.location.search).get('code');
    if (codeValue) {
      console.log(codeValue);
      code = codeValue;
    }
  }, []);

  useEffect(() => {
    handleOAuthLogin({ name: 'kakao', code, clientId, LoginMutate });
  }, [code]);

  return <Loading />;
};

export default KakaoOauthRedirection;

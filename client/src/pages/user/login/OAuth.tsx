import styled from '@emotion/styled';
import OAuthBtn from './OAuthBtn';
import { googleRedirectURL, kakaoRedirectURL, naverRedirectURL } from '../../../constants/oauth/oauth';

export default function Oauth() {
  const handleOAuthLogin = (redirectURL: string) => () => {
    window.location.href = redirectURL;
  };

  return (
    <S.OauthBox>
      <OAuthBtn name='네이버' handleLogin={handleOAuthLogin(naverRedirectURL)} />
      <OAuthBtn name='카카오' handleLogin={handleOAuthLogin(kakaoRedirectURL)} />
      <OAuthBtn name='구글' handleLogin={handleOAuthLogin(googleRedirectURL)} />
    </S.OauthBox>
  );
}

const S = {
  OauthBox: styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  `,
};

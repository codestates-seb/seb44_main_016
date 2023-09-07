import styled from '@emotion/styled';
import Google from '../../../../public/images/icon/oauth/google.svg';

export default function GoogleOauth() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectURI = 'https://www.zerohip.co.kr/oauth/google';
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid%20profile%20email&redirect_uri=${redirectURI}`;

  const handleGoogleLogin = () => {
    window.location.href = googleURL;
  };

  return (
    <S.OauthLoginBtn type='button' aria-label='구글 로그인 버튼' onClick={handleGoogleLogin}>
      <Google width='55' aria-hidden={true} />
      <div>구글로 시작하기</div>
    </S.OauthLoginBtn>
  );
}

const S = {
  OauthLoginBtn: styled.button`
    width: 100%;
    height: 55px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    > div {
      margin-left: 3px;
    }
  `,
};

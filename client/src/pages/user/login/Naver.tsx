import styled from '@emotion/styled';
import Naver from '../../../../public/images/icon/naver.svg';

export default function NaverOauth() {
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;
  const redirectURI = 'https://www.zerohip.co.kr/oauth/naver';

  const naverAuthURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&state=${clientSecret}&redirect_uri=${redirectURI}`;

  const handleNaverLogin = () => {
    window.location.href = naverAuthURL;
  };

  return (
    <S.OauthLoginBtn type='button' aria-label='네이버 로그인 버튼' onClick={handleNaverLogin}>
      <Naver width='60' aria-hidden={true} />
    </S.OauthLoginBtn>
  );
}

const S = {
  OauthLoginBtn: styled.button``,
};

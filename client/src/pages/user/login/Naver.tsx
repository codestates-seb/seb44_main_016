import styled from '@emotion/styled';
import Naver from '../../../../public/images/icon/oauth/naver.svg';

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
      <Naver width='55' aria-hidden={true} />
      <div>네이버로 시작하기</div>
    </S.OauthLoginBtn>
  );
}

const S = {
  OauthLoginBtn: styled.button`
    width: 100%;
    height: 55px;
    background-color: #06be34;
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    > div {
      margin-left: 3px;
    }
  `,
};

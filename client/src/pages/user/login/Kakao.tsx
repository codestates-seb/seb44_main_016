import styled from '@emotion/styled';
import Kakao from '../../../../public/images/icon/oauth/kakao.svg';

export default function KakaoOauth() {
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectURI = 'https://www.zerohip.co.kr/oauth/kakao';
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectURI}&response_type=code`;

  const handleKakaoLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = kakaoAuthURL;
  };

  return (
    <S.OauthLoginBtn type='button' aria-label='카카오 로그인 버튼' onClick={handleKakaoLogin}>
      <Kakao width='55' aria-hidden={true} />
      <div>카카오로 시작하기</div>
    </S.OauthLoginBtn>
  );
}

const S = {
  OauthLoginBtn: styled.button`
    width: 100%;
    height: 55px;
    background-color: #ffeb3b;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    > div {
      margin-left: 3px;
    }
  `,
};

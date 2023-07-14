import styled from '@emotion/styled';
import Naver from './Naver';
import Google from './Google';
import Kakao from './Kakao';

export default function Oauth() {
  return (
    <S.OauthBox>
      <Naver />
      <Kakao />
      <Google />
    </S.OauthBox>
  );
}

const S = {
  OauthBox: styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
  `,
};

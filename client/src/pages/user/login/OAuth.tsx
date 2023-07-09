import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Naver from '../../../../public/icon/naver.svg';
import Kakao from '../../../../public/icon/kakao.svg';
import Google from '../../../../public/icon/google.svg';

export default function Oauth() {
  return (
    <S.Container>
      <S.OauthBox>
        <S.OauthLoginBtn type='button' aria-label='네이버 로그인 버튼'>
          <Naver width='60' aria-hidden={true} />
        </S.OauthLoginBtn>
        <S.OauthLoginBtn type='button' aria-label='카카오 로그인 버튼'>
          <Kakao width='60' aria-hidden={true} />
        </S.OauthLoginBtn>
        <S.OauthLoginBtn type='button' aria-label='구글 로그인 버튼'>
          <Google width='60' aria-hidden={true} />
        </S.OauthLoginBtn>
      </S.OauthBox>
    </S.Container>
  );
}

const S = {
  Container: styled.form`
    width: 100%;
    height: 100%;
  `,
  OauthBox: styled.div``,
  OauthLoginBtn: styled.button`
    margin-left: 1.5rem;
    :nth-child(1) {
      margin-left: 0;
    }
  `,
};

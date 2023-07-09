import Head from 'next/head';
import styled from '@emotion/styled';
import Logo from '../../../../public/image/logo.svg';
import SignUpForm from './SignUpForm';
import Link from 'next/link';

export default function SignUp() {
  return (
    <S.Container>
      <Head>
        <title>제로힙 회원가입 페이지</title>
      </Head>
      <S.HomeBtnBox>
        <Link href='/'>
          <h1 className='blind'>회원가입</h1>
          <Logo width='337' />
          <h2 className='blind'>홈으로 이동하는 제로힙 로고 이미지</h2>
        </Link>
      </S.HomeBtnBox>
      <SignUpForm />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  HomeBtnBox: styled.button`
    margin: 2.2rem 2.8rem 1.5rem 0;
  `,
};

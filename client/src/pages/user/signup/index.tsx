import Head from 'next/head';
import styled from '@emotion/styled';
import Logo from '../../../../public/images/logo.svg';
import SignUpForm from './SignUpForm';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();
  return (
    <S.Container>
      <Head>
        <title>제로힙 회원가입 페이지</title>
      </Head>
      <S.HomeBtnBox type='button' onClick={() => router.push('/')}>
        <h1 className='blind'>회원가입</h1>
        <Logo width='337' />
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

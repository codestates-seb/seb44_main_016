import styled from '@emotion/styled';
import Logo from '../../../../public/image/logo.svg';
import SignUpForm from './SignUpForm';
import Link from 'next/link';

export default function SignUp() {
  return (
    <S.Container>
      <Link href='/'>
        <S.LogoBtn type='button'>
          <Logo width='337' aria-label='제로힙 로고 아이콘' />
        </S.LogoBtn>
      </Link>
      <SignUpForm />
    </S.Container>
  );
}

const S = {
  Container: styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  LogoBtn: styled.button`
    margin: 35px 45px 25px 0;
  `,
};

import styled from '@emotion/styled';
import axios from 'axios';
import Logo from '../../../../public/image/logo.svg';
import SignUpForm from './SignUpForm';

export default function SignUp() {
  return (
    <S.Container>
      <S.LogoBox>
        <Logo width='337' />
      </S.LogoBox>
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
  LogoBox: styled.div`
    margin: 35px 45px 25px 0;
  `,
};

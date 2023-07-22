import styled from '@emotion/styled';
import Logo from '../../../../public/images/logo.svg';
import SignUpForm from './SignUpForm';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import HeadMeta from '../../../components/HeadMeta';
import { userMetaData } from '../../../constants/seo/userMetaData';

export default function SignUp() {
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <S.Container>
      <HeadMeta title={userMetaData.signUpPage.title} description={userMetaData.signUpPage.description} />
      <S.HomeBtnBox type='button' onClick={() => router.push('/')}>
        <h1 className='blind'>회원가입</h1>
        <Logo width={isSmallScreen ? '260' : '337'} />
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
    @media screen and (max-width: 768px) {
      margin: 2.2rem 0em 1.5rem 0;
    }
  `,
};

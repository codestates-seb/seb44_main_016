import { useEffect } from 'react';
import styled from '@emotion/styled';
import CommonStyles from '../../../styles/CommonStyles';
import HeadMeta from '../../../components/HeadMeta';
import { USER_META_DATA } from '../../../constants/seo/userMetaData';
import useUserGlobalValue from '../../../components/redux/getUserInfo';
import Loading from '../../../components/Loading';
import LoginBox from './LoginFormBox';
import { useRouter } from 'next/router';
import { useWindowSizeWithMount } from '../../../hooks/useScreenSizeWithMount';

export default function LoginPage() {
  const router = useRouter();
  const { isSmallScreen, isMounted } = useWindowSizeWithMount();
  const { isLoggedIn } = useUserGlobalValue();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
      return;
    }
  }, [isLoggedIn]);

  return (
    <S.LoginContainer>
      <HeadMeta title={USER_META_DATA.LOGIN_PAGE.TITLE} description={USER_META_DATA.LOGIN_PAGE.DESCRIPTION} />
      {!isMounted ? <Loading /> : <LoginBox isSmallScreen={isSmallScreen} />}
    </S.LoginContainer>
  );
}

const S = {
  ...CommonStyles,
  LoginContainer: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `,
};

import type { AppProps } from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';
import { useRouter } from 'next/router';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Providers } from '../components/redux/provider';
import Aside from '../components/Aside';
import HomeHeader from '../components/HomeHeader';
import Toast from '../components/Toast';
import 'react-toastify/dist/ReactToastify.css';
import { useWindowType } from '../hooks/useWindowSize';
import { ScreenEnum } from '../constants/enums';
import React from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const windowType = useWindowType();
  const [queryClient] = React.useState(() => new QueryClient());

  let isShowNav = true;
  let isShowHeader = false;
  let bgColor = '#F0F3F8';
  let maxWidth = true;

  if (router.pathname === '/') {
    isShowHeader = true;
  } else if (
    router.pathname.startsWith('/user/signup') ||
    router.pathname.startsWith('/user/login') ||
    router.pathname.startsWith('/user/delete/goodbye')
  ) {
    isShowNav = false;
    if (router.pathname.startsWith('/user/signup')) {
      bgColor = '#FFF';
    }
    if (router.pathname.startsWith('/user/login')) {
      maxWidth = false;
    }
  }

  return (
    <>
      {/*모든 ReactDOM에 margin: 0; padding: 0; box-sizing: border-box; 적용 */}
      <Providers>
        <Toast />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyles />
            <S.RootScreen>
              <S.AppContainer maxWidth={maxWidth}>
                <S.FlexPage bgColor={bgColor}>
                  {isShowNav && <Aside isLoggedIn={false} windowType={windowType} />}
                  <S.SubPage>
                    {isShowHeader && <HomeHeader isLoggedIn={false} windowType={windowType} />}
                    <S.Main isShowNav={isShowNav} isShowHeader={isShowHeader} windowType={windowType}>
                      <Component {...pageProps} />
                    </S.Main>
                  </S.SubPage>
                </S.FlexPage>
              </S.AppContainer>
            </S.RootScreen>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Providers>
    </>
  );
};

export default App;

const S = {
  RootScreen: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
  `,

  AppContainer: styled.div<{ maxWidth: boolean }>`
    /* max-width: var(--app-max-w); */
    max-width: ${(props) => props.maxWidth && 'var(--app-max-w)'};
    width: 100%;
    display: flex;
  `,

  FlexPage: styled.div<{ bgColor?: string }>`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.bgColor || 'transparent'};
    display: flex;
  `,

  SubPage: styled.div`
    width: 100%;
    height: 100%;
  `,

  Main: styled.main<{ isShowNav: boolean; isShowHeader: boolean; windowType: ScreenEnum }>`
    width: auto;
    height: ${(props) => (props.isShowHeader ? 'calc(100% - var(--header-h));' : '100%')};
    margin-top: ${(props) => props.isShowHeader && '5rem'};
    margin-left: ${(props) =>
      props.isShowNav && props.windowType === ScreenEnum.DESKTOP
        ? 'var(--aside-w)'
        : props.isShowNav && props.windowType === ScreenEnum.TABLET
        ? 'var(--aside-shrink-w)'
        : '0'};
    display: flex;
    flex-direction: column;
  `,
};

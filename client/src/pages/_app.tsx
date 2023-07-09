import type { AppProps } from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Aside from '../components/Aside';
import HomeHeader from '../components/HomeHeader';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  let isShowNav = true;
  let isShowHeader = false;
  let bgColor = '#F0F3F8';
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
  }

  return (
    <>
      {/*모든 ReactDOM에 margin: 0; padding: 0; box-sizing: border-box; 적용 */}
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <S.RootScreen>
          <S.AppContainer>
            <S.FlexPage bgColor={bgColor}>
              {isShowNav && <Aside isLoggedIn={true} />}
              <S.SubPage>
                {isShowHeader && <HomeHeader />}
                <S.Main isShowNav={isShowNav} isShowHeader={isShowHeader}>
                  <Component {...pageProps} />
                </S.Main>
              </S.SubPage>
            </S.FlexPage>
          </S.AppContainer>
        </S.RootScreen>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
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

  AppContainer: styled.div`
    max-width: var(--app-max-w);
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

  Main: styled.main<{ isShowNav: boolean; isShowHeader: boolean }>`
    width: auto;
    height: calc(100% - var(--header-h));
    margin-top: ${(props) => props.isShowHeader && '5rem'};
    margin-left: ${(props) => props.isShowNav && 'var(--aside-w)'};
    display: flex;
    flex-direction: column;
  `,
};

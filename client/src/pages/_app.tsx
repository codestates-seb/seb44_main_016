import type { AppProps } from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Aside from '../components/Aside';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  let showNav = true;
  let bgColor = '#F0F3F8';
  if (router.pathname.startsWith('/user')) {
    showNav = false;
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
            <S.FlexPage>
              {showNav && <Aside isLoggedIn={true} />}
              <S.SubPage bgColor={bgColor}>
                <Component {...pageProps} />
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
    max-width: 1140px;
    width: 100%;
    display: flex;
  `,

  FlexPage: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
  `,

  SubPage: styled.div<{ bgColor?: string }>`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.bgColor || 'transparent'};
  `,
};

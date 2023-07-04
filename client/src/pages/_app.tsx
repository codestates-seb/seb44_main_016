import type { AppProps } from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';

import tw from 'twin.macro';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const RootScreen = tw.div`
flex justify-center w-[100vw] min-h-[100vh]
`;

const AppContainer = tw.div`
max-w-[1140px] w-full
`;

const AsideFrame = tw.aside`
w-[367px] h-full bg-pink-300 shrink-0
`;

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
      <GlobalStyles />
      <RootScreen>
        <AppContainer>
          <S.FlexPage bgColor={bgColor}>
            {showNav && <AsideFrame>sidenav 영역</AsideFrame>}
            <Component {...pageProps} />
          </S.FlexPage>
        </AppContainer>
      </RootScreen>
    </>
  );
};

export default App;

const S = {
  FlexPage: styled.div<{ bgColor?: string }>`
    ${tw`flex w-full h-full`}
    ${(props) => props.bgColor && `background-color: ${props.bgColor};`}
  `,
};

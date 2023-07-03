import type { AppProps } from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';

import tw from 'twin.macro';

const RootScreen = tw.div`
flex justify-center w-[100vw] min-h-[100vh]
`;

const AppContainer = tw.div`
max-w-[1140px] w-full
`;

const App = ({ Component, pageProps }: AppProps) => (
  <>
    {/*모든 ReactDOM에 margin: 0; padding: 0; box-sizing: border-box; 적용 */}
    <GlobalStyles />
    <RootScreen>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </RootScreen>
  </>
);

export default App;

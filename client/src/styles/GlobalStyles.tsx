import { Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStyles;

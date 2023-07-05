import { Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={`
    @import url('https://webfontworld.github.io/pretendard/Pretendard.css');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      :root {
        color: #333;
        font-family: 'Pretendard';
        font-weight: 400;
        overflow: overlay;
        overflow-x: hidden;
      }

      li {
        list-style: none;
      }
      img,
      fieldset,
      iframe {
        display: block;
        border: 0 none;
      }
      
      a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
      }
      
      em,
      address {
        font-style: normal;
      }
      
      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section,
      svg {
        display: block;
      }
      
      label {
        cursor: pointer;
      }
      
      button {
        cursor: pointer;
        background: none;
        border: none;
        outline: none;
        font-size: inherit;
        font-weight: inherit;
        font-family: inherit;
        line-height: 1;
      }

      input {
        border: none;
      }

      ::-webkit-scrollbar {
        width: 1vw; 
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(195deg, #8A96DB, #EFF1F8);  
        height: 20%;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color:#a5a5a5; 
        height: 30%;
      }



    `}
  />
);

export default GlobalStyles;

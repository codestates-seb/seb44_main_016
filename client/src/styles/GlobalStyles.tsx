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


        /* color */
        --color-primary : #676FC6;
        --color-point-red : #FF451A;
        --color-point-blue : #537FEE;
        --color-point-yellow : #F8AC19;
        --color-point-lilac : #C2C5E8;
        --color-white : #FFF;

        --color-gray01 : #333;
        --color-gray02 : #4D4D4D;
        --color-gray03 : #666;
        --color-gray04 : #808080;
        --color-gray05 : #999;
        --color-gray06 : #B3B3B3;
        --color-gray07 : #CCC;
        --color-gray08 : #E6E6E6;
        --color-gray09 : #F6F6F6;

        --color-border-gray : #E6E6E6;

        /* box-shadow */
        --shadow-default : 0 1px 10px rgba(170,170,170,25);

        /* border-radius */
        --rounded-default: 0.625rem;
        --rounded-full: 999rem;

        /* width & height */
        --app-max-w: 1140px;
        --aside-w : 15.5rem;  // 15rem~15.625rem
        --aside-tab-w: 22rem;
        --header-h : 5rem;
        --main-w : calc(var(--app-max-w) - var(--aside-w));
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

      .blind {
        position: absolute;
        width: 1px;
        height: 1px;
        border: 0;
        margin: -1px;
        padding:0;
        clip: rect(0 0 0 0);
        clip-path: inset(50%); 
        overflow: hidden;
      }
    `}
  />
);

export default GlobalStyles;

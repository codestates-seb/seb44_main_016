import { Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={`
      @import url('https://webfontworld.github.io/pretendard/Pretendard.css');

      @media screen and (max-width: 1024px)  {
        :root {
          font-size: 14px;
        }
      }
      @media screen and (max-width: 768px)  {
        :root {
          font-size: 13px;
        }
      }
      @media screen and (max-width: 480px)  {
        :root {
          font-size: 12px;
        }
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      :root {
        color: #333;
        font-family: 'Pretendard';
        font-weight: 400;
        overflow: overlay;
        overflow-x: hidden;
        overflow: overlay;
        overflow-x: hidden;


        /* color */
        --color-primary : #6264CA;
        --color-primary-hover : #858cdc;
        --color-point-purple: #7f7ad9;
        --color-point-light-blue: #929cd6;
        --color-point-red : #FF451A;
        --color-point-pink-red: #ee5353;
        --color-point-pink : #d95784;
        --color-point-blue : #537FEE;
        --color-point-yellow : #F8AC19;
        --color-point-lilac : #C2C5E8;
        --color-point-light-blue: #a8aece;
        --color-point-gray: #a4a7b5;
        --color-point-light-gray: #D6D6D6;
        --color-white : #FFF;
        --color-black: #000;

        --color-error-red: #df0c0c;

        --color-error-red: #df0c0c;

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
        --color-border-lilac : #d9d5e7;

        /* font-size */
        --text-xs : 0.75rem; // 12
        --text-s : 0.875rem; // 14
        --text-default : 1rem; // 16
        --text-m : 1.25rem; // 20
        --text-l : 1.5rem; // 24 
        --text-xl : 2rem; // 32

        --color-text-lightgray : #767676;

        /* box-shadow */
        --shadow-default : 0 1px 10px rgba(170,170,170,25);

        /* border-radius */
        --rounded-default: 0.625rem;
        --rounded-full: 999rem;

        /* width & height */
        --app-max-w: 1140px;
        --aside-w : 15.5rem;  // 15rem~15.625rem
        --aside-shrink-w : 5rem;
        --aside-mobile-h: 4rem;
        --aside-tab-w: 22rem;
        --header-h : 5rem;
        --main-w : calc(var(--app-max-w) - var(--aside-w));
        --article-w : 45rem;
        --imgcarousel-h : 23rem;
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
        font-size: inherit;
        font-weight: inherit;
        font-family: inherit;
        line-height: 1;
      }

      input {
        border: none;
      }
      
      input,textarea { font-size: var(--text-default)}

      .blind {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden;
      }

      .react-datepicker-wrapper {
        width: 100%;
      }

      ::-webkit-scrollbar {
        width: 1vw; 
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(195deg, #8A96DB, #EFF1F8);  
        border-radius: 30px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-corner {
        background: transparent;
      }
      @media screen and (max-width:1024px)  {
        :root {
          font-size:14px;
        }
        
      }
    

    `}
  />
);

export default GlobalStyles;

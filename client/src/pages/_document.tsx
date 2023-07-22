import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang='ko'>
      <Head>
        <meta charSet='UTF-8' />
        <link rel='icon' href='/images/favicon.ico' />
        <title>제로힙</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

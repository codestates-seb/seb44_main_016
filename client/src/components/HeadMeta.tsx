import Head from 'next/head';

interface HeadMetaProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export default function HeadMeta({ title, description, url, image }: HeadMetaProps) {
  return (
    <Head>
      <title>{title || '제로힙'}</title>
      <meta charSet='UTF-8' />
      <link rel='icon' href='/images/favicon.ico' key='link' />
      <meta
        name='description'
        content={description || '절약유도 가계부형 SNS | 당신의 과소비가 0으로 수렴할 때까지, 제로힙.'}
        key='description'
      />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />

      <meta property='og:title' content={title || '제로힙'} key='og:title' />
      <meta
        property='og:description'
        content={description || '절약유도 가계부형 SNS | 당신의 과소비가 0으로 수렴할 때까지, 제로힙.'}
        key='og:description'
      />
      <meta
        property='og:image'
        content={image || 'https://zerohip.co.kr/images/image/zerohipOGImg.png'}
        key='og:image'
      />
      <meta property='og:article:author' content='제로힙' key='og:article' />

      <meta name='twitter:card' content='summary_large_image' key='link' />
    </Head>
  );
}

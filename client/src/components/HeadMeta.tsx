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

      <meta
        name='description'
        content={description || '절약유도 가계부형 SNS | 당신의 과소비가 0으로 수렴할 때까지, 제로힙.'}
      />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />

      <meta property='og:title' content={title || '제로힙'} />
      <meta
        property='og:description'
        content={description || '절약유도 가계부형 SNS | 당신의 과소비가 0으로 수렴할 때까지, 제로힙.'}
      />
      <meta property='og:url' content={url || 'https://zerohip.co.kr'} />
      <meta
        property='og:image'
        content={
          image ||
          'https://media.discordapp.net/attachments/1123431285671612496/1132337861346209852/zerohipMeta.png?width=2442&height=1222'
        }
      />
      <meta property='og:article:author' content='제로힙' />

      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  );
}

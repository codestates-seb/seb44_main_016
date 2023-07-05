import React from 'react';

import tw from 'twin.macro';
import SnsArticle from '../components/common/SnsArticle';

const HomePageContainer = tw.div`
w-full flex flex-col items-center p-[30px] gap-[30px]
`;

const feedArticleDummyA = {
  feedArticleId: 1,
  feedType: 1, // 절약 팁 enum
  content:
    '절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁!',
  createdAt: new Date(),
  modifiedAt: new Date(),
  imageId: 0,
  userId: 0,
  voteId: 0,
  feedArticleHashtagId: 0,
};

const feedArticleDummyB = {
  feedArticleId: 2,
  feedType: 2, // 허락해줘! enum
  content:
    '허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘!',
  createdAt: new Date(),
  modifiedAt: new Date(),
  imageId: 0,
  userId: 0,
  voteId: 0,
  feedArticleHashtagId: 0,
};

export default function HomePage() {
  return (
    <HomePageContainer>
      <SnsArticle data={feedArticleDummyA}></SnsArticle>
      <SnsArticle data={feedArticleDummyB}></SnsArticle>
    </HomePageContainer>
  );
}

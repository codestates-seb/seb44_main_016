
import React from 'react';
import styled from '@emotion/styled';

import SnsArticle from '../components/common/SnsArticle';

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

const TimelineArticleDummyA = {
  financialRecordId: 0, // 지출/수입이 속한 가계부 ID
  category: '생활비',
  financialRecordDate: new Date(),
  price: -29_710, // 지출
  content: `산악회 여러분~~ 안뇽하세용~~!
  어제 깜빡하고 못 적어서 지금 적어올려용~!

  소단량가슴살 300g : 4,550원
  브로콜리(2입/봉) : 2,780원
  파프리카(3입/봉) : 5,460원
  국산 볶음땅콩 150g : 4,820원
  적양배추 1/2 : 10,800원
  양상추 : 1,280원
  
  
  #닭가슴살 안 사려고 했는데 결국 사버렸네용... ㅠㅠ
  자나 깨나 #충동구매 조심~! (≧▽≦)`,
  scope: 2, // 타임라인에도
  imageId: 0,
  userId: 0,
  voteId: 0,
  financialRecordArticleHashTagId: 0,
};

const TimelineArticleDummyB = {
  financialRecordId: 0, // 지출/수입이 속한 가계부 ID
  category: '급여',
  financialRecordDate: new Date(),
  price: 2_761_000, // 수입
  content: `오늘은 월급날, 후훗. from 아무도 안 보는 혼자만의 공☆간`,
  scope: 2, // 타임라인에도
  imageId: 0,
  userId: 0,
  voteId: 0,
  financialRecordArticleHashTagId: 0,
};

export default function HomePage() {
  return (
    <S.HomePageContainer>
      <SnsArticle type='timeline' data={TimelineArticleDummyA} />
      <SnsArticle type='timeline' data={TimelineArticleDummyB} />
      <SnsArticle type='feed' data={feedArticleDummyA} />
      <SnsArticle type='feed' data={feedArticleDummyB} />
    </S.HomePageContainer>
  );
}

const S = {
  HomePageContainer: styled.div`
    width: 100%;
    padding: 30px;
    gap: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
};

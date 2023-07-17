import React from 'react';
import styled from '@emotion/styled';

import SnsArticle from '../components/SnsArticle';
import { FeedArticleResType, FaRecData } from '../types/article';

const TimelineArticleDummyA: FaRecData = {
  financialRecordId: 0, // 지출/수입이 속한 가계부 ID
  financialRecordArticleId: 0,
  category: '생활비',
  faDate: '2023-12-23T12:34:56.789Z',
  title: '이마트 장 (식재료 위주)',
  price: -29_710, // 지출
  content:
    '산악회 여러분~~ 안뇽하세용~~!\r\n어제 깜빡하고 못 적어서 지금 적어올려용~!\r\n\r\n* 소단량가슴살 300g : 4,550원\r\n* 브로콜리(2입/봉) : 2,780원\r\n* 파프리카(3입/봉) : 5,460원\r\n* 국산 볶음땅콩 150g : 4,820원\r\n* 적양배추 1/2 : 10,800원\r\n* 양상추 : 1,280원\r\n\r\n#닭가슴살 안 사려고 했는데 결국 사버렸네용... ㅠㅠ\r\n자나 깨나 #충동구매 조심~! (≧▽≦)',
  scope: '가계부 타임라인',
  user: {
    userId: 0, // BigInt
    profileImgPath: 'https://source.boringavatars.com/beam/150/금실맘',
    nickname: '금실맘',
  },
  imgPath: [
    'https://images.unsplash.com/photo-1688574398156-92556aa3cf52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    'https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1688840170202-6e8fe4cf8ec9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
  ],
};

const TimelineArticleDummyB: FaRecData = {
  financialRecordId: 0, // 지출/수입이 속한 가계부 ID
  financialRecordArticleId: 0,
  category: '',
  faDate: '2023-12-23T12:34:56.789Z',
  price: 2_761_000, // 수입
  title: '',
  content: `오늘은 월급날, 후훗. from 아무도 안 보는 혼자만의 공☆간`,
  scope: '가계부 타임라인',
  user: {
    userId: 1, // BigInt
    profileImgPath: 'https://source.boringavatars.com/beam/150/waypil',
    nickname: 'Waypil',
  },
  imgPath: [],
};

const feedArticleDummyA: FeedArticleResType = {
  feedArticleId: 1,
  feedType: '절약팁',
  user: {
    userId: 2, // BigInt
    profileImgPath: 'https://source.boringavatars.com/beam/150/갈라파고스바다거북',
    nickname: '갈라파고스바다거북',
  },
  content:
    '절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁! 절약 팁!',
  imgPath: [
    'https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1688574398156-92556aa3cf52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
  ],
  createdAt: '2023-12-23T12:34:56.789Z',
  modifiedAt: '2023-12-23T12:34:56.789Z',
};

const feedArticleDummyB: FeedArticleResType = {
  feedArticleId: 2,
  feedType: '허락해줘',
  user: {
    userId: 3, // BigInt
    profileImgPath: 'https://source.boringavatars.com/beam/150/코드네임.식탁보',
    nickname: '코드네임.식탁보',
  },
  content:
    '허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘! 허락해줘!',
  imgPath: [
    'https://images.unsplash.com/photo-1688840170202-6e8fe4cf8ec9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
  ],
  createdAt: '2023-12-23T12:34:56.789Z',
  modifiedAt: '2023-12-23T12:34:56.789Z',
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

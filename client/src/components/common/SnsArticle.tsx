import React from 'react'; // useState 사용
import tw from 'twin.macro';
import styled from '@emotion/styled';

import CommonStyles from '../../styles/CommonStyles';

import ArticleHeader from './snsarticle/ArticleHeader';
import VoteForm from './snsarticle/VoteForm';
import Comments from './snsarticle/Comments';

/* type은 추후 다른 파일로 분리하고 Import할 예정 */
type PropsFeed = {
  type: 'feed';
  data: {
    feedArticleId: number;
    feedType: number; // 사용
    content: string; // 사용
    createdAt: Date; // 사용
    modifiedAt: Date;
    imageId: number;
    userId: number;
    voteId: number;
    feedArticleHashtagId: number;
  };
};
type PropsTimeline = {
  type: 'timeline';
  data: {
    financialRecordId: number;
    category: string; // 사용
    financialRecordDate: Date; // 사용
    price: number; // 사용
    content: string; // 사용★
    scope: number; // 사용
    imageId: number;
    userId: number;
    voteId: number;
    financialRecordArticleHashTagId: number;
  };
};

export default function SnsArticle({ data }: PropsFeed) {
  const labelText = data.feedType === 1 ? '절약 팁' : '허락해줘!';
  const Label =
    data.feedType === 1
      ? tw(S.LabelTemplate)`text-point-blue border-point-blue`
      : tw(S.LabelTemplate)`text-point-yellow border-point-yellow`;

  return (
    <S.SnsArticleContainer>
      <Label>{labelText}</Label>
      <S.Box>
        <ArticleHeader profileImg='' createdAt={data.createdAt}>
          Waypil
        </ArticleHeader>
        <S.ImgContainer />
        <S.ArtileMain>
          <p>{data.content}</p>
          <VoteForm savingRate={256} flexRate={48} />
          <S.UDForm>
            {/* CRUD의 U, D */}
            <button>수정</button>
            <button>삭제</button>
          </S.UDForm>
          <Comments />
        </S.ArtileMain>
      </S.Box>
    </S.SnsArticleContainer>
  );
}

const S = {
  ...CommonStyles,
  SnsArticleContainer: styled.article`
    width: 713px;
    filter: drop-shadow(0px 3px 3px var(--color-gray07)); // 그림자
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
  LabelTemplate: styled.section`
    width: 116px;
    height: 37px;
    background-color: white;
    font-weight: bold;

    border-radius: 5px 5px 0px 0px;
    border-top-width: 3px;

    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Box: styled.section`
    width: 100%;
    background-color: white;

    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  `,
  ImgContainer: styled.section`
    width: 100%;
    height: 328px;
    background-color: #ec4899;
  `,
  ArtileMain: styled.section`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
  /* ↓ ArtileMain 내부 컴포넌트 ↓ */
  UDForm: styled.section`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  `,
};

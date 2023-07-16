import React from 'react'; // useState 사용
import styled from '@emotion/styled';

import CommonStyles from '../styles/CommonStyles';

import ArticleHeader from './sns-article/ArticleHeader';
import ImgsCarousel from '../components/ImgsCarousel';
import VoteForm from './sns-article/VoteForm';
import Comments from './sns-article/Comments';
import { FaRecData } from '../types/financialRecord';

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
    imgId: string[];
  };
};
type PropsTimeline = {
  type: 'timeline';
  data: FaRecData;
};

export default function SnsArticle({ type, data }: PropsFeed | PropsTimeline) {
  let labelText, Label;
  if (type === 'feed') {
    [labelText, Label] =
      data.feedType === 1
        ? [
            '절약 팁',
            styled(S.LabelTemplate)`
              color: var(--color-point-blue);
              border-color: var(--color-point-blue);
            `,
          ]
        : [
            '허락해줘!',
            styled(S.LabelTemplate)`
              color: var(--color-point-yellow);
              border-color: var(--color-point-yellow);
            `,
          ];
  } else {
    [labelText, Label] =
      data.price <= 0
        ? [
            '지출',
            styled(S.LabelTemplate)`
              color: var(--color-point-red);
              border-color: var(--color-point-red);
            `,
          ]
        : [
            '수입',
            styled(S.LabelTemplate)`
              color: var(--color-point-blue);
              border-color: var(--color-point-blue);
            `,
          ];
  }

  return (
    <S.SnsArticleContainer>
      <Label>{labelText}</Label>
      <S.Box>
        {type === 'feed' ? (
          <ArticleHeader type={type} createdAt={data.createdAt}>
            Waypil
          </ArticleHeader>
        ) : (
          <ArticleHeader type={type} faDate={data.faDate} category={data.category} price={data.price}>
            Waypil
          </ArticleHeader>
        )}
        {data.imgId.length >= 1 ? <ImgsCarousel imgId={data.imgId} width={'var(--article-w)'} /> : <></>}
        <S.ArtileMain>
          {type !== 'feed' && data.title !== '' ? <S.TitleText>{data.title}</S.TitleText> : <></>}
          <S.ContextText>{data.content}</S.ContextText>
          {type !== 'feed' || <VoteForm savingRate={256} flexRate={48} />}
          <S.UDForm>
            {/* CRUD의 U, D */}
            <S.UDBtn>수정</S.UDBtn>
            <S.UDBtn>삭제</S.UDBtn>
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
    width: var(--article-w);
    filter: drop-shadow(0px 3px 3px var(--color-gray07)); // 그림자
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
  LabelTemplate: styled.div`
    width: 116px;
    height: 37px;
    background-color: white;
    font-weight: bold;

    border-radius: 5px 5px 0px 0px;
    border-top: solid 3px;

    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Box: styled.div`
    width: 100%;
    background-color: white;

    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  `,
  ArtileMain: styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
  TitleText: styled.h3`
    line-height: 125%;
  `,
  ContextText: styled.p`
    line-height: 125%;
  `,
  /* ↓ ArtileMain 내부 컴포넌트 ↓ */
  UDForm: styled.div`
    width: 100%;
    padding-right: 0.7rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
  `,
  UDBtn: styled.button`
    font-size: 0.9rem;
    color: var(--color-text-lightgray);
  `,
};

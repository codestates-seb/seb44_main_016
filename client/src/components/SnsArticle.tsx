import React from 'react'; // useState 사용
import styled from '@emotion/styled';

import CommonStyles from '../styles/CommonStyles';

import ArticleHeader from './sns-article/ArticleHeader';
import VoteForm from './sns-article/VoteForm';
import Comments from './sns-article/Comments';

import useRangeNumber from '../hooks/useRangeNumber';

import svgs from '../constants/svg';

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
    imgSrcs: string[];
  };
};
type PropsTimeline = {
  type: 'timeline';
  data: {
    financialRecordId: number;
    category: string; // 사용
    financialRecordDate: Date; // 사용
    price: number; // 사용
    title: string; // 사용
    content: string; // 사용★
    scope: number; // 사용
    imageId: number;
    userId: number;
    voteId: number;
    financialRecordArticleHashTagId: number;
    imgSrcs: string[];
  };
};

export default function SnsArticle({ type, data }: PropsFeed | PropsTimeline) {
  const [isStart, isEnd, currentNum, setCurrentNum] = useRangeNumber(
    0,
    data.imgSrcs.length - 1
  ); // 이미지 인덱스에 사용

  let date, labelText, Label;
  if (type === 'feed') {
    date = data.createdAt;
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
    date = data.financialRecordDate;
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
          <ArticleHeader type={type} createdAt={date}>
            Waypil
          </ArticleHeader>
        ) : (
          <ArticleHeader
            type={type}
            createdAt={date}
            category={data.category}
            price={data.price}
          >
            Waypil
          </ArticleHeader>
        )}
        {data.imgSrcs.length >= 1 ? (
          <S.ImgContainer>
            <S.RankIndicator>
              <S.RankText>1위</S.RankText>
            </S.RankIndicator>
            <S.ImgsCarousel currentImgIndex={currentNum}>
              {data.imgSrcs.map((imgSrc, i) => {
                return (
                  <S.ImgBox>
                    <S.Img src={imgSrc} alt={`사용자가 올린 ${i}번째 사진`} />
                  </S.ImgBox>
                );
              })}
            </S.ImgsCarousel>
            {!isStart && (
              <S.ImgSlideBtn
                position={'left'}
                onClick={() => setCurrentNum(currentNum - 1)}
              >
                {svgs.slideLeft}
              </S.ImgSlideBtn>
            )}
            {!isEnd && (
              <S.ImgSlideBtn
                position={'right'}
                onClick={() => setCurrentNum(currentNum + 1)}
              >
                {svgs.slideRight}
              </S.ImgSlideBtn>
            )}
          </S.ImgContainer>
        ) : (
          <></>
        )}
        <S.ArtileMain>
          {type !== 'feed' && data.title !== '' ? (
            <S.TitleText>{data.title}</S.TitleText>
          ) : (
            <></>
          )}
          <S.ContextText>{data.content}</S.ContextText>
          {type === 'feed' || <VoteForm savingRate={256} flexRate={48} />}
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
  ImgContainer: styled.div`
    position: relative;
    width: 100%;
    height: 30rem;
    overflow: hidden;
    background-color: #ec4899;
  `,
  ImgsCarousel: styled.ol<{ currentImgIndex: number }>`
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    transform: translateX(
      calc(var(--article-w) * ${(props) => props.currentImgIndex * -1})
    );
    transition: all 0.5s;
  `,
  ImgBox: styled.li`
    width: var(--article-w);
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  ImgSlideBtn: styled.button<{ position: 'left' | 'right' }>`
    position: absolute;
    top: 50%;
    left: ${(props) => (props.position === 'left' ? '5%' : '95%')};
    transform: translate(-50%, -50%);
    z-index: 997;
  `,
  RankIndicator: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      transparent 50%,
      rgba(0, 0, 0, 0.5) 100%
    );
    display: flex;
    justify-content: end;
    align-items: end;
    padding-right: 3rem;
    padding-bottom: 2rem;
    z-index: 996;
  `,
  RankText: styled.h2`
    font-size: 3rem;
    color: white;
    border-bottom: 0.3rem solid white;
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
    color: var(--color-gray04);
  `,
};

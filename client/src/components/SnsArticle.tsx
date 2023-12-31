import React from 'react'; // useState 사용
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import CommonStyles from '../styles/CommonStyles';

import ArticleHeader from './sns-article/ArticleHeader';
import ImgsCarousel from '../components/ImgsCarousel';
import VoteForm from './sns-article/VoteForm';
// import Comments from './sns-article/Comments';
import { FeedArticleResType, FaRecArticleResType, VoteType } from '../types/article';
import { useWindowType, useWindowSize } from '../hooks/useWindowSize';
import { ScreenEnum } from '../constants/enums';
import useUserGlobalValue from './redux/getUserInfo';
import { APISns } from '../services/apiSns';
import { APIfinancialRecord } from '../services/apiFinancial';

/* type은 추후 다른 파일로 분리하고 Import할 예정 */
type PropsFeed = {
  type: 'feed';
  data: FeedArticleResType;
};
type PropsTimeline = {
  type: 'timeline';
  data: FaRecArticleResType;
};

export default function SnsArticle({ type, data }: PropsFeed | PropsTimeline) {
  const { userId } = useUserGlobalValue();
  const router = useRouter();

  const windowType = useWindowType();
  const [width, height] = useWindowSize();
  const isNarrowScreen = width <= 400;

  let labelText, Label;
  if (type === 'feed') {
    [labelText, Label] =
      data.feedType === '절약팁'
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

  const handleEditArticle = async () => {
    if (userId === null) {
      alert('로그인이 필요합니다.');
      router.push('/user/login');
    } else if (data.user.userId === userId) {
      alert('준비 중입니다!');
    } else {
      alert('권한이 없습니다.');
    }
  };

  const handleDeleteArticle = async () => {
    if (userId === null) {
      alert('로그인이 필요합니다.');
      router.push('/user/login');
    } else if (data.user.userId === userId) {
      if (confirm('삭제한 게시글은 다시 복구할 수 없습니다. 정말로 삭제하시겠습니까?')) {
        // 예 (삭제하겠습니다)
        try {
          if (type === 'feed') {
            APISns.deleteFeedArticle(data.feedArticleId);
          } else {
            APIfinancialRecord.deleteRecordArticle(data.financialRecordId, data.financialRecordArticleId);
          }
        } catch (error) {}
      }
    } else {
      alert('권한이 없습니다.');
    }
  };

  return (
    <S.SnsArticleContainer>
      <Label>{labelText}</Label>
      <S.Box>
        {type === 'feed' ? (
          // 피드 게시글 헤더
          <ArticleHeader
            windowType={windowType}
            type={type}
            createdAt={data.createdAt}
            profileImg={data.user.profileImgPath}
          >
            {data.user.nickname}
          </ArticleHeader>
        ) : (
          // 타임라인 게시글 헤더
          <ArticleHeader
            windowType={windowType}
            isNarrowScreen={isNarrowScreen}
            type={type}
            faDate={data.faDate}
            category={data.category}
            price={data.price}
            profileImg={data.user.profileImgPath}
          >
            {data.user.nickname}
          </ArticleHeader>
        )}
        {data.imgPath.length >= 1 ? (
          <ImgsCarousel imgPath={data.imgPath} width={'var(--article-w)'} />
        ) : (
          <></>
        )}
        <S.ArtileMain windowType={windowType}>
          {type !== 'feed' && data.title !== '' ? <S.TitleText>{data.title}</S.TitleText> : <></>}
          <S.ContextText>{data.content}</S.ContextText>
          {type !== 'feed' || <VoteForm feedArticleId={data.feedArticleId} />}
          <S.UDForm>
            {data.user.userId === userId ? (
              <>
                <S.UDBtn onClick={handleEditArticle}>수정</S.UDBtn>
                <S.UDBtn onClick={handleDeleteArticle}>삭제</S.UDBtn>
              </>
            ) : (
              <></>
            )}
          </S.UDForm>

          {/* <Comments /> 후순위 기능*/}
        </S.ArtileMain>
      </S.Box>
    </S.SnsArticleContainer>
  );
}

const S = {
  ...CommonStyles,
  SnsArticleContainer: styled.article`
    width: 100%;
    padding: 0 7%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
  LabelTemplate: styled.div`
    width: 7.25rem;
    height: 2.4rem;
    background-color: white;
    font-weight: bold;

    border-radius: 5px 5px 0px 0px;
    border-top: solid 3px;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 997;
  `,
  Box: styled.div`
    width: 100%;
    background-color: white;
    box-shadow: var(--shadow-default);

    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  `,
  ArtileMain: styled.div<{ windowType: ScreenEnum }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: ${(props) => (props.windowType === ScreenEnum.MOBILE ? '1rem' : '1.25rem')};
    gap: ${(props) => (props.windowType === ScreenEnum.MOBILE ? '1rem' : '1.25rem')};
  `,
  TitleText: styled.h3`
    line-height: 125%;
  `,
  ContextText: styled.p`
    line-height: 125%;
    white-space: pre-wrap; // 줄바꿈 & text-wrap 적용
    overflow-wrap: break-word;
  `,
  /* ↓ ArtileMain 내부 컴포넌트 ↓ */
  UDForm: styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
  `,
  UDBtn: styled.button`
    font-size: 0.9rem;
    color: var(--color-text-lightgray);
  `,
};

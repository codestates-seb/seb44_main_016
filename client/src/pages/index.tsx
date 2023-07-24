import React from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import SnsArticle from '../components/SnsArticle';
import {
  TimelineArticleDummyA,
  TimelineArticleDummyB,
  feedArticleDummyA,
  feedArticleDummyB,
} from '../constants/articleDummyData';
import { FeedArticleResType } from '../types/article';

const PAGE_SIZE = 10; // 한 번에 가져올 아이템 개수

async function getFeedArticles(page: number, size: number) {
  const paramsStr = new URLSearchParams(window.location.search).toString();
  const newQueries = paramsStr === '' ? `page=${page}&size=${size}` : paramsStr;

  const res = await axios.get(`https://www.zerohip.co.kr/feedArticles?${newQueries}`);
  const { data, pageInfo } = res.data;
  return { data, pageInfo };
}

export default function HomePage() {
  const fetchFeedArticles = ({ pageParam = 1 }) => getFeedArticles(pageParam, PAGE_SIZE);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['feedArticles'],
    fetchFeedArticles,
    {
      getNextPageParam: (lastPage, allPages) => {
        // 현재 페이지 번호가 마지막 페이지 번호보다 작으면 다음 페이지 호출
        if (lastPage.pageInfo.currentPage < lastPage.pageInfo.totalPages) {
          return lastPage.pageInfo.currentPage + 1;
        }
        return undefined; // 더 이상 페이지가 없으면 undefined 반환하여 더 이상 호출하지 않음
      },
    }
  );

  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleScroll() {
      if (
        scrollContainerRef.current &&
        scrollContainerRef.current.scrollHeight - scrollContainerRef.current.scrollTop ===
          scrollContainerRef.current.clientHeight
      ) {
        // 스크롤이 맨 밑에 도달하면 다음 페이지 호출
        fetchNextPage();
      }
    }

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [fetchNextPage]);

  return (
    <S.HomePageContainer>
      <SnsArticle type='timeline' data={TimelineArticleDummyA} />
      <SnsArticle type='timeline' data={TimelineArticleDummyB} />
      <SnsArticle type='feed' data={feedArticleDummyA} />
      <SnsArticle type='feed' data={feedArticleDummyB} />

      {/* 데이터를 출력하는 로직 */}
      {data?.pages.map((page) => {
        return page.data.map((item: FeedArticleResType) => (
          <SnsArticle key={item.feedArticleId} data={item} type='feed' />
        ));
      })}

      {/* 무한 스크롤 로딩 중이면 로딩 메시지 출력 */}
      {/* isFetchingNextPage && <div>Loading...</div> */}

      {/* 더 이상 데이터가 없으면 끝 메시지 출력 */}
      {/* !hasNextPage && <div>No more data.</div> */}
    </S.HomePageContainer>
  );
}

const S = {
  HomePageContainer: styled.div`
    width: 100%;
    padding: 2rem 0rem;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
};

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import Tab from '../../../../components/Tab';
import FaRecHeader from './FaRecHeader';
import FaRecArticle from './FaRecArticle';
import { APIfinancialRecord } from '../../../../services/apiFinancial';
import { FaRecData } from '../../../../types/financialRecord';
import SnsArticle from '../../../../components/SnsArticle';

export default function FinancialPage() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const financialRecordId = router.query.slug ? Number(router.query.slug) : 0;
  const [activeTab, setActiveTab] = useState<string>('가계부');
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const tabs = ['가계부', '타임라인'];
  const size = 4;

  const { data, status, fetchNextPage, error, hasNextPage } = useInfiniteQuery(
    ['faRecTimeline'],
    ({ pageParam = 1 }) => APIfinancialRecord.getRecordArticle(financialRecordId, pageParam, size),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.pageData.page + 1;
        return nextPage > lastPage.pageData.totalPages ? undefined : nextPage;
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('fetching next page');
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <S.Container>
      <FaRecHeader setActiveTab={setActiveTab} />
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === '가계부' && data ? (
        <div id='article'>
          {data.pages.flatMap((pageData) =>
            pageData.data.map((el: FaRecData) => {
              console.log(el); // 이 부분이 el의 값을 콘솔에 출력하는 부분입니다.
              return <FaRecArticle key={el.financialRecordArticleId} data={el} />;
            })
          )}
        </div>
      ) : (
        <div id='timeline'>
          {/* {' '}
          {data.pages.flatMap((pageData) =>
            pageData.data.map((el: FaRecData) => {
              console.log(el); // 이 부분이 el의 값을 콘솔에 출력하는 부분입니다.
              return <SnsArticle key={el.financialRecordArticleId} data={el} />;
            })
          )} */}
        </div>
      )}

      <S.AddWrap ref={ref}>
        <S.AddBtn onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          {!hasNextPage ? '마지막 페이지입니다.' : '더 보기'}
        </S.AddBtn>
      </S.AddWrap>
    </S.Container>
  );
}
const S = {
  Container: styled.div`
    padding: 1.875rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  `,
  DateHeader: styled.div`
    font-size: var(--text-default);
    margin: 2rem 0 1.25rem;
    font-weight: 700;
  `,
  AddWrap: styled.div`
    display: flex;
    justify-content: center;
  `,
  AddBtn: styled.button`
    text-align: center;
    color: var(--color-primary);
  `,
};

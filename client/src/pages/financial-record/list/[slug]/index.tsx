import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import Tab from '../../../../components/Tab';
import FaRecHeader from './FaRecHeader';
import FaRecArticle from './FaRecArticle';
import { APIfinancialRecord } from '../../../../services/apiFinancial';

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
      getNextPageParam: (lastPage, pages) => {
        const nextPage = lastPage.pageData.page + 1;
        console.log('Next Page:', nextPage);
        return nextPage > lastPage.pageData.totalPage ? undefined : nextPage;
      },
    }
  );
  console.log(data);

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('fetching next page');
      fetchNextPage();
    }
  }, [inView, hasNextPage]);
  console.log({ data, status, error, hasNextPage });
  let lastDate: string | null = null;

  return (
    <S.Container>
      <FaRecHeader setActiveTab={setActiveTab} />
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      {/* map 함수로 변경 예정 */}

      {activeTab === '가계부' && data ? (
        <div id='article'>
          {data.pages.map((pageData, i) => {
            return pageData.data.map((el, i) => {
              const date = new Date(el.faDate);
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const dateString = `${date.getFullYear()}. ${month}. ${date.getDate()}`;
              let dateHeader = null;

              if (lastDate !== dateString) {
                dateHeader = <S.DateHeader>{dateString}</S.DateHeader>;
                lastDate = dateString;
              }

              return (
                <>
                  {dateHeader}
                  <FaRecArticle data={el} date={dateString} />
                </>
              );
            });
          })}
        </div>
      ) : (
        <div id='timeline'>타임라인</div>
      )}

      <div ref={ref}>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          버튼
        </button>
      </div>
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
    margin: 0.625rem 0 1.25rem;
    font-weight: 700;
  `,
};

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import Tab from '../../../../components/Tab';
import FaRecHeader from './FaRecHeader';
import FaRecArticle from './FaRecArticle';
import { APIfinancialRecord } from '../../../../services/apiFinancial';
import { convertToKoreanMonthDay } from '../../../../utils/convertToKoreanDate';

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
  console.log(data);

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('fetching next page');
      fetchNextPage();
    }
  }, [inView, hasNextPage]);
  console.log({ data, status, error, hasNextPage });
  const lastDate: string | null = null;

  return (
    <S.Container>
      <FaRecHeader setActiveTab={setActiveTab} />
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      {/* map 함수로 변경 예정 */}

      {activeTab === '가계부' && data ? (
        <div id='article'>
          {data.pages.map((pageData) => {
            return pageData.data.map((el) => {
              // const dateHeader = null;

              // if (lastDate !== date) {
              //   dateHeader = <S.DateHeader>{dateMD}</S.DateHeader>;
              //   lastDate = dateMD;
              // }

              return (
                <>
                  {/* {dateHeader} */}
                  <FaRecArticle data={el} />
                </>
              );
            });
          })}
        </div>
      ) : (
        <div id='timeline'>타임라인</div>
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

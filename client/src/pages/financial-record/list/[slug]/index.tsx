import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import Tab from '../../../../components/Tab';
import FaRecHeader from './FaRecHeader';
import FaRecArticle from './FaRecArticle';
import { APIfinancialRecord } from '../../../../services/apiFinancial';
import { FaRecData } from '../../../../types/article';
import SnsArticle from '../../../../components/SnsArticle';
import Loading from '../../../../components/Loading';
import Pagination from '../../../../components/Pagination';
import CommonStyles from '../../../../styles/CommonStyles';
import { toast } from 'react-toastify';
import ErrorComponent from '../../../../components/ErrorComponent';

export default function FinancialPage() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const financialRecordId = router.query.slug ? Number(router.query.slug) : 0;
  const [activeTab, setActiveTab] = useState<string>('가계부');
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const tabs = ['가계부', '타임라인'];
  const [page, setPage] = useState(1);
  const size = 2;
  console.log(financialRecordId);
  // 데이터 요청
  const {
    data: faRecData,
    error: faRecError,
    isError: isFaRecError,
    isSuccess: isFaRecSuccess,
    isLoading: isFaRecLoading,
  } = useQuery(['faRecHeader'], () => APIfinancialRecord.getFaRec(financialRecordId), {
    staleTime: 1000 * 60 * 30,
    enabled: !!financialRecordId,
  });
  const {
    data: articleData,
    error: articleError,
    isError: isArticleError,
    isLoading: isArticleLoading,
  } = useQuery(
    ['faRecArticles', page],
    () => APIfinancialRecord.getRecordArticle(financialRecordId, page, size),
    { keepPreviousData: true, staleTime: 1000 * 60 * 10, enabled: !!financialRecordId }
  );
  const {
    data: timelineData,
    error: timelineError,
    isError: isTimelineError,
    isLoading: IsTimelineLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['faRecTimeline'],
    ({ pageParam = 1 }) => APIfinancialRecord.getRecordArticle(financialRecordId, pageParam, size),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.pageData?.page + 1;
        return nextPage > lastPage.pageData?.totalPages ? undefined : nextPage;
      },
      staleTime: 1000 * 60 * 10,
      enabled: !!financialRecordId,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  // if (isFaRecError || isArticleError || isTimelineError) {
  //   const errorMessage =
  //     (faRecError as Error)?.message || (articleError as Error)?.message || (timelineError as Error)?.message;
  //   toast.error(`${errorMessage} 에러가 발생하였습니다.`);
  //   toast.info('잠시 후에 다시 시도해주세요.');
  //   return <ErrorComponent message={errorMessage} />;
  // }

  if (isFaRecLoading || isArticleLoading || IsTimelineLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <FaRecHeader
        setActiveTab={setActiveTab}
        isLoading={isFaRecLoading}
        isSuccess={isFaRecSuccess}
        isError={isFaRecError}
        data={faRecData}
      />
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === '가계부' ? (
        <S.ContentWrap id='article'>
          {isArticleError ? (
            <ErrorComponent message={faRecError} />
          ) : articleData?.data?.length > 0 ? (
            articleData.data.map((el: FaRecData) => {
              return (
                <FaRecArticle
                  key={el.financialRecordArticleId}
                  category={el.category}
                  faDate={new Date(el.faDate)}
                  title={el.title}
                  price={el.price}
                  content={el.content}
                  imgPath={el.imgPath}
                />
              );
            })
          ) : (
            <S.ErrorText>가계부가 비어있습니다.</S.ErrorText>
          )}
          {!isArticleError && articleData?.data?.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={articleData?.pageData.totalPages || 1}
              handlePageChange={setPage}
            />
          )}
        </S.ContentWrap>
      ) : (
        <>
          <S.ContentWrap id='timeline'>
            {timelineData?.pages.flatMap((pageData) => {
              const filteredData = pageData.data?.filter((el: FaRecData) => el.scope === '가계부 타임라인');

              return filteredData?.length > 0 ? (
                filteredData?.map((filteredEl: FaRecData) => (
                  <SnsArticle key={filteredEl.financialRecordArticleId} data={filteredEl} type='timeline' />
                ))
              ) : (
                <S.ErrorText>타임라인이 비어있습니다.</S.ErrorText>
              );
            })}
          </S.ContentWrap>
          <S.AddWrap ref={ref}>
            <S.AddBtn onClick={() => fetchNextPage()} disabled={!hasNextPage}>
              {!hasNextPage ? '마지막 페이지입니다.' : '더 보기'}
            </S.AddBtn>
          </S.AddWrap>
        </>
      )}
    </S.Container>
  );
}
const S = {
  ...CommonStyles,
  Container: styled.div`
    padding: 1.875rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  `,
  ContentWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &#timeline {
      gap: 1.875rem;
    }
  `,
  DateHeader: styled.div`
    font-size: var(--text-default);
    margin: 2rem 0 1.25rem;
    font-weight: 700;
  `,
  AddWrap: styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  `,
  AddBtn: styled.button`
    text-align: center;
    color: var(--color-primary);
  `,
  ErrorWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import Tab from '../../../../components/Tab';
import FaRecHeader from './FaRecHeader';
import FaRecArticle from './FaRecArticle';
import { APIfinancialRecord } from '../../../../services/apiFinancial';
import { FaRecArticleResType } from '../../../../types/article';
import SnsArticle from '../../../../components/SnsArticle';
import Loading from '../../../../components/Loading';
import Pagination from '../../../../components/Pagination';
import CommonStyles from '../../../../styles/CommonStyles';
import ErrorComponent from '../../../../components/ErrorComponent';
import { FAREC_MESSAGES } from '../../../../constants/messages/faRec';
import withAuth from '../../../../components/WithAuth';
import HeadMeta from '../../../../components/HeadMeta';
import { FAREC_META_DATA } from '../../../../constants/seo/faRecMetaData';

function FinancialPage() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const financialRecordId = router.query.slug ? Number(router.query.slug) : 0;
  const [activeTab, setActiveTab] = useState<string>('가계부');
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const tabs = ['가계부', '타임라인'];
  const [page, setPage] = useState(1);
  const size = 10;
  console.log(financialRecordId);
  // 데이터 요청
  const {
    data: faRecData,
    error: faRecError,
    isError: isFaRecError,
    isLoading: isFaRecLoading,
  } = useQuery(['faRecHeader'], () => APIfinancialRecord.getFaRec(financialRecordId), {
    staleTime: 1000 * 60 * 30,
    enabled: !!financialRecordId,
  });
  const {
    data: articleData,
    isError: isArticleError,
    isLoading: isArticleLoading,
  } = useQuery(
    ['faRecArticles', page],
    () => APIfinancialRecord.getRecordArticle(financialRecordId, page, size),
    { keepPreviousData: true, staleTime: 1000 * 60 * 10, enabled: !!financialRecordId }
  );
  const {
    data: timelineData,
    isLoading: IsTimelineLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['faRecTimeline'],
    ({ pageParam = 1 }) => APIfinancialRecord.getRecordArticle(financialRecordId, pageParam, size),
    {
      getNextPageParam: (lastPage) => {
        const currentPage = Number(lastPage.pageInfo?.page);
        const totalPages = Number(lastPage.pageInfo?.totalPages);
        if (isNaN(currentPage) || isNaN(totalPages)) {
          return undefined;
        }
        const nextPage = lastPage.pageInfo?.page + 1;
        return nextPage > lastPage.pageInfo?.totalPages ? undefined : nextPage;
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

  if (isFaRecLoading || isArticleLoading || IsTimelineLoading) {
    return <Loading />;
  }

  const filteredData = timelineData?.pages.flatMap(
    (pageData) => pageData.data?.filter((el: FaRecArticleResType) => el.scope === '가계부 타임라인') || []
  );
  return (
    <S.Container>
      <HeadMeta
        title={FAREC_META_DATA.FINANCIAL_RECORD_PAGE.TITLE}
        description={FAREC_META_DATA.FINANCIAL_RECORD_PAGE.DESCRIPTION}
      />
      <FaRecHeader
        setActiveTab={setActiveTab}
        isLoading={isFaRecLoading}
        isError={isFaRecError}
        error={(faRecError as Error)?.message}
        data={faRecData}
      />
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === '가계부' ? (
        <S.ContentWrap id='article'>
          {isArticleError ? (
            <ErrorComponent message={(faRecError as Error).message} />
          ) : articleData?.data?.length > 0 ? (
            articleData.data.map((el: FaRecArticleResType) => {
              return (
                <FaRecArticle
                  key={el.financialRecordArticleId}
                  category={el.category}
                  faDate={new Date(el.faDate)}
                  title={el.title}
                  price={el.price}
                  content={el.content}
                  imgPath={el.imgPath}
                  faRecId={el.financialRecordId}
                  articleId={el.financialRecordArticleId}
                />
              );
            })
          ) : (
            <S.ErrorText>{FAREC_MESSAGES.FAREC_EMPTY}</S.ErrorText>
          )}
          {!isArticleError && articleData?.data?.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={articleData?.pageInfo.totalPages || 1}
              handlePageChange={setPage}
            />
          )}
        </S.ContentWrap>
      ) : (
        <>
          <S.ContentWrap id='timeline'>
            {filteredData && filteredData?.length > 0 ? (
              filteredData?.map((filteredEl: FaRecArticleResType) => (
                <SnsArticle key={filteredEl.financialRecordArticleId} data={filteredEl} type='timeline' />
              ))
            ) : (
              <S.ErrorText key='empty'>{FAREC_MESSAGES.FAREC_TIMELINE_EMPTY}</S.ErrorText>
            )}
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

    @media screen and (max-width: 768px) {
      padding: 16px;
    }
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

export default withAuth(FinancialPage);

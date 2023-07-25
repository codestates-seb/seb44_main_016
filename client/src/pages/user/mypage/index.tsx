import styled from '@emotion/styled';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useInView } from 'react-intersection-observer';
import CommonStyles from '../../../styles/CommonStyles';
import SnsArticle from '../../../components/SnsArticle';
import withAuth from '../../../components/WithAuth';
import apiUser from '../../../services/apiUser';
import Loading from '../../../components/Loading';
import { FeedArticleResType } from '../../../types/article';
import HeadMeta from '../../../components/HeadMeta';
import { USER_META_DATA } from '../../../constants/seo/userMetaData';
import ErrorComponent from '../../../components/ErrorComponent';
import { useEffect } from 'react';
import MyPageUserInfo from './MyPageUserInfo';
import useUserGlobalValue from '../../../components/redux/getUserInfo';

function MyPage() {
  const { ref, inView } = useInView();

  const {
    isLoading: isMyInfoLoading,
    error: isMyInfoError,
    data: myInfoData,
  } = useQuery(['myInfo'], apiUser.getMyInfo);

  const { userId } = useUserGlobalValue();

  const {
    data: myFeedData,
    error: isMyFeedError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['myFeedsList'],
    ({ pageParam = 1 }) => {
      if (userId) {
        return apiUser.getMyFeeds(userId, pageParam, 4);
      }
      return;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage) {
          const currentPage = Number(lastPage.pageData?.page);
          const totalPages = Number(lastPage.pageData?.totalPages);
          if (isNaN(currentPage) || isNaN(totalPages)) {
            return undefined;
          }
          const nextPage = lastPage.pageData?.page + 1;
          return nextPage > lastPage.pageData?.totalPages ? undefined : nextPage;
        }
      },
      staleTime: 1000 * 60 * 10,
      enabled: !!userId,
    }
  );

  const filteredData = myFeedData?.pages.flatMap((response) => (response ? response.data : null));
  console.log('피드 데이터');
  console.log(filteredData);
  if (isMyInfoError || isMyFeedError) {
    toast.info('잠시 후에 다시 시도해주세요.');
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <>
      <HeadMeta title={USER_META_DATA.MY_PAGE.TITLE} description={USER_META_DATA.MY_PAGE.DESCRIPTION} />
      {isMyInfoError ? (
        <ErrorComponent />
      ) : isMyInfoLoading ? (
        <Loading />
      ) : (
        myInfoData && (
          <S.Container>
            <MyPageUserInfo myInfoData={myInfoData} />
            <S.UserArticleContainer>
              <h2 className='blind'>내가 쓴 글</h2>
              {isMyFeedError ? (
                <ErrorComponent />
              ) : filteredData ? (
                filteredData.map((el: FeedArticleResType) => {
                  return <SnsArticle key={el.feedArticleId} type='feed' data={el} />;
                })
              ) : null}
              <S.AddWrap ref={ref}>
                <S.AddBtn onClick={() => fetchNextPage()} disabled={!hasNextPage}>
                  {!hasNextPage ? '피드가 없습니다.' : '계속해서 불러오기'}
                </S.AddBtn>
              </S.AddWrap>
            </S.UserArticleContainer>
          </S.Container>
        )
      )}
    </>
  );
}

const S = {
  ...CommonStyles,
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  UserArticleContainer: styled.section`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 3rem;
    width: 100%;
    @media screen and (max-width: 600px) {
      margin-bottom: 10.2rem;
    }
  `,
  ModalBackdrop: styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: grid;
    place-items: center;
  `,
  ModalView: styled.div`
    border-radius: 10px;
    background-color: #ffffff;
    width: 300px;
    height: 100px;
    > span.close-btn {
      margin-top: 5px;
      cursor: pointer;
    }
    > div.desc {
      margin-top: 25px;
      color: #4000c7;
    }
  `,
  AddWrap: styled.div`
    display: flex;
    justify-content: center;
    margin: 1.3rem 0 1rem 0;
  `,
  AddBtn: styled.button`
    text-align: center;
    color: var(--color-primary);
  `,
};

export default withAuth(MyPage);

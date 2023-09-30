import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import CommonStyles from '../../../../styles/CommonStyles';
import apiUser from '../../../../services/apiUser';
import Loading from '../../../../components/Loading';
import ErrorComponent from '../../../../components/ErrorComponent';
import UserPageInfo from '../../../../components/userpage/UserPageInfo';
import useUserGlobalValue from '../../../../components/redux/getUserInfo';
import { useCheckIsMyPageFirst } from '../../../../hooks/userpage';
import type { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

export default function UserPage({ userId: userIdParam }: { userId: string }) {
  const { isLoggedIn, loginId: globalLoginId } = useUserGlobalValue();

  useCheckIsMyPageFirst({ userIdParam, globalLoginId });

  const {
    isLoading: isUserPageLoading,
    error: isUserPageError,
    data: userPageData,
  } = apiUser.useGetUserPage(userIdParam);

  if (isUserPageError) return <ErrorComponent />;
  if (isUserPageLoading) return <Loading />;

  return (
    <>
      {userPageData?.data && globalLoginId && (
        <S.Container>
          <UserPageInfo
            infoData={userPageData.data}
            isMyPage={userIdParam === globalLoginId}
            isLoggedIn={isLoggedIn}
            userId={userIdParam}
            globalLoginId={globalLoginId}
          />
        </S.Container>
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

interface Params extends ParsedUrlQuery {
  userId?: string | string[];
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { userId }: Params = params || { userId: undefined };
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['userPage'], () => apiUser.getUserPage(userId));

  return {
    props: {
      userId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import CommonStyles from '../../../styles/CommonStyles';
import apiUser from '../../../services/apiUser';
import Loading from '../../../components/Loading';
import HeadMeta from '../../../components/HeadMeta';
import { USER_META_DATA } from '../../../constants/seo/userMetaData';
import ErrorComponent from '../../../components/ErrorComponent';
import UserPageInfo from '../../../components/userpage/UserPageInfo';
import useUserGlobalValue from '../../../components/redux/getUserInfo';
import UserFeed from '../../../components/userpage/UserFeed';

export default function MyPage() {
  const {
    isLoading: isMyInfoLoading,
    error: isMyInfoError,
    data: myInfoData,
  } = useQuery(['myInfo'], apiUser.getMyInfo);

  const { userId, isLoggedIn } = useUserGlobalValue();

  if (isMyInfoError) return <ErrorComponent />;
  if (isMyInfoLoading) return <Loading />;

  return (
    <>
      <HeadMeta title={USER_META_DATA.MY_PAGE.TITLE} description={USER_META_DATA.MY_PAGE.DESCRIPTION} />
      {myInfoData && (
        <S.Container>
          <UserPageInfo infoData={myInfoData} isMyPage={true} isLoggedIn={isLoggedIn} />
          <UserFeed userId={userId} />
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
};

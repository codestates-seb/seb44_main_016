import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import CommonStyles from '../../../styles/CommonStyles';
import SnsArticle from '../../../components/SnsArticle';
import FollowModal from './FollowModal';
import withAuth from '../../../components/WithAuth';
import apiUser from '../../../services/apiUser';
import Loading from '../../../components/Loading';
import { FeedArticleResType } from '../../../types/article';
import HeadMeta from '../../../components/HeadMeta';
import { USER_META_DATA } from '../../../constants/seo/userMetaData';

function MyPage() {
  const router = useRouter();
  const {
    isLoading: isMyInfoLoading,
    error: myInfoError,
    data: myInfoData,
  } = useQuery(['myInfo'], apiUser.getMyInfo);

  if (myInfoError) {
    toast.error('오류가 발생했습니다.');
    toast.info('잠시 후에 다시 시도해주세요.');
  }

  return (
    <>
      <HeadMeta title={USER_META_DATA.MY_PAGE.TITLE} description={USER_META_DATA.MY_PAGE.DESCRIPTION} />
      {isMyInfoLoading ? (
        <Loading />
      ) : (
        myInfoData && (
          <S.Container>
            <S.UserProfileContainer>
              <h1 className='blind'>마이페이지</h1>
              <S.UserProfileImgBox>
                <img src={myInfoData?.profileImgPath} alt='프로필 사진' />
              </S.UserProfileImgBox>
              <S.UserName>
                <S.Nickname>{myInfoData.nickname}</S.Nickname>
              </S.UserName>
              <S.UserSubInfoBox>
                <FollowModal title='구독함' followList={myInfoData.followingList} />
                <FollowModal title='구독됨' followList={myInfoData.followerList} />
                <S.UserInfoModifyBtn type='button' onClick={() => router.push('/user/update')}>
                  설정
                </S.UserInfoModifyBtn>
              </S.UserSubInfoBox>
            </S.UserProfileContainer>
            <S.UserArticleContainer>
              <h2 className='blind'>내가 쓴 글</h2>
              {myInfoData.myContents.map((el: FeedArticleResType) => {
                return <SnsArticle key={el.feedArticleId} type='feed' data={el} />;
              })}
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
  UserProfileContainer: styled.section`
    width: 90%;
    border-bottom: 1.5px solid var(--color-point-light-gray);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2.7rem 0 3.5rem 0;
  `,
  UserProfileImgBox: styled.div`
    transition: transform 0.3s ease-in-out;
    border-radius: 50%;
    overflow: hidden;
    &:hover {
      transform: scale(1.5) translateY(0.55rem);
    }
    > img {
      width: 100%;
      height: 100%;
    }
    @media screen and (max-width: 750px) {
      width: 120px;
      height: 120px;
    }
  `,
  UserName: styled.div`
    margin: 1rem 0;
  `,
  Nickname: styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    background-image: linear-gradient(to right, #0d0d0d, var(--color-primary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  `,
  UserSubInfoBox: styled.div`
    margin: 0 0 1.5rem 0;
    display: flex;
  `,
  UserInfoModifyBtn: styled.button`
    position: relative;
    display: inline-block;
    color: black;
    padding: 0.7rem 1rem;
    border-radius: 100px;
    overflow: hidden;
    background-color: white;
    z-index: 1;
    &:hover {
      color: var(--color-primary);
      background-color: white;
      transition-duration: 0.7s;
      font-weight: 600;
    }
    &::before {
      content: '';
      position: absolute;
      width: 20rem;
      height: 20rem;
      top: -4rem;
      left: -4rem;
      z-index: -1;
      border-radius: 100%;
      background: #dee2f1;
      transition: 0.7s;
    }
    &:hover::before {
      top: 2.5rem;
      left: 2.5rem;
    }
    font-size: 1.1rem;
    font-weight: 500;
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

export default withAuth(MyPage);

import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import CommonStyles from '../../../styles/CommonStyles';
import SnsArticle from '../../../components/SnsArticle';
import FollowModal from './FollowModal';
import withAuth from '../../../components/WithAuth';
import apiUser from '../../../services/apiUser';
import Loading from '../../../components/Loading';
import { FeedArticleResType } from '../../../types/article';
function MyPage() {
  const router = useRouter();
  const { isLoading, error, data, isSuccess } = useQuery(['myPageInfo'], apiUser.getUser);

  if (error) {
    toast.error('오류가 발생했습니다.');
    toast.info('잠시 후에 다시 시도해주세요.');
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        isSuccess &&
        data && (
          <S.Container>
            <S.UserProfileContainer>
              <Head>
                <title>제로힙 마이페이지</title>
              </Head>
              <h1 className='blind'>마이페이지</h1>
              <S.UserImg>
                <img src={data?.imgId} alt='프로필 사진' />
              </S.UserImg>
              <S.UserName>
                <S.Nickname>{data.nickname}</S.Nickname>
              </S.UserName>
              <S.ModifyBtnBox>
                <FollowModal title='구독함' list={data.followingList} />
                <FollowModal title='구독됨' list={data.followerList} />
                <S.ModifyBtn type='button' onClick={() => router.push('/user/update')}>
                  설정
                </S.ModifyBtn>
              </S.ModifyBtnBox>
            </S.UserProfileContainer>
            <S.UserArticleContainer>
              <h2 className='blind'>내가 쓴 글</h2>
              {data.myContents.map((el: FeedArticleResType) => {
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
  UserImg: styled.div`
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.5) translateY(0.55rem);
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
  ModifyBtnBox: styled.div`
    margin: 0 0 1.5rem 0;
    display: flex;
  `,
  ModifyBtn: styled.button`
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

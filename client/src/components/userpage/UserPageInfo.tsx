import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import CommonStyles from '../../styles/CommonStyles';
import FollowModal from './FollowModal';
import { UserPageInfoProps } from '../../types/user';
import { getFollowStatusUserPage } from '../../utils/userpage/getFollowStatus';
import { useFollowMutations } from '../../hooks/userpage/useFollowMutation';

export default function UserPageInfo({
  infoData,
  loginId,
  isMyPage,
  isFollowing,
  isFollowed,
  isLoggedIn,
  followingFollowId,
  followerFollowId,
}: UserPageInfoProps) {
  const router = useRouter();

  const handleMoveSettingPage = () => {
    router.push('/user/update');
  };

  const { cancelFollowingMutate, startFollowingMutate, deleteFollowingMutate } = useFollowMutations(
    infoData?.nickname
  );

  const handleFollowing = () => {
    if (isFollowing && followingFollowId) {
      cancelFollowingMutate(followingFollowId);
    } else if (loginId) {
      startFollowingMutate(loginId);
    }
  };

  const handleFollowed = () => {
    if (followerFollowId) deleteFollowingMutate(followerFollowId);
  };

  const followStatusBtnName = getFollowStatusUserPage({ isMyPage, isFollowing, isFollowed });

  return (
    <S.UserProfileContainer>
      <h1 className='blind'>{isMyPage ? '마이페이지' : '유저페이지'}</h1>
      <S.UserProfileImgBox>
        <img src={infoData?.profileImgPath} alt='프로필 사진' />
      </S.UserProfileImgBox>
      <S.UserName>
        <S.Nickname>{infoData?.nickname}</S.Nickname>
      </S.UserName>
      <S.UserSubInfoBox>
        <FollowModal title='구독함' followList={infoData?.followingList} isMyPage={isMyPage} />
        <FollowModal title='구독됨' followList={infoData?.followerList} isMyPage={isMyPage} />
        {isLoggedIn && (
          <S.UserInfoModifyBtn type='button' onClick={isMyPage ? handleMoveSettingPage : handleFollowing}>
            {followStatusBtnName}
          </S.UserInfoModifyBtn>
        )}
        {isLoggedIn && !isFollowing && isFollowed && (
          <S.UserInfoModifyBtn type='button' onClick={handleFollowed}>
            연결 끊기
          </S.UserInfoModifyBtn>
        )}
      </S.UserSubInfoBox>
    </S.UserProfileContainer>
  );
}

const S = {
  ...CommonStyles,
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
    justify-content: space-between;
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
    margin-left: 1rem;
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
};

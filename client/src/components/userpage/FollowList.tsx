import styled from '@emotion/styled';
import { FollowingUsersInfoData, FollowerUsersInfoData } from '../../types/user';
import { useRouter } from 'next/router';
import useUserGlobalValue from '../redux/getUserInfo';
import { getFollowStatusFollowList } from '../../utils/userpage/getFollowStatus';
import { useFollowMutations } from '../../hooks/userpage/useFollowMutation';

interface FollowListProps {
  title: string;
  userInfo: FollowingUsersInfoData | FollowerUsersInfoData;
  isMyPage: boolean;
}

export default function FollowList({ title, userInfo, isMyPage }: FollowListProps) {
  const router = useRouter();
  const { loginId } = useUserGlobalValue();
  const { cancelFollowingMutate, deleteFollowingMutate } = useFollowMutations(userInfo?.nickname);

  const { followerId, isFollowing } = userInfo as FollowerUsersInfoData;
  const { followingId, followId, isFollowed } = userInfo as FollowingUsersInfoData;

  const followStatusBtnName = getFollowStatusFollowList({ title, isFollowing, isFollowed });

  const handleMoveToUserPage = (myId: string | undefined | null, userId: string) => () => {
    if (myId === userId) {
      router.push(`/user/mypage`);
      return;
    }
    router.push(`/user/profile/${userId}`);
  };

  const handleFollow = (title: string) => () => {
    if (title === '구독함') {
      cancelFollowingMutate(followId);
      return;
    } else if (title === '구독됨') {
      deleteFollowingMutate(followId);
      return;
    }
  };

  return (
    <S.ModalFollowerBox>
      <S.UserInfo>
        <S.UserImgInfoBox>
          <S.UserImgBox>
            <S.UserImg src={userInfo?.profileImgPath} alt='유저 프로필 사진' />
          </S.UserImgBox>
          <S.UserNickNameIdBox>
            <S.UserNickname tabIndex={0} onClick={handleMoveToUserPage(loginId, followingId || followerId)}>
              <div>{userInfo?.nickname}</div>
            </S.UserNickname>
            <S.UserId>
              <div>@</div>
              <div>{userInfo?.followingId || followerId}</div>
            </S.UserId>
          </S.UserNickNameIdBox>
        </S.UserImgInfoBox>
        <S.IsUserFollowBox>
          {isMyPage && (
            <S.LetsFollowUserBtn type='button' onClick={handleFollow(title)}>
              {followStatusBtnName}
            </S.LetsFollowUserBtn>
          )}
        </S.IsUserFollowBox>
      </S.UserInfo>
    </S.ModalFollowerBox>
  );
}

const S = {
  ModalFollowerBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.53rem 0rem;
  `,
  UserInfo: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `,
  UserImgInfoBox: styled.div`
    display: flex;
    width: 100%;
  `,
  UserImgBox: styled.div`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  `,
  UserImg: styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
    cursor: 'pointer';
  `,
  UserNickNameIdBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-left: 1.2rem;
    @media screen and (max-width: 300px) {
      margin-left: 0.8rem;
    }
  `,
  UserNickname: styled.button`
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    color: var(--color-gray03);
    font-size: 0.98rem;
    font-weight: 600;
    width: 80%;
    &:hover {
      font-weight: 700;
    }
    &:focus {
      color: var(--color-primary);
    }
  `,
  UserId: styled.div`
    display: flex;
    align-items: center;
    margin-right: 0.2rem;
    color: var(--color-point-light-blue);
    font-size: 0.9rem;
    font-weight: 400;
    div:first-of-type {
      font-weight: 600;
      margin-right: 0.1rem;
    }
  `,
  IsUserFollowBox: styled.div`
    display: flex;
    align-items: center;
  `,
  LetsFollowUserBtn: styled.button`
    font-size: 0.93rem;
    color: var(--color-primary);
    font-weight: 500;
    flex-shrink: 0;
    &:hover {
      font-weight: 600;
    }
  `,
};

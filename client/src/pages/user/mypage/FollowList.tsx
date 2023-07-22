import styled from '@emotion/styled';
import { FollowUsersInfoData } from '../../../types/user';

interface FollowListProps {
  title: string;
  userInfo: FollowUsersInfoData;
}

export default function FollowList({ title, userInfo }: FollowListProps) {
  return (
    <S.ModalFollowerBox>
      <S.UserInfo>
        <S.UserImgInfoBox>
          <S.UserImgBox>
            <S.UserImg src={userInfo?.imgId} alt='유저 프로필 사진' />
          </S.UserImgBox>
          <S.UserNickNameIdBox>
            <S.UserNickname tabIndex={0}>
              <div>{userInfo?.nickname}</div>
            </S.UserNickname>
            <S.UserId>
              <div>@</div>
              <div>{userInfo?.loginId}</div>
            </S.UserId>
          </S.UserNickNameIdBox>
        </S.UserImgInfoBox>
        <S.IsUserFollowBox>
          {title === '구독됨' && !userInfo.isAlsoFollowed && (
            <S.LetsFollowUserBtn type='button'>구독하기</S.LetsFollowUserBtn>
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
  UserNickname: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    color: var(--color-gray03);
    font-size: 0.98rem;
    font-weight: 600;
    &:hover {
      font-weight: 700;
    }
    &:focus {
      outline: 2px solid var(--color-primary);
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

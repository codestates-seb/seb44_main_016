import styled from '@emotion/styled';
import Link from 'next/link';

import AsideHamburgerBtn from './AsideHamburgerBtn';
import useUserGlobalValue from '../redux/getUserInfo';
import { profile } from 'console';

type Props = {
  href?: string;
  className?: string;
};

export default function AsideProfileBox(props: Props) {
  const isShrinkOrMobile = ['shrink', 'mobile'].includes(props.className || '');
  const { nickname, loginId, profileImgPath } = useUserGlobalValue();

  let hamburgerBtn = <></>;

  if (!isShrinkOrMobile) {
    hamburgerBtn = <AsideHamburgerBtn />;
  }

  return (
    <S.ProfileBoxContainer>
      <S.ProfileLeftBtn href='/user/mypage'>
        <S.UserProfileImgBox>
          <img src={profileImgPath ?? ''} alt='프로필 사진' />
        </S.UserProfileImgBox>

        <S.ProfileTexts>
          <S.Nickname>{nickname}</S.Nickname>
          <S.UserId>
            <div>@</div>
            <div>{loginId}</div>
          </S.UserId>
        </S.ProfileTexts>
      </S.ProfileLeftBtn>
      <S.ProfileRightDiv>{hamburgerBtn}</S.ProfileRightDiv>
    </S.ProfileBoxContainer>
  );
}

const S = {
  ProfileBoxContainer: styled.div`
    width: 100%;
    height: 3.25rem;
    color: black;
    background-color: white;
    padding-left: 1.25rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  ProfileLeftBtn: styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  ProfileRightDiv: styled.div`
    height: 100%;
    display: flex;
    align-items: start;
    justify-content: space-between;
  `,
  ProfileTexts: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.3rem;
  `,
  Nickname: styled.span`
    font-weight: bold;
  `,
  UserProfileImgBox: styled.div`
    transition: transform 0.3s ease-in-out;
    border-radius: 50%;
    overflow: hidden;
    width: 2.5rem;
    height: 2.5rem;
    > img {
      width: 100%;
      height: 100%;
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
};

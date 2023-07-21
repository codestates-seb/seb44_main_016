import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import useMutateUser from '../../services/useMutateUser';
import apiUser from '../../services/apiUser';

type Props = {
  className: string;
};

export default function ProfileHamburgerBtn(props: Props) {
  const [isHamburgerOpened, setIsHamburgerOpened] = React.useState(false);
  const { LogOutMutate } = useMutateUser.logout(apiUser.deleteLogout);

  const handleLogout = () => {
    setIsHamburgerOpened(false);
    LogOutMutate();
  };

  return (
    <>
      <S.MobileHomeHeaderProfileDiv className={props.className}>
        <S.ProfileBtn onClick={() => setIsHamburgerOpened(true)}>
          <S.ProfileImg />
        </S.ProfileBtn>
        {isHamburgerOpened ? (
          <>
            <S.Backdrop onMouseDown={() => setIsHamburgerOpened(false)} />
            <S.HamburgerModal>
              <S.Triangle className={props.className} />
              <S.LinkBtnList className={props.className}>
                <S.LinkBtn href='/user/mypage' onClick={() => setIsHamburgerOpened(false)}>
                  마이 페이지
                </S.LinkBtn>
                <S.LinkBtn href='/user/update' onClick={() => setIsHamburgerOpened(false)}>
                  회원정보 수정
                </S.LinkBtn>
                <S.LinkBtn href='' onClick={handleLogout}>
                  로그아웃
                </S.LinkBtn>
              </S.LinkBtnList>
            </S.HamburgerModal>
          </>
        ) : (
          <></>
        )}
      </S.MobileHomeHeaderProfileDiv>
    </>
  );
}

const S = {
  MobileHomeHeaderProfileDiv: styled.div`
    position: relative;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1vw;

    &.shrink {
      margin-right: 0;
    }
  `,
  ProfileBtn: styled.button`
    width: calc(var(--header-h) - 2.5rem);
    height: calc(var(--header-h) - 2.5rem);
    flex-shrink: 0;
    overflow: hidden;
    border-radius: var(--rounded-full);
  `,
  ProfileImg: styled.img`
    width: 100%;
    height: 100%;
    background-color: black;
  `,

  HamburgerBtn: styled.button`
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      & > svg {
        filter: brightness(0);
      }
      &::before {
        content: '';
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-radius: var(--rounded-full);
        background-color: var(--color-gray08);
      }
    }
  `,

  HamburgerModal: styled.div`
    position: absolute;
    top: 11.5rem;
    right: 0rem;
    filter: drop-shadow(0px 2px 2px var(--color-gray06)); // 그림자
  `,
  Triangle: styled.div`
    position: absolute;
    top: -9rem;
    right: 1.5rem;
    border-bottom: 1.5rem solid white;
    border-left: 1.5rem solid transparent;
    border-right: 0px solid transparent;

    &.shrink {
      top: -11rem;
      right: -3rem;
      border-top: 0.75rem solid transparent;
      border-bottom: 0.75rem solid transparent;
      border-left: 1.5rem solid transparent;
      border-right: 1.5rem solid white;
    }
  `,
  LinkBtnList: styled.ol`
    position: absolute;
    top: -6rem;
    right: 6.5rem;
    transform: translate(80%, -20%);
    border-radius: 1rem;

    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &.shrink {
      top: -16.5rem;
      right: -4rem;
      transform: translate(80%, -20%);
      border-radius: 1rem;
    }

    &:last-child::after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 1rem 1rem 0;
      border-color: white transparent;
      display: block;
      width: 0;
      z-index: 1;
      bottom: -1rem;
      right: 0rem;
    }
    &:last-child::after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 1rem 1rem 0;
      border-color: white transparent;
      display: block;
      width: 0;
      z-index: 1;
      bottom: -1rem;
      right: 0rem;
    }
  `,
  LinkBtn: styled(Link)`
    white-space: nowrap;
    width: 100%;
    padding: 1rem;

    font-weight: 500;
    background-color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      filter: brightness(0.9);
    }
  `,

  Backdrop: styled.button`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    cursor: default;
  `,
};

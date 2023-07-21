import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import svgs from '../../constants/svg';
import useMutateUser from '../../services/useMutateUser';
import apiUser from '../../services/apiUser';

export default function AsideHamburgerBtn() {
  const [isHamburgerOpened, setIsHamburgerOpened] = React.useState(false);
  const { LogOutMutate } = useMutateUser.logout(apiUser.deleteLogout);

  const handleLogout = () => {
    setIsHamburgerOpened(false);
    LogOutMutate();
  };

  return (
    <>
      <S.HamburgerBtn onClick={() => setIsHamburgerOpened(true)}>{svgs.ellipsis}</S.HamburgerBtn>
      {isHamburgerOpened ? (
        <>
          <S.Backdrop onMouseDown={() => setIsHamburgerOpened(false)} />
          <S.HamburgerModal>
            <S.Triangle />
            <S.LinkBtnList>
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
    </>
  );
}

const S = {
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
    filter: drop-shadow(0px 2px 2px var(--color-gray06)); // 그림자
  `,
  Triangle: styled.div`
    position: absolute;
    top: -1.5rem;
    right: 1.5rem;
    width: 0px;
    height: 0px;
    border-top: 1.5rem solid white;
    border-left: 1.5rem solid transparent;
    border-right: 0px solid transparent;
  `,
  LinkBtnList: styled.ol`
    position: absolute;
    top: -9rem;
    right: 6.5rem;
    transform: translate(80%, -20%);
    border-radius: 1rem;

    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

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

import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import svgs from '../../constants/svg';

export default function AsideHamburgerBtn() {
  const [isHamburgerOpened, setIsHamburgerOpened] = React.useState(false);

  return (
    <>
      <S.HamburgerBtn onClick={() => setIsHamburgerOpened(true)}>{svgs.ellipsis}</S.HamburgerBtn>
      {isHamburgerOpened ? (
        <>
          <S.Backdrop onMouseDown={() => setIsHamburgerOpened(false)} />
          <S.LinkBtnList>
            <S.LinkBtn href='/user/update' onClick={() => setIsHamburgerOpened(false)}>
              회원정보 수정
            </S.LinkBtn>
            <S.LinkBtn href='' onClick={() => setIsHamburgerOpened(false)}>
              로그아웃
            </S.LinkBtn>
          </S.LinkBtnList>
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
    top: -0.25rem;
    right: 0.5rem;
    position: absolute;

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
  LinkBtnList: styled.ol`
    top: 0rem;
    right: 1rem;
    transform: translate(80%, -20%);
    border-radius: 1rem;
    overflow: hidden;
    position: absolute;

    box-shadow: 0px 0.1rem 0.2rem rgba(0, 0, 0, 0.5);

    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `,
  LinkBtn: styled(Link)`
    white-space: nowrap;
    width: 100%;
    padding: 1rem;

    font-weight: 500;
    background-color: white;
    border-bottom: 0.05rem solid var(--color-gray08);

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

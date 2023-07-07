import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CloseBtn from '../../../../../public/image/closeBtn.svg';
import ModalList from './FollowList';

export default function FollowModal() {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.Follower onClick={openModalHandler}>
      <S.ButtonName>
        구독함 <S.FollowerNum>11</S.FollowerNum>
      </S.ButtonName>
      {isOpen === true ? (
        <S.ModalBackdrop onClick={openModalHandler}>
          <S.ModalView onClick={(e) => e.stopPropagation()}>
            <S.ModalTop>
              <CloseBtn onClick={openModalHandler} />
            </S.ModalTop>
            <S.ModalFollowerList>
              <S.ModalFollowerBox>
                <ModalList />
              </S.ModalFollowerBox>
            </S.ModalFollowerList>
          </S.ModalView>
        </S.ModalBackdrop>
      ) : null}
    </S.Follower>
  );
}

const S = {
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
    width: 383px;
    height: 348px;
    > span.close-btn {
      margin-top: 5px;
      cursor: pointer;
    }
  `,
  ButtonName: styled.div`
    &:hover {
      color: var(--color-gray02);
    }
  `,
  Follower: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    color: var(--color-gray05);
    cursor: pointer;
    :nth-of-type(2) {
      margin: 0 1.7rem 0 1rem;
    }
  `,
  FollowerNum: styled.span`
    color: var(--color-point-purple);
    font-weight: 500;
    display: inline-block;
    margin-left: 0.2rem;
  `,
  ModalTop: styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    padding-right: 2rem;
    align-items: center;
    border-bottom: 1px solid var(--color-gray08);
  `,
  ModalFollowerList: styled.div``,
  ModalFollowerBox: styled.div`
    display: flex;
    justify-content: space-between;
    /* border: 1px solid red; */
    padding: 0.6rem 1.5rem;
  `,
  UserInfo: styled.div`
    /* border: 1px solid green; */
    display: flex;
  `,
  UserPic: styled.div`
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
  `,
  UserId: styled.div`
    /* border: 1px solid orange; */
    display: flex;
    align-items: center;
    margin: 0 0.9rem 0 0.6rem;
    color: var(--color-gray04);
    font-size: 0.92rem;
    font-weight: 400;
  `,
  UserFollow: styled.div`
    /* border: 1px solid blue; */
    display: flex;
    align-items: center;
    color: var(--color-primary);
  `,
  UserDelete: styled.div`
    display: flex;
    align-items: center;
    font-size: 0.98rem;
    font-weight: 500;
  `,
};

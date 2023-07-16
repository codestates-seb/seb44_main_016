import styled from '@emotion/styled';
import { useState } from 'react';
import CloseBtn from '../../../../public/image/closeBtn.svg';
import ModalList from './FollowList';
import { FollowUsersInfoData } from '../../../types/user';

interface FollowModalProps {
  title: string;
  list: FollowUsersInfoData[];
}

export default function FollowModal({ title, list }: FollowModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => setIsOpen((prev) => !prev);

  return (
    <S.FollowerContainer onClick={openModalHandler}>
      <S.ButtonNameBtn type='button'>
        {title} <S.FollowerNum>{list?.length}</S.FollowerNum>
      </S.ButtonNameBtn>
      {isOpen ? (
        <S.ModalBackdrop onClick={openModalHandler}>
          <S.ModalView onClick={(e) => e.stopPropagation()}>
            <S.ModalTop>
              <S.Title>{title}</S.Title>
              <CloseBtn onClick={openModalHandler} />
            </S.ModalTop>
            <S.ModalFollowerBox>
              {list?.map((el) => (
                <ModalList key={el.loginId} title={title} userInfo={el} />
              ))}
            </S.ModalFollowerBox>
          </S.ModalView>
        </S.ModalBackdrop>
      ) : null}
    </S.FollowerContainer>
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
    backdrop-filter: blur(5px);
    display: grid;
    place-items: center;
  `,
  ModalView: styled.section`
    border-radius: 10px;
    background-color: #ffffff;
    width: 383px;
    height: 355px;
    > span.close-btn {
      margin-top: 5px;
      cursor: pointer;
    }
  `,
  ButtonNameBtn: styled.button`
    font-size: 1.07rem;
    font-weight: 500;
    &:hover {
      color: var(--color-primary);
    }
  `,
  FollowerContainer: styled.div`
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
  FollowerNum: styled.div`
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
  Title: styled.div`
    font-weight: 400;
    color: var(--color-gray03);
    margin-right: 8rem;
  `,
  ModalFollowerBox: styled.div`
    width: 100%;
    height: calc(100% - 50px);
    overflow: scroll;
    overflow-x: hidden;
    justify-content: space-between;
    padding: 0rem 1.65rem 0 1.5rem;
  `,
  UserInfo: styled.div`
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
    display: flex;
    align-items: center;
    margin: 0 0.9rem 0 0.6rem;
    color: var(--color-gray04);
    font-size: 0.92rem;
    font-weight: 400;
  `,
  UserFollow: styled.div`
    display: flex;
    align-items: center;
    color: var(--color-primary);
  `,
};

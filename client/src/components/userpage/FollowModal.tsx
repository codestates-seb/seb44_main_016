import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import CloseBtnIcon from '../../../public/images/icon/closeBtn.svg';
import FollowList from './FollowList';
import { FollowUsersInfoData } from '../../types/user';

interface FollowModalProps {
  title: string;
  followList: FollowUsersInfoData[];
  isFollowed?: boolean;
  isFollowing?: boolean;
}

export default function FollowModal({ title, followList }: FollowModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleFocusCloseButton = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        e.preventDefault();
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleFocusCloseButton);
    }

    return () => {
      document.removeEventListener('keydown', handleFocusCloseButton);
    };
  }, [isOpen]);

  return (
    <S.FollowerContainer onClick={handleOpenModal}>
      <S.ServiceNameBtn aria-haspopup='dialog' aria-controls='dialogPopup' type='button'>
        {title} <S.FollowTotalNum>{followList?.length}</S.FollowTotalNum>
      </S.ServiceNameBtn>
      {isOpen ? (
        <S.ModalBackdrop onClick={handleOpenModal}>
          <S.ModalView role='dialog' aria-modal='true' id='dialogPopup' onClick={(e) => e.stopPropagation()}>
            <S.ModalTop>
              <S.Title ref={modalRef}>{title}</S.Title>
              <S.CloseBtnBtn type='button' onClick={handleOpenModal} ref={closeButtonRef}>
                <CloseBtnIcon />
              </S.CloseBtnBtn>
            </S.ModalTop>
            <S.ModalFollowListBox>
              {followList?.map((el) => (
                <FollowList key={el.loginId} title={title} userInfo={el} />
              ))}
            </S.ModalFollowListBox>
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
    @media screen and (max-width: 1024px) {
      height: 350px;
    }
    @media screen and (max-width: 400px) {
      width: 95%;
    }
  `,
  ServiceNameBtn: styled.button`
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
  FollowTotalNum: styled.div`
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
    align-items: center;
    border-bottom: 1px solid var(--color-gray08);
    position: relative;
  `,
  CloseBtnBtn: styled.button`
    margin-right: 2rem;
    z-index: 2;
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 400px) {
      margin-right: 0.7rem;
    }
  `,
  Title: styled.div`
    font-weight: 400;
    color: var(--color-gray03);
    text-align: center;
    position: absolute;
    width: 90%;
    padding-right: 4rem;
    @media screen and (max-width: 1024px) {
      font-size: 15px;
    }
    &:focus {
      outline: 2px solid var(--color-primary);
    }
  `,
  ModalFollowListBox: styled.div`
    width: 100%;
    height: calc(100% - 50px);
    overflow: scroll;
    overflow-x: hidden;
    justify-content: space-between;
    padding: 0rem 1.65rem 0 1.5rem;
    @media screen and (max-width: 400px) {
      padding: 0rem 1.25rem 0 1.1rem;
    }
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

import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import CloseBtnIcon from '../../../../public/images/icon/closeBtn.svg';
import RandomAvatarUpdate from './RandomAvatarUpdate';
import UserImgFileUpdate from './UserImgFileUpdate';
import { UserInfoResData } from '../../../types/user';

interface ImageUploadProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  myInfoData: UserInfoResData;
}

export default function ProfileImgUpdateModal({ isOpen, setIsOpen, myInfoData }: ImageUploadProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const menuArr = [
    {
      name: '랜덤 아바타 뽑기',
      content: () => <RandomAvatarUpdate myInfoData={myInfoData} setIsOpen={setIsOpen} isOpen={isOpen} />,
    },
    {
      name: '자유롭게 사진 올리기',
      content: () => <UserImgFileUpdate myInfoData={myInfoData} setIsOpen={setIsOpen} isOpen={isOpen} />,
    },
  ];

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

  const handleSelectMenu = (index: number) => setCurrentTab(index);
  const handleOpenModal = () => setIsOpen(!isOpen);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, index: number) => {
    if (e.key === 'Enter') {
      handleSelectMenu(index);
    }
  };

  return (
    <S.ModalBackdrop onClick={handleOpenModal}>
      <S.ModalView role='dialog' aria-modal='true' id='dialogPopup' onClick={(e) => e.stopPropagation()}>
        <S.ModalTop>
          <S.Title tabIndex={0} ref={modalRef}>
            프로필 사진을 <S.ReactiveDiv>무엇으로 바꿀 예정이신가요?</S.ReactiveDiv>
          </S.Title>
          <S.CloseBtnBtn type='button' onClick={handleOpenModal} ref={closeButtonRef}>
            <CloseBtnIcon />
          </S.CloseBtnBtn>
        </S.ModalTop>
        <S.TabMenu>
          {menuArr.map((menu, i) => {
            return (
              <li
                key={menu.name}
                tabIndex={0}
                className={currentTab === i ? 'submenu focused' : 'submenu'}
                onClick={() => handleSelectMenu(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              >
                {menu.name}
              </li>
            );
          })}
        </S.TabMenu>
        <S.TabContents>{menuArr[currentTab].content()}</S.TabContents>
      </S.ModalView>
    </S.ModalBackdrop>
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
    width: 420px;
    height: 400px;
    .closeBtn {
      cursor: pointer;
    }
    @media screen and (max-width: 500px) {
      width: 95%;
    }
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
  Title: styled.div`
    font-weight: 400;
    color: var(--color-gray03);
    text-align: center;
    position: absolute;
    width: 100%;
    margin-right: 1.5rem;
  `,
  ReactiveDiv: styled.span`
    @media screen and (max-width: 330px) {
      display: block;
    }
  `,
  CloseBtnBtn: styled.button`
    margin-right: 2rem;
    z-index: 4;
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 500px) {
      margin-right: 0.7rem;
    }
  `,
  TabMenu: styled.ul`
    border-bottom: 0.05rem solid var(--color-gray08);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 13%;
    background-color: white;
    font-size: 1.15rem;
    color: var(--color-gray03);
    border-bottom: 3px solid transparent;
    .focused {
      font-weight: 600;
      color: var(--color-primary);
      border-bottom: 3px solid var(--color-primary);
    }
    > li {
      padding: 0.4rem 0;
      border-bottom: 3px solid transparent;
      &:hover {
        color: var(--color-primary);
        cursor: pointer;
      }
      @media screen and (max-width: 330px) {
        font-size: 15px;
      }
    }
    li:first-of-type {
      margin-right: 1rem;
    }
  `,
  TabContents: styled.div`
    text-align: center;
    width: 100%;
    height: 73%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};

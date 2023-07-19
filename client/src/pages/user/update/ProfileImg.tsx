import styled from '@emotion/styled';
import ImageUploadBtnIcon from '../../../../public/images/icon/imageUpload.svg';
import { useState } from 'react';
import CloseBtn from '../../../../public/images/icon/closeBtn.svg';
import RandomAvatarUpdate from './RandomAvatarUpdate';
import { store } from '../../../components/redux/store';
import UserImgFileUpdate from './UserImgFileUpdate';
import { UserInfoResData } from '../../../types/user';

interface ImageUploadProps {
  data: UserInfoResData;
}

export default function ProfileImgUpdate({ data }: ImageUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    {
      name: '랜덤 아바타 뽑기',
      content: () => <RandomAvatarUpdate userData={data} setIsOpen={setIsOpen} isOpen={isOpen} />,
    },
    {
      name: '자유롭게 사진 올리기',
      content: () => <UserImgFileUpdate userData={data} setIsOpen={setIsOpen} isOpen={isOpen} />,
    },
  ];

  const handleSelectMenu = (index: number) => setCurrentTab(index);
  const openModalHandler = () => setIsOpen(!isOpen);
  const { currentImgSrc } = store.getState().currentImgReducer;
  return (
    <S.UserImg>
      <img src={currentImgSrc ? currentImgSrc : data.profileImgPath} alt='유저 프로필 사진' />
      <S.ImageUploadBtn onClick={openModalHandler} type='button' aria-label='이미지 업로드 버튼'>
        <ImageUploadBtnIcon />
      </S.ImageUploadBtn>

      {isOpen ? (
        <S.ModalBackdrop onClick={openModalHandler}>
          <S.ModalView onClick={(e) => e.stopPropagation()}>
            <S.ModalTop>
              <S.Title>프로필 사진을 무엇으로 바꿀 예정이신가요?</S.Title>
              <CloseBtn onClick={openModalHandler} className='closeBtn' />
            </S.ModalTop>
            <S.TabMenu>
              {menuArr.map((menu, i) => {
                return (
                  <li
                    key={menu.name}
                    className={currentTab === i ? 'submenu focused' : 'submenu'}
                    onClick={() => handleSelectMenu(i)}
                  >
                    {menu.name}
                  </li>
                );
              })}
            </S.TabMenu>
            <S.TabContents>{menuArr[currentTab].content()}</S.TabContents>
          </S.ModalView>
        </S.ModalBackdrop>
      ) : null}
    </S.UserImg>
  );
}

const S = {
  UserImg: styled.div`
    margin: 2.7rem 0 1.5rem 0;
    width: 150px;
    height: 150px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    transition-duration: 0.7s;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition-duration: 0.7s;
    }
    &:hover > img {
      transform: scale(1.1);
    }
  `,
  ImageUploadBtn: styled.button`
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
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
    margin-right: 2rem;
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
    &:hover {
      color: var(--color-primary);
      cursor: pointer;
    }
    > li {
      padding-bottom: 0.4rem;
      border-bottom: 3px solid transparent;
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

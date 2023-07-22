import styled from '@emotion/styled';
import ImageUploadBtnIcon from '../../../../public/images/icon/imageUpload.svg';
import { useState } from 'react';
import { store } from '../../../components/redux/store';
import { UserInfoResData } from '../../../types/user';
import ProfileImgUpdateModal from './ProfileImgUpdateModal';

interface ImageUploadProps {
  myInfoData: UserInfoResData;
}

export default function ProfileImgUpdate({ myInfoData }: ImageUploadProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(!isOpen);
  const { currentImgSrc } = store.getState().currentImgReducer;

  return (
    <S.UserImg>
      <img src={currentImgSrc ? currentImgSrc : myInfoData?.profileImgPath} alt='유저 프로필 사진' />
      <S.ImageUploadBtn
        onClick={handleOpenModal}
        aria-haspopup='dialog'
        aria-controls='dialogPopup'
        type='button'
        aria-label='이미지 업로드 버튼'
      >
        <ImageUploadBtnIcon />
      </S.ImageUploadBtn>

      {isOpen ? (
        <ProfileImgUpdateModal isOpen={isOpen} setIsOpen={setIsOpen} myInfoData={myInfoData} />
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
    @media screen and (max-width: 750px) {
      width: 120px;
      height: 120px;
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
    z-index: 2;
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
      padding-bottom: 0.4rem;
      border-bottom: 3px solid transparent;
      &:focus {
        outline: 2px solid var(--color-point-lilac);
      }
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

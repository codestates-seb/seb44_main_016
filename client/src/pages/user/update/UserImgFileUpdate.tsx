import styled from '@emotion/styled';
import { useAppDispatch } from '../../../components/redux/hooks';
import { changeImgSrc } from '../../../components/redux/currentImgReducer';
import ImgCropModal from '../../../components/img-crop/ImgCropModal';
import FilePlusLabel from '../../../components/FilePlusLabel';
import { useImgCrop } from '../../../hooks/useImgCrop';
import { handleFileChange } from '../../../components/img-crop/imgCropUtils';
import { store } from '../../../components/redux/store';
import { UserInfoResData } from '../../../types/user';
import { useEffect, useRef } from 'react';

interface RandomAvatarUpdateProps {
  myInfoData: UserInfoResData;
  setIsOpen: (arg: boolean) => void;
  isOpen: boolean;
}

export default function UserImgFileUpdate({ myInfoData, setIsOpen, isOpen }: RandomAvatarUpdateProps) {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const decideBtnRef = useRef<HTMLButtonElement>(null); // Ref for the DecideBtn

  const currentImgSrc = store.getState().currentImgReducer.currentImgSrc;
  const { imgSrc, setImgSrc, croppedImage, setCroppedImage, cropModal, setCropModal } = useImgCrop();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileChange({
      e,
      setCropModal,
      setImgSrc,
    });
  };

  const handleChooseFileProfileImg = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(changeImgSrc({ currentImgSrc: croppedImage, isAvatar: false }));
    setIsOpen(!isOpen);
  };

  const handleFileInputClick = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const prevCropModalRef = useRef(false);

  useEffect(() => {
    console.log(prevCropModalRef);
    if (prevCropModalRef.current !== false) {
      if (!cropModal && decideBtnRef.current) {
        decideBtnRef.current.focus();
      }
    }
    prevCropModalRef.current = cropModal;
  }, [cropModal]);

  return (
    <>
      <S.UserImgBox>
        {croppedImage ? (
          <img src={croppedImage} />
        ) : currentImgSrc ? (
          <img src={currentImgSrc} alt={`프로필 사진`} />
        ) : (
          <img src={myInfoData?.profileImgPath} alt={`프로필 사진`} />
        )}
        <S.FileInput
          type='file'
          id='addUserProfileImg'
          accept='image/*'
          onChange={onFileChange}
          ref={fileInputRef}
        />
        <S.FilePlusIconBox tabIndex={0} onKeyDown={handleFileInputClick}>
          <FilePlusLabel htmlFor='addUserProfileImg' />
        </S.FilePlusIconBox>
      </S.UserImgBox>

      <S.ButtonBox>
        <S.DecideBtn type='button' ref={decideBtnRef} onClick={handleChooseFileProfileImg}>
          이 사진으로 <br /> 결정하기
        </S.DecideBtn>
      </S.ButtonBox>
      {cropModal && (
        <ImgCropModal
          isOpen={cropModal}
          setCropModal={setCropModal}
          imgSrc={imgSrc}
          aspect={1 / 1}
          cropShape='round'
          onCropComplete={(image) => setCroppedImage(image)}
          isMyPage={true}
        />
      )}
    </>
  );
}
const S = {
  UserImgBox: styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    transition-duration: 0.7s;
    margin-bottom: 1.7rem;
    position: relative;
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
  ButtonBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & > button {
      width: 120px;
      text-align: center;
      line-height: 110%;
      color: var(--color-white);
      padding: 0.75rem;
      background: var(--color-primary);
      border-radius: 100px;
      border: 2px solid var(--color-primary);
      &:hover {
        background: var(--color-white);
        font-weight: 600;
        color: var(--color-primary);
      }
      &:focus {
        outline: 2px solid var(--color-point-yellow);
      }
    }
    & > button:nth-of-type(2) {
      border: 2px solid var(--color-point-light-gray);
      background: var(--color-point-light-gray);
      color: var(--color-gray01);
      margin-left: 1rem;
      font-weight: 500;
      &:hover {
        background: var(--color-white);
        color: var(--color-point-gray);
      }
    }
  `,
  DecideBtn: styled.button`
    &:focus {
      outline: 1px solid var(--color-point-yellow);
    }
  `,
  FilePlusIconBox: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20%;
    height: 20%;
    border-radius: 50%;
    &:focus {
      outline: 3px solid white;
    }
  `,
  FileInput: styled.input`
    display: none;
  `,
};

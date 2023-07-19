import styled from '@emotion/styled';
import { useAppDispatch } from '../../../components/redux/hooks';
import { changeImgSrc } from '../../../components/redux/currentImgReducer';
import ImgCropModal from '../../../components/img-crop/ImgCropModal';
import FilePlusLabel from '../../../components/FilePlusLabel';
import { useImgCrop } from '../../../hooks/useImgCrop';
import { handleFileChange } from '../../../components/img-crop/imgCropUtils';
import { store } from '../../../components/redux/store';

interface RandomAvatarUpdateProps {
  userData: any | null; // 이 데이터 타입은 추후 api 작성 완료 되면 수정 예정
  setIsOpen: (arg: boolean) => void;
  isOpen: boolean;
}

export default function UserImgFileUpdate({ userData, setIsOpen, isOpen }: RandomAvatarUpdateProps) {
  const dispatch = useAppDispatch();
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

  return (
    <>
      <S.UserImg>
        {croppedImage ? (
          <img src={croppedImage} />
        ) : currentImgSrc ? (
          <img src={currentImgSrc} alt={`프로필 사진`} />
        ) : (
          <img src={userData.profileImgPath} alt={`프로필 사진`} />
        )}
      </S.UserImg>
      <S.FileInput type='file' id='addFaRecImg' accept='image/*' onChange={onFileChange} />
      <FilePlusLabel htmlFor='addFaRecImg' />
      <S.ButtonWrap>
        <button type='button' onClick={handleChooseFileProfileImg}>
          이 사진으로 <br /> 결정하기
        </button>
      </S.ButtonWrap>
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
  UserImg: styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    transition-duration: 0.7s;
    margin-bottom: 1.7rem;
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
  ButtonWrap: styled.div`
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
  ImgBox: styled.div`
    position: relative;
    width: 12.7rem;
    height: 12.7rem;
    border-radius: 100%;
    overflow: hidden;
    margin-bottom: 3.125rem;
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
  FileInput: styled.input`
    display: none;
  `,
};

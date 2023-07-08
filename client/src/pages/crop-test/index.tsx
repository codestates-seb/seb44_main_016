import React from 'react';
import { useImgCrop } from '../../hooks/useImgCrop';
import { handleFileChange } from '../../components/img-crop/imgCropUtils';
import ImgCropModal from '../../components/img-crop/ImgCropModal';
import styled from '@emotion/styled';

export default function index() {
  const {
    imgSrc,
    setImgSrc,
    croppedImage,
    setCroppedImage,
    cropModal,
    setCropModal,
  } = useImgCrop();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileChange({
      e,
      setCropModal,
      setImgSrc,
    });
  };

  return (
    <div>
      <input type='file' onChange={onFileChange} />
      {cropModal && (
        <ImgCropModal
          isOpen={cropModal}
          setCropModal={setCropModal}
          imgSrc={imgSrc}
          aspect={1 / 1} // 1 / 1은 화면 비율입니다. 원하시는 비율에 맞춰 수정 가능합니다.
          cropShape='round' // cropShape는 'round' 또는 'rect'만 선택 가능합니다.
          onCropComplete={(image) => setCroppedImage(image)}
        />
      )}
      <S.ImgBox>
        <img src={croppedImage} alt='' />
      </S.ImgBox>
    </div>
  );
}

const S = {
  ImgBox: styled.div`
    width: 400px;
    height: 400px;
    overflow: hidden;
    border-radius: 100%;
    border: 1px solid #333;
    background: white;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
};

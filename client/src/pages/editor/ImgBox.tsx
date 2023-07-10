import React from 'react';
import styled from '@emotion/styled';
// 컴포넌트와 util 함수를 불러옵니다.

import { useImgCrop } from '../../hooks/useImgCrop';
import { handleFileChange } from '../../components/img-crop/imgCropUtils';
// import ImgCropModal from '../../components/img-crop/ImgCropModal';

type Props = {
  id: number;
};

export default function ImgBox(props: Props) {
  const inputImgBtnId = `addArticleImg${props.id}`;
  const {
    imgSrc,
    setImgSrc,
    croppedImage,
    setCroppedImage,
    cropModal,
    setCropModal,
  } = useImgCrop();

  // 파일을 crop img로 변경해주는 함수
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileChange({
      e,
      setCropModal,
      setImgSrc,
    });
  };

  // 컴포넌트 불러오는 곳에서 아래와 같이 작성해줍니다.

  return (
    <S.ImgContainer>
      {imgSrc && (
        <>
          <S.RemoveImgBtn onClick={() => setImgSrc(null)}>×</S.RemoveImgBtn>
          <S.Img src={imgSrc || ''} alt='' />
        </>
      )}
      <S.InputImgBtn
        type='file'
        id={inputImgBtnId}
        accept='image/*'
        onChange={onFileChange}
      />
      <S.InputImgLabel
        isImgBlank={imgSrc === null}
        htmlFor={inputImgBtnId}
        aria-label='게시글 사진 추가하기 버튼'
      >
        <S.PlusIcon>＋</S.PlusIcon>
      </S.InputImgLabel>
    </S.ImgContainer>
  );
}

const S = {
  ImgContainer: styled.div`
    position: relative;
    width: 11.5rem;
    height: 11.5rem;
    background-color: white;
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  InputImgBtn: styled.input`
    display: none;
  `,
  RemoveImgBtn: styled.button`
    position: absolute;
    top: -1.25rem;
    right: 0;
    color: white;
    font-size: 5rem;
    font-weight: 100;
    text-shadow: 0px 0px 5px black;
    z-index: 999;
  `,
  InputImgLabel: styled.label<{ isImgBlank: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    opacity: ${(props) => Number(props.isImgBlank)};

    &:hover {
      opacity: 1;
    }
  `,
  PlusIcon: styled.div`
    background: rgba(103, 111, 198, 0.7);
    width: 3rem;
    height: 3rem;
    border-radius: var(--rounded-full);
    text-align: center;
    color: white;
    font-size: 2rem;
    padding-top: 0.05rem; // +가 살짝 위로 배치되는 버그 수정
  `,
};

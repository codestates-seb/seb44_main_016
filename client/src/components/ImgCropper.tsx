import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';

const ImgCropper = ({
  croppedImage, // crop할 이미지
  setCroppedAreaPixels, // 이미지 {width: , height: , x: , y: } setstate, 잘린 이미지 값
  width = '1', // 이미지 비율
  height = '1', // 이미지 비율
  cropShape = 'none', // 이미지 모양 round 설정 시 원으로 바뀜
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedAreaPixel: Area) => {
    setCroppedAreaPixels(croppedAreaPixel);
  }, []);

  return (
    <S.Container>
      <Cropper
        image={croppedImage}
        crop={crop}
        zoom={zoom}
        aspect={width / height}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        cropShape={cropShape}
      />
      <S.ZoomBox>
        <S.ZoomInput
          type='range'
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby='Zoom'
          onChange={(e) => {
            setZoom(e.target.value);
          }}
        />
      </S.ZoomBox>
    </S.Container>
  );
};

export default ImgCropper;

const S = {
  Container: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  ZoomBox: styled.div`
    position: relative;
  `,
  ZoomInput: styled.input`
    max-width: 200px;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    -webkit-appearance: none;
    background: var(--color-white);
    border: 2px solid var(--color-primary);
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 15px;
      height: 15px;
      background: var(--color-primary);
      border-radius: 100%;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: var(--color-primary);
      border-radius: 100%;
      cursor: pointer;
    }
  `,
};

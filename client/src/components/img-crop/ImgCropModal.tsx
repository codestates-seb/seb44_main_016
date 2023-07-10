import styled from '@emotion/styled';
import { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import { getCroppedImg } from './canvasUtils';
import CommonStyles from '../../styles/CommonStyles';

interface ImageCropModalProps {
  imgSrc: string | null;
  onCropComplete: (image: string | null) => void;
  isOpen: boolean;
  setCropModal: (isOpen: boolean) => void;
  aspect: number;
  cropShape: 'round' | 'rect';
}

function ImgCropModal({
  isOpen,
  imgSrc,
  onCropComplete,
  setCropModal,
  aspect,
  cropShape,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    try {
      if (imgSrc && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
        if (typeof croppedImage === 'string') {
          onCropComplete(croppedImage);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCropModal(false);
    }
  }, [imgSrc, croppedAreaPixels, onCropComplete]);

  // esc 눌렀을 때 modal close
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCropModal(false);
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleCropChange = useCallback((newCrop: Point) => {
    setCrop(newCrop);
  }, []);

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <S.CropWrap>
      <S.CropContainer>
        <Cropper
          image={imgSrc || ''}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={handleCropChange}
          onCropComplete={handleCropComplete}
          onZoomChange={handleZoomChange}
          cropShape={cropShape}
        />
        <S.ButtonWrap>
          <button type='button' onClick={showCroppedImage}>
            선택
          </button>
          <button onClick={() => setCropModal(false)}>취소</button>
        </S.ButtonWrap>
      </S.CropContainer>
    </S.CropWrap>
  );
}

const S = {
  ...CommonStyles,
  CropWrap: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
  `,
  CropContainer: styled.div`
    max-width: 400px;
    width: 100%;
    height: 300px;
    background: var(--color-white);
    padding: 1rem;
    border-radius: var(--rounded-default);
    box-shadow: var(--box-shadow-default);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    & > div:nth-of-type(1) {
      position: relative !important;
      display: block;
      width: 100%;
      height: calc(100% - 2rem);
      margin-bottom: 1rem;
      border-radius: var(--rounded-default);
    }
  `,
  ButtonWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & > button {
      width: 90px;
      text-align: center;
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
      border: 2px solid var(--color-point-lilac);
      background: var(--color-point-lilac);
      margin-left: 1rem;
      &:hover {
        background: var(--color-white);
        color: var(--color-point-lilac);
      }
    }
  `,
};

export default ImgCropModal;

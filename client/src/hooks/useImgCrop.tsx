import { useState, useCallback } from 'react';
import { Area, Point } from 'react-easy-crop/types';
import { getCroppedImg } from '../components/img-crop/canvasUtils';

export function useImgCrop() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropModal, setCropModal] = useState(false);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (imgSrc && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
        if (typeof croppedImage === 'string') {
          setCroppedImage(croppedImage);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [imgSrc, croppedAreaPixels]);

  return {
    imgSrc,
    setImgSrc,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedAreaPixels,
    setCroppedAreaPixels,
    croppedImage,
    setCroppedImage,
    onCropComplete,
    showCroppedImage,
    cropModal,
    setCropModal,
  };
}

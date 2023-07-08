import styled from '@emotion/styled';
import CommonStyles from '../../styles/CommonStyles';
import useInput from '../../hooks/useComponents';
import PlusIcon from '../../../public/images/icon/plus.svg';
import { FormEvent, useCallback, useState } from 'react';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import { getCroppedImg } from '../../components/img-crop/canvasUtils';

function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        }
      },
      false
    );
    reader.readAsDataURL(file);
  });
}

export default function FaRecForm() {
  const [nameInput, faRecName] = useInput('text', '가계부 이름', 'faName');
  const [descInput, faRecDesc] = useInput('text', '가계부 설명', 'faDesc');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('financialRecordName', faRecName || '');
    formData.append('financialRecordDescription', faRecDesc || '');
    formData.append('imgId', croppedImage || '');
    /**
     *  아직 userId 받아오지 못해 테스트 아이디 입력. 추후 수정 예정
     */
    formData.append('userId', 'test');

    axios
      .post(
        'https://zerohip-git-user-55-everland.vercel.app/api/financial-record/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log('response-data', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 크롭
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropModal, setCropModal] = useState(false);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    try {
      if (imageSrc && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        console.log(croppedImage); // Check the value
        console.log(typeof croppedImage);
        if (typeof croppedImage === 'string') {
          setCroppedImage(croppedImage);
        }
        setCropModal(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setCropModal(true);
      setImageSrc(imageDataUrl);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Container>
        <S.ImgBox>
          <img
            src={
              croppedImage ||
              'https://blog.kakaocdn.net/dn/bY6iW4/btrEJwN3Zrf/SqQZ605snSkSqP5U96S3AK/img.png'
            }
            alt=''
          />

          <S.FileInput
            type='file'
            id='addFaRecImg'
            accept='image/*'
            onChange={onFileChange}
          />
          <S.FileLabelBtn htmlFor='addFaRecImg' aria-label='사진 추가하기 버튼'>
            <PlusIcon />
          </S.FileLabelBtn>
        </S.ImgBox>
        {cropModal && imageSrc && (
          <S.CropContainer>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <S.SubmitBtn type='button' onClick={showCroppedImage}>
              이미지 선택 완료
            </S.SubmitBtn>
          </S.CropContainer>
        )}
        <S.InputFieldWrap>
          {nameInput}
          {descInput}
        </S.InputFieldWrap>
        <S.SubmitBtn>가계부 만들기</S.SubmitBtn>
      </S.Container>
    </S.Form>
  );
}

const S = {
  ...CommonStyles,
  CropContainer: styled.div`
    width: 400px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    & > * {
      position: relative;
    }
  `,
  Form: styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Container: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 516px;
    width: 100%;
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
    }

    & > label {
      opacity: 0;
    }

    &:hover > label {
      opacity: 1;
    }
  `,
  PlusBtn: styled.button`
    width: 100px;
  `,
  InputWrap: styled.div`
    position: relative;
    width: 100%;
  `,
  Button: styled.button`
    position: absolute;
    top: 50%;
    right: 1.25rem;
    transform: translateY(-50%);
  `,
  FileInput: styled.input`
    display: none;
  `,
  FileLabelBtn: styled.label`
    position: absolute;
    background: rgba(103, 111, 198, 0.7);
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.7s;
  `,
  InputFieldWrap: styled.div`
    margin-bottom: 2.5rem;
    & > * {
      margin-bottom: 1rem;
    }
  `,
};

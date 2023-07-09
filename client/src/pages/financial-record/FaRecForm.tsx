import styled from '@emotion/styled';
import CommonStyles from '../../styles/CommonStyles';
import useInput from '../../hooks/useComponents';
import PlusIcon from '../../../public/images/icon/plus.svg';
import { FormEvent, useEffect, useState } from 'react';
import { useImgCrop } from '../../hooks/useImgCrop';
import { handleFileChange } from '../../components/img-crop/imgCropUtils';
import ImgCropModal from '../../components/img-crop/ImgCropModal';
import { useMutation } from '@tanstack/react-query';
import { APIfinancialRecord } from '../../services/apiFinancial';

type PageType = 'create' | 'edit';

interface FaRecFormProps {
  pageType: PageType;
  financialRecordId?: number;
  initialFaRecName?: string;
  initialFaRecDesc?: string;
  initialImage?: string;
}

export default function FaRecForm({
  pageType,
  financialRecordId,
  initialFaRecName,
  initialFaRecDesc,
  initialImage,
}: FaRecFormProps) {
  const [nameInput, faRecName, setFaRecName] = useInput(
    'text',
    '가계부 이름',
    'faName'
  );
  const [descInput, faRecDesc, setFaRecDesc] = useInput(
    'text',
    '가계부 설명',
    'faDesc'
  );

  const [errors, setErrors] = useState({
    faRecName: '',
    faRecDesc: '',
  });

  // edit일 경우 value 전달
  useEffect(() => {
    setFaRecName(initialFaRecName || '');
    setFaRecDesc(initialFaRecDesc || '');
  }, [initialFaRecName, initialFaRecDesc, setFaRecName, setFaRecDesc]);

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

  const { mutate, data, isError, isSuccess } = useMutation(
    pageType === 'create'
      ? APIfinancialRecord.createFaRec
      : APIfinancialRecord.updateFaRec,
    {
      onSuccess: (data) => {
        console.log('response-data', data);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      faRecName: faRecName ? '' : '가계부 이름은 필수입니다.',
      faRecDesc: faRecDesc ? '' : '가계부 설명은 필수입니다.',
    };

    setErrors(newErrors);

    if (newErrors.faRecName || newErrors.faRecDesc) {
      return;
    }

    const formData = new FormData();
    formData.append('financialRecordName', faRecName || '');
    formData.append('financialRecordDescription', faRecDesc || '');
    formData.append('imgId', croppedImage || '');
    /**
     *  아직 userId 받아오지 못해 테스트 아이디 입력. 추후 수정 예정
     */
    formData.append('userId', 'test');

    if (pageType === 'edit') {
      formData.append('financialRecordId', `${financialRecordId}`);
    }

    mutate(formData);
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Container>
        <S.ImgBox>
          {croppedImage ? (
            <img
              src={croppedImage}
              alt={faRecName ? `${faRecName} 프로필 사진` : '프로필 사진'}
            />
          ) : initialImage ? (
            <img src={initialImage} alt={`${initialFaRecName} 프로필 사진`} />
          ) : (
            <img src='/images/icon/person.svg' alt='사람 아이콘' />
          )}

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
        {cropModal && (
          <ImgCropModal
            isOpen={cropModal}
            setCropModal={setCropModal}
            imgSrc={imgSrc}
            aspect={1 / 1}
            cropShape='round'
            onCropComplete={(image) => setCroppedImage(image)}
          />
        )}
        <S.InputFieldWrap>
          <div>
            {nameInput}
            {errors.faRecName && <S.Error>{errors.faRecName}</S.Error>}
          </div>
          <div>
            {descInput}
            {errors.faRecDesc && <S.Error>{errors.faRecDesc}</S.Error>}
          </div>
        </S.InputFieldWrap>
        <S.SubmitBtn>완료</S.SubmitBtn>
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
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Container: styled.section`
    position: relative;
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
    width: 100%;
    margin-bottom: 2.5rem;
    & > * {
      margin-bottom: 1rem;
    }
  `,
  Error: styled.div`
    color: var(--color-alert-red);
    font-size: var(--text-s);
    padding: 0 1rem;
    margin-top: 0.75rem;
  `,
};

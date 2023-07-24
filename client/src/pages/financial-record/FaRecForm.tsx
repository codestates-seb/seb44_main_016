import { FormEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import CommonStyles from '../../styles/CommonStyles';
import useInput from '../../hooks/useComponents';
import { useImgCrop } from '../../hooks/useImgCrop';
import { handleFileChange } from '../../components/img-crop/imgCropUtils';
import ImgCropModal from '../../components/img-crop/ImgCropModal';
import { APIfinancialRecord } from '../../services/apiFinancial';
import InputField from '../../components/InputField';
import { getRandomImageUrl } from '../../utils/randomImg';
import { RANDOM_IMG_URLS } from '../../constants/faRecImgUrls';
import { FAREC_MESSAGES } from '../../constants/faRec';
import { useRefusalAni, isClickedStyled, SubmitBoxProps } from '../../hooks/useRefusalAni';
import ImgBox from './ImgBox';

type PageType = 'create' | 'edit';

interface FaRecFormProps {
  pageType: PageType;
  financialRecordId?: number;
  initialFaRecName?: string;
  initialFaRecDesc?: string;
  initialImage?: string;
}

type InputData = {
  id: string;
  name: string;
};

type dataObject = {
  financialRecordName: string;
  memo: string;
  financialRecordId?: number;
};
export default function FaRecForm({
  pageType,
  financialRecordId,
  initialFaRecName,
  initialFaRecDesc,
  initialImage,
}: FaRecFormProps) {
  const router = useRouter();
  const inputData: InputData[] = [
    { id: 'faName', name: '가계부 이름' },
    { id: 'faDesc', name: '가계부 설명' },
  ];
  const [nameInput, faRecName, setFaRecName] = useInput('text', inputData[0].name, inputData[0].id, 'on');
  const [descInput, faRecDesc, setFaRecDesc] = useInput('text', inputData[1].name, inputData[1].id, 'on');

  const [errors, setErrors] = useState({
    faRecName: '',
    faRecDesc: '',
  });

  const [randomImg, setRandomImg] = useState<string>('');
  const [isClickedProps, RefusalAnimation] = useRefusalAni();
  useEffect(() => {
    setRandomImg(getRandomImageUrl(RANDOM_IMG_URLS));
  }, []);

  // edit일 경우 value 전달
  useEffect(() => {
    setFaRecName(initialFaRecName || '');
    setFaRecDesc(initialFaRecDesc || '');
  }, [initialFaRecName, initialFaRecDesc, setFaRecName, setFaRecDesc]);

  const { imgSrc, setImgSrc, croppedImage, setCroppedImage, cropModal, setCropModal } = useImgCrop();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileChange({
      e,
      setCropModal,
      setImgSrc,
    });
  };

  const { mutate } = useMutation(
    pageType === 'create'
      ? APIfinancialRecord.createFaRec
      : (formData: FormData) => {
          if (financialRecordId === undefined) {
            return Promise.reject(new Error('financialRecordId is undefined'));
          }
          return APIfinancialRecord.updateFaRec(formData, financialRecordId);
        },
    {
      onSuccess: () => {
        const successMessage =
          pageType === 'create'
            ? `${FAREC_MESSAGES.FAREC_CREATE_SUCCESS}`
            : `${FAREC_MESSAGES.FAREC_UPDATE_SUCCESS}`;
        toast.success(successMessage);
        router.push(`/financial-record`);
      },
      onError: () => {
        const errorMessage =
          pageType === 'create'
            ? `${FAREC_MESSAGES.FAREC_CREATE_FAIL}`
            : `${FAREC_MESSAGES.FAREC_UPDATE_FAIL}`;
        toast.error(errorMessage);
      },
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      faRecName: faRecName ? '' : `${FAREC_MESSAGES.FAREC_NAME_GUILD}`,
      faRecDesc: faRecDesc ? '' : `${FAREC_MESSAGES.FAREC_DESC_GUILD}`,
    };

    setErrors(newErrors);

    if (newErrors.faRecName || newErrors.faRecDesc) {
      RefusalAnimation();
      return;
    }

    const formData = new FormData();
    const dataObject: dataObject = {
      financialRecordName: faRecName || '',
      memo: faRecDesc || '',
    };
    if (pageType === 'edit') {
      dataObject.financialRecordId = financialRecordId;
    }
    formData.append('data', JSON.stringify(dataObject));
    const imgFile = new Blob([croppedImage || initialImage || randomImg], {
      type: 'image/*',
    });
    formData.append('file', imgFile);

    mutate(formData);
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Container>
        <ImgBox
          croppedImage={croppedImage}
          initialImage={initialImage}
          faRecName={faRecName}
          initialFaRecName={initialFaRecName}
          randomImg={randomImg}
          onFileChange={onFileChange}
        />
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
          <InputField
            inputComponent={nameInput}
            error={errors.faRecName}
            label={inputData[0].name}
            id={inputData[0].id}
          />
          <InputField
            inputComponent={descInput}
            error={errors.faRecDesc}
            label={inputData[1].name}
            id={inputData[1].id}
          />
        </S.InputFieldWrap>
        <S.SubmitBox {...isClickedProps}>
          <S.SubmitBtn>완료</S.SubmitBtn>
        </S.SubmitBox>
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
  Container: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 516px;
    width: 100%;
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

  InputFieldWrap: styled.div`
    width: 100%;
    margin-bottom: 2.5rem;
    & > * {
      margin-bottom: 1rem;
    }
  `,
  SubmitBox: styled.div<SubmitBoxProps>`
    ${isClickedStyled}
  `,
};

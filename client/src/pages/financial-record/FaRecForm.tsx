import styled from '@emotion/styled';
import CommonStyles from '../../styles/CommonStyles';
import useInput from '../../hooks/useComponents';
import PlusIcon from '../../../public/images/icon/plus.svg';
import { FormEvent, useState } from 'react';
import axios from 'axios';

export default function FaRecForm() {
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
  const [img, setImg] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;
    if (e.target.files?.length) {
      file = e.target.files[0];
    }

    const reader = new FileReader();

    reader.onloadend = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setImg(e.target.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImg('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('financialRecordName', faRecName || '');
    formData.append('financialRecordDescription', faRecDesc || '');
    formData.append('imgId', img);
    /**
     *  아직 userId 받아오지 못해 테스트 아이디 입력. 추후 수정 예정
     */
    formData.append('userId', 'test');

    axios
      .post('/api/financial-record/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('response-data', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Container>
        <S.ImgBox>
          <img
            src={
              img ||
              'https://blog.kakaocdn.net/dn/bY6iW4/btrEJwN3Zrf/SqQZ605snSkSqP5U96S3AK/img.png'
            }
            alt=''
          />
          <S.FileInput
            type='file'
            id='addFaRecImg'
            accept='image/*'
            onChange={handleImageUpload}
          />
          <S.FileLabelBtn htmlFor='addFaRecImg' aria-label='사진 추가하기 버튼'>
            <PlusIcon />
          </S.FileLabelBtn>
        </S.ImgBox>
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

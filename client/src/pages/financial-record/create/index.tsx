import React from 'react';
import FaRecForm from '../FaRecForm';
import CommonStyles from '../../../styles/CommonStyles';

export default function FaCreatePage() {
  return (
    <>
      <S.BlindTitle>가계부 추가 페이지</S.BlindTitle>
      <FaRecForm />
    </>
  );
}

const S = {
  ...CommonStyles,
};

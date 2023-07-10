import styled from '@emotion/styled';
import PlusIcon from '../../../public/images/icon/plus.svg';

export default function FilePlusLabel() {
  return (
    <S.FileLabelBtn htmlFor='addFaRecImg' aria-label='사진 추가하기 버튼'>
      <PlusIcon />
    </S.FileLabelBtn>
  );
}

const S = {
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
};

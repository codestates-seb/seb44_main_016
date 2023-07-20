import styled from '@emotion/styled';
import SVGs from '../constants/svg';

type Props = {
  htmlFor: string;
};
export default function FilePlusLabel({ htmlFor }: Props) {
  return (
    <S.FileLabelBtn htmlFor={htmlFor} aria-label='사진 추가하기 버튼'>
      {SVGs.plus}
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

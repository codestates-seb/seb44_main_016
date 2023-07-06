import styled from '@emotion/styled';
import CommonStyles from '../../styles/CommonStyles';

export default function create() {
  return (
    <div>
      만드는페이지
      <S.PlusBtn aria-label='사진 추가하기 버튼'></S.PlusBtn>
    </div>
  );
}

const S = {
  ...CommonStyles,
  ImgBox: styled.div`
    width: 12.7rem;
    height: 12.7rem;
    border-radius: 100%;
  `,
  PlusBtn: styled.button`
    width: 100px;
  `,
};

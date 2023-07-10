import styled from '@emotion/styled';
import Link from 'next/link';
import CommonStyles from '../../../../styles/CommonStyles';

export default function RecordHeader() {
  return (
    <S.Container>
      <S.ImgBox>
        <img src='' alt='' />
      </S.ImgBox>
      <S.ContentBox>
        <div>
          <S.FaRecName>가계부 이름</S.FaRecName>
          <Link href='/'>가계부 편집</Link>
          <Link href='/'>가계부 작성</Link>
        </div>
        <div></div>
        <div></div>
      </S.ContentBox>
    </S.Container>
  );
}

const S = {
  ...CommonStyles,
  Container: styled.section`
    display: flex;
    width: 100%;
    align-items: center;
  `,

  ImgBox: styled.div`
    width: 9.375rem;
    height: 9.375rem;
    border-radius: var(--rounded-full);
    object-fit: cover;
  `,
  ContentBox: styled.div`
    flex: 1;
    margin-left: 2.8rem;
    display: flex;
    flex-direction: column;

    & > div {
      display: flex;
    }
  `,
  FaRecName: styled.h2`
    color: var(--color-gray01);
    font-weight: bold;
    font-size: var(--font-m);
  `,
};

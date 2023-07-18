import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import CommonStyles from '../styles/CommonStyles';
import BackBtn from '../../public/images/icon/back2.svg';

export default function BackBtnBox() {
  const router = useRouter();

  return (
    <S.BackBox>
      <button type='button' aria-label='뒤로 가기' onClick={() => router.back()}>
        <BackBtn width='25' fill='#b8b7c2' aria-hidden={true} />
      </button>
    </S.BackBox>
  );
}

const S = {
  ...CommonStyles,
  BackBox: styled.div`
    display: flex;
    padding-left: 1rem;
    position: absolute;
    top: 6.5%;
  `,
};

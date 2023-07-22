import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import CommonStyles from '../styles/CommonStyles';
import BackBtnIcon from '../../public/images/icon/back2.svg';
import { useAppDispatch } from './redux/hooks';
import { changeImgSrc } from './redux/currentImgReducer';

export default function BackBtn() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleBackBtnClick = () => {
    dispatch(changeImgSrc({ currentImgSrc: '', isAvatar: false }));
    router.back();
  };

  return (
    <S.BackBox>
      <button type='button' aria-label='뒤로 가기' onClick={handleBackBtnClick}>
        <BackBtnIcon width='25' fill='#b8b7c2' aria-hidden={true} />
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

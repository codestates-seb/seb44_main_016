import styled from '@emotion/styled';
import Lottie from 'react-lottie-player';
import loadingAnimation from '../animation/loading.json';

export default function Loading() {
  return (
    <S.Container>
      <Lottie loop animationData={loadingAnimation} play style={{ width: 160, height: 160 }} />{' '}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `,
};

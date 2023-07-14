import React from 'react'; // useState 사용
import styled from '@emotion/styled';

import CommonStyles from '../styles/CommonStyles';
import useRangeNumber from '../hooks/useRangeNumber';
import svgs from '../constants/svg';

type Props = {
  imgId: string[];
  width: string;
  height: string;
  rank?: number;
};

export default function ImgsCarousel(props: Props) {
  const [isStart, isEnd, currentNum, setCurrentNum] = useRangeNumber(0, props.imgId.length - 1); // 이미지 인덱스에 사용

  return (
    <S.ImgContainer style={{ height: props.height }}>
      {props.rank && (
        <S.RankIndicator>
          <S.RankText>{`${props.rank}위`}</S.RankText>
        </S.RankIndicator>
      )}
      <S.ImgsCarousel
        style={{
          transform: `translateX(calc(${props.width} * ${currentNum * -1}))`,
        }}
      >
        {props.imgId.map((imgSrc, i) => {
          return (
            <S.ImgBox key={i} style={{ width: props.width }}>
              <S.Img src={imgSrc} alt={`사용자가 올린 ${i + 1}번째 사진`} />
            </S.ImgBox>
          );
        })}
      </S.ImgsCarousel>
      {!isStart && (
        <S.ImgSlideBtn position={'left'} onClick={() => setCurrentNum(currentNum - 1)}>
          {svgs.slideLeft}
        </S.ImgSlideBtn>
      )}
      {!isEnd && (
        <S.ImgSlideBtn position={'right'} onClick={() => setCurrentNum(currentNum + 1)}>
          {svgs.slideRight}
        </S.ImgSlideBtn>
      )}
    </S.ImgContainer>
  );
}

const S = {
  ...CommonStyles,
  ImgContainer: styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: #ec4899;
  `,
  ImgsCarousel: styled.ol`
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    transition: all 0.5s;
  `,
  ImgBox: styled.li`
    height: 100%;
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  ImgSlideBtn: styled.button<{ position: 'left' | 'right' }>`
    position: absolute;
    top: 50%;
    left: ${(props) => (props.position === 'left' ? '5%' : '95%')};
    transform: translate(-50%, -50%);
    z-index: 997;
  `,

  RankIndicator: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
    display: flex;
    justify-content: end;
    align-items: end;
    padding-right: 3rem;
    padding-bottom: 2rem;
    z-index: 996;
  `,
  RankText: styled.h2`
    font-size: 3rem;
    color: white;
    border-bottom: 0.3rem solid white;
  `,
};

import React from 'react'; // useState 사용
import styled from '@emotion/styled';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation';

import CommonStyles from '../styles/CommonStyles';

type Props = {
  imgId: string[];
  width: string;
  // height: string;
  rank?: number;
};

export default function ImgsCarousel(props: Props) {
  return (
    <S.ImgContainer>
      {props.rank && (
        <S.RankIndicator>
          <S.RankText>{`${props.rank}위`}</S.RankText>
        </S.RankIndicator>
      )}
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
      >
        <S.ImgSlideBtn className='swiper-button-next' type='button' />
        <S.ImgSlideBtn className='swiper-button-prev' type='button' />
        {props.imgId.map((imgSrc, i) => {
          return (
            <SwiperSlide key={i}>
              <S.Img src={imgSrc} alt={`사용자가 올린 ${i + 1}번째 사진`} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </S.ImgContainer>
  );
}

const S = {
  ...CommonStyles,
  ImgContainer: styled.div`
    position: relative;
    width: 100%;
    height: var(--imgcarousel-h);
    overflow: hidden;
    background-color: #f8f9fc;
    & .swiper-initialized {
      height: 100%;
    }
    & .swiper-slide {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & .swiper-slide {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  ImgSlideBtn: styled.button`
    color: white;
    filter: drop-shadow(0px 1px 2px black); // 그림자
    &.swiper-button-disabled {
      visibility: hidden;
    }
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
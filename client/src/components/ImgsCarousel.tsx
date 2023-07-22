import React, { useState } from 'react'; // useState 사용
import styled from '@emotion/styled';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import CommonStyles from '../styles/CommonStyles';
import SVGs from '../constants/svg';
import { useWindowType } from '../hooks/useWindowSize';

type Props = {
  imgPath: string[];
  width: string;
  // height: string;
  rank?: number;
};

export default function ImgsCarousel(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 상태
  const [modalImage, setModalImage] = useState(''); // 모달에 보여질 이미지
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleImageClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    imgSrc: string,
    index: number
  ) => {
    e.stopPropagation();
    setIsModalVisible(true);
    setModalImage(imgSrc);
    setCurrentSlide(index);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setModalImage('');
  };
  const windowType = useWindowType();

  return (
    <S.ImgContainer className={windowType}>
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
        {props.imgPath.map((imgSrc, i) => {
          return (
            <SwiperSlide key={i}>
              <S.Img
                src={imgSrc}
                alt={`사용자가 올린 ${i + 1}번째 사진`}
                onClick={(e) => handleImageClick(e, imgSrc, i)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {isModalVisible ? (
        <S.Modal>
          <S.CloseBtn aria-label='닫기 버튼' onClick={handleCloseModal}>
            {SVGs.whiteCloseBtn}
          </S.CloseBtn>

          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            initialSlide={currentSlide}
          >
            <S.ImgSlideBtn className='swiper-button-next modal' type='button' />
            <S.ImgSlideBtn className='swiper-button-prev modal' type='button' />
            {props.imgPath.map((imgSrc, i) => {
              return (
                <SwiperSlide key={i}>
                  <TransformWrapper initialScale={1} minScale={1} maxScale={10}>
                    <TransformComponent>
                      <S.ModalImage src={imgSrc} alt={`사용자가 올린 ${i + 1}번째 사진`} />
                    </TransformComponent>
                  </TransformWrapper>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </S.Modal>
      ) : (
        <></>
      )}
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
    border-bottom: 0.05rem solid var(--color-gray08);

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
    &.mobile {
      height: 70vw;
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
    &.modal.swiper-button-next {
      right: 23px;
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
    z-index: 9999;
  `,
  RankText: styled.h2`
    font-size: 3rem;
    color: white;
    border-bottom: 0.3rem solid white;
  `,
  Modal: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;

    display: flex;
    justify-content: center;
    align-items: center;
  `,

  ModalImage: styled.img`
    max-width: 100vw;
    max-height: 100vh;
  `,
  CloseBtn: styled.button`
    position: absolute;
    top: 1rem;
    right: 2rem;
    width: 2rem;
    height: 2rem;
    z-index: 1000;
    transition-duration: 0.3s;
    & > svg {
      width: 100%;
      height: 100%;
      color: #fff;
    }
    &:active {
      transform: scale(0.95);
    }
  `,
};

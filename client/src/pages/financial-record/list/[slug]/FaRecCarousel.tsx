import styled from '@emotion/styled';

type FaRecCarouselProps = {
  imgId: string[];
  title: string;
};

// 임시 FaRecCarousel

export default function FaRecCarousel({ imgId, title }: FaRecCarouselProps) {
  return (
    <S.Container>
      <ol>
        {imgId.map((el, i) => {
          return (
            <li key={i}>
              {' '}
              <img src={el} alt={`${title} ${i}번째 사진`} />
            </li>
          );
        })}
      </ol>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    height: 30rem;
    & > ol {
      display: flex;
      width: 100%;
      height: 100%;
      & > li {
        width: 100%;
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  `,
};

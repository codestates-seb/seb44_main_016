import styled from '@emotion/styled';

export default function FaRecCarousel() {
  return (
    <S.Container>
      <img
        src='https://images.unsplash.com/photo-1563612116625-3012372fccce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=741&q=80'
        alt=''
      />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    height: 30rem;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
};

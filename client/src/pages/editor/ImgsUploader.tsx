import React from 'react';
import styled from '@emotion/styled';

import ImgBox from './ImgBox';

export default function ImgsUploader() {
  return (
    <S.ImgsUploaderContainer>
      <S.ImgsUploaderLegend>이미지</S.ImgsUploaderLegend>
      <S.Imgs>
        <ImgBox id={0} />
        <ImgBox id={1} />
        <ImgBox id={2} />
        <ImgBox id={3} />
      </S.Imgs>
    </S.ImgsUploaderContainer>
  );
}

const S = {
  ImgsUploaderContainer: styled.fieldset`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
  `,
  ImgsUploaderLegend: styled.legend`
    padding-bottom: 0.5rem;
    font-weight: bold;
  `,

  Imgs: styled.div`
    width: fit-content;
    display: flex;
    gap: 1.25rem;
    flex-wrap: wrap;
  `,
};

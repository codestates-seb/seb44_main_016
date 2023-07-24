import React from 'react';
import styled from '@emotion/styled';

import ImgBox from './ImgBox';

type Props = {
  setImgSrcs: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ImgsUploader(props: Props) {
  return (
    <S.ImgsUploaderContainer>
      <S.ImgsUploaderLegend>이미지</S.ImgsUploaderLegend>
      <S.Imgs>
        <ImgBox id={0} setImgSrcs={props.setImgSrcs} />
        <ImgBox id={1} setImgSrcs={props.setImgSrcs} />
        <ImgBox id={2} setImgSrcs={props.setImgSrcs} />
        <ImgBox id={3} setImgSrcs={props.setImgSrcs} />
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

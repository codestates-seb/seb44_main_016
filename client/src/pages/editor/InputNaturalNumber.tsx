import React from 'react';
import styled from '@emotion/styled';

import CommonStyles from '../../styles/CommonStyles';

type Props = {
  legend: string;
  num: number;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputPrice(props: Props) {
  return (
    <S.InputPriceContainer>
      <S.InputPriceLegend>{props.legend}</S.InputPriceLegend>
      <S.InputText // InputNumber
        type='number'
        name='price'
        placeholder='금액을 입력하세요'
        min='0'
        value={props.num}
        onInput={props.handler}
        onChange={props.handler}
      />
    </S.InputPriceContainer>
  );
}

const S = {
  ...CommonStyles,
  InputPriceContainer: styled.fieldset`
    width: 100%;
  `,
  InputPriceLegend: styled.legend`
    padding-bottom: 0.5rem;
    font-weight: bold;
  `,
};

import React from 'react';
import styled from '@emotion/styled';

import CommonStyles from '../../styles/CommonStyles';

type Props = {
  legend: string;
  num: number;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputNaturalNumber(props: Props) {
  return (
    <S.InputNaturalNumberContainer>
      <S.InputNaturalNumberLegend>{props.legend}</S.InputNaturalNumberLegend>
      <S.InputText // InputNumber
        type='number'
        name='price'
        placeholder='금액을 입력하세요'
        min='0'
        step='100'
        value={props.num}
        onInput={props.handler}
        onChange={props.handler}
      />
    </S.InputNaturalNumberContainer>
  );
}

const S = {
  ...CommonStyles,
  InputNaturalNumberContainer: styled.fieldset`
    width: 100%;
  `,
  InputNaturalNumberLegend: styled.legend`
    padding-bottom: 0.5rem;
    font-weight: bold;
  `,
};

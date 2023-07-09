import React from 'react';
import styled from '@emotion/styled';

import CommonStyles from '../../styles/CommonStyles';

type Props = {
  legend: string;
  options: string[];
  checkValue: number;
  handler: (id: number) => void;
  isCenter?: boolean;
};

export default function RadioSet(props: Props) {
  return (
    <S.RadioSetContainer>
      <S.RadioSetLegend>{props.legend}</S.RadioSetLegend>
      <S.RadioSetContainer>
        {props.options.map((optionName, i) => (
          <S.RadioBtnLabel key={i}>
            <S.RadioBtn
              type='radio'
              value={i}
              checked={props.checkValue === i}
              onChange={() => props.handler(i)}
            />
            {optionName}
          </S.RadioBtnLabel>
        ))}
      </S.RadioSetContainer>
    </S.RadioSetContainer>
  );
}

const S = {
  ...CommonStyles,
  RadioSetContainer: styled.fieldset`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
  `,
  RadioSetLegend: styled.legend`
    padding-bottom: 0.5rem;
    font-weight: bold;
  `,
};

/*
  // RadioButtonsContainer
  background-color: rgba(255, 255, 255);
  border-radius: var(--rounded-full);
  width: 100%;
  padding: 1rem;
  color: var(--color-gray01);
  border: 1px solid var(--color-border-gray);
*/

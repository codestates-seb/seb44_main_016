import React from 'react';
import styled from '@emotion/styled';

import CommonStyles from '../../styles/CommonStyles';

type Props = {
  legend: string;
  options: string[];
  handler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

export default function SelectOption(props: Props) {
  // 에러 방지: Hydration failed because the initial UI does not match what was rendered on the server.
  const [DOMs, setDOMs] = React.useState(<span>로딩 중</span>);

  React.useEffect(() => {
    setDOMs(
      <S.SelectOptionContainer>
        <S.SelectOptionLegend>{props.legend}</S.SelectOptionLegend>
        <S.Select onChange={props.handler} disabled={props.disabled}>
          {props.options.map((optionName, i) => {
            return (
              <S.Option key={i} value={i}>
                {optionName}
              </S.Option>
            );
          })}
        </S.Select>
      </S.SelectOptionContainer>
    );
  }, []);

  return DOMs;
}

const S = {
  ...CommonStyles,
  SelectOptionContainer: styled.fieldset`
    width: 100%;
  `,
  SelectOptionLegend: styled.legend``,

  Select: styled.select`
    background-color: white;
    border-radius: 100px;
    width: 100%;
    padding: 1rem;
    color: var(--color-gray01);
    border: 1px solid var(--color-border-gray);
    &:placeholder {
      color: var(--color-gray07);
    }
    &:focus {
      outline: 1px solid var(--color-primary);
    }
  `,
  Option: styled.option``,
};

import React from 'react';
import styled from '@emotion/styled';

import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import CommonStyles from '../../styles/CommonStyles';

type Props = {
  legend: string;
  selected: Date; // faDate
  handler: (date: Date) => void;
};

export default function StyledDatePicker(props: Props) {
  return (
    <S.StyledDatePickerContainer>
      <S.StyledDatePickerLegend>날짜</S.StyledDatePickerLegend>
      <S.DatePicker
        locale={ko}
        dateFormat='yyyy년 M월 d일 HH:mm'
        dateFormatCalendar='yyyy년 M월'
        timeFormat='HH:mm'
        selected={props.selected} // faDate
        onChange={props.handler}
        showTimeInput
      />
    </S.StyledDatePickerContainer>
  );
}

const S = {
  ...CommonStyles,
  StyledDatePickerContainer: styled.fieldset`
    width: 100%;
  `,
  StyledDatePickerLegend: styled.legend`
    padding-bottom: 0.5rem;
    font-weight: bold;
  `,

  DatePicker: styled(DatePicker)`
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
    &:has(.react-datepicker-wrapper) {
      width: 100%;
    }
  `,
};

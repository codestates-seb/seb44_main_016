import React from 'react';
import styled from '@emotion/styled';
import { UserInputLabel } from '../../../types/user';

interface InputFieldProps {
  label: UserInputLabel;
  guide: string;
  component: React.ReactNode;
  error: string;
}

export default function InputField({ label, guide, component, error }: InputFieldProps) {
  return (
    <S.InputBox key={label?.text || ''}>
      <S.LabelBox>
        <S.Label htmlFor={label?.htmlFor || ''}>{label?.text || ''}</S.Label>
        <S.Guide htmlFor={label?.htmlFor || ''}>{guide}</S.Guide>
      </S.LabelBox>
      <S.InputField>{component}</S.InputField>
      <S.Error htmlFor={label?.htmlFor || ''}>{error} </S.Error>
    </S.InputBox>
  );
}

const S = {
  InputField: styled.div`
    margin: 0.5rem 0;
  `,
  Error: styled.label`
    padding-left: 0.5rem;
    font-size: 0.98rem;
    color: var(--color-error-red);
  `,
  InputBox: styled.div`
    width: 51%;
  `,
  LabelBox: styled.div`
    margin-top: 1rem;
  `,
  Label: styled.label`
    font-weight: 600;
    font-size: 1rem;
    display: inline-block;
  `,
  Guide: styled.label`
    font-size: 0.94rem;
    color: var(--color-point-gray);
    display: inline-block;
    margin: 1rem 0 0 0.7rem;
  `,
};

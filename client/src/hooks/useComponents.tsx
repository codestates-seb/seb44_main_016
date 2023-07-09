import React, { useState, useCallback, ChangeEvent, MouseEvent } from 'react';
import CommonStyles from '../styles/CommonStyles';
import styled from '@emotion/styled';

type UseInputReturnType = [
  React.ReactNode,
  string | null,
  (value: string | null) => void
];

type UseCheckBoxReturnType = [
  React.ReactNode,
  boolean,
  (value: boolean) => void
];

export default function useInput(
  type: string,
  placeholder: string,
  label: string
): UseInputReturnType {
  const [value, setValue] = useState<string | null>(null);

  const Component = useCallback(() => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const autoCompleteValue =
      type === 'password'
        ? 'new-password'
        : type === 'text'
        ? 'username'
        : undefined;

    const inputProps = {
      type,
      value: value || '',
      onChange: handleChange,
      placeholder,
      id: label,
      autoComplete: autoCompleteValue,
    };

    return <S.InputText {...inputProps} />;
  }, [value]);

  return [Component(), value, setValue];
}

export function useCheckboxInput(
  type: string,
  label: string
): UseCheckBoxReturnType {
  const [isChecked, setIsChecked] = useState(false);

  const Component = useCallback(() => {
    const handleClick = (e: MouseEvent<HTMLInputElement>) => {
      setIsChecked((prev) => !prev);
    };

    const inputProps = {
      type,
      id: label,
      onClick: handleClick,
    };
    return <S.Checkbox {...inputProps} />;
  }, [isChecked]);

  return [Component(), isChecked, setIsChecked];
}

const S = {
  ...CommonStyles,

  Checkbox: styled.input`
    appearance: none;
    border: 1.5px solid var(--color-border-gray);
    border-radius: 0.35rem;
    width: 1.4rem;
    height: 1.4rem;
    cursor: pointer;
    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-color: var(--color-point-lilac);
    }
  `,
};

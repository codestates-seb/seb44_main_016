import React, { useState, useCallback, MouseEvent, ChangeEvent } from 'react';
import CommonStyles from '../styles/CommonStyles';
import styled from '@emotion/styled';
import ShowIcon from '../../public/images/icon/show.svg';
import HideIcon from '../../public/images/icon/hide.svg';

type UseInputReturnType = [React.ReactNode, string | null, (value: string | null) => void];
type UseCheckBoxReturnType = [React.ReactNode, boolean, (value: boolean) => void];

export default function useInput(
  type: string,
  placeholder: string,
  label: string,
  autoCompleteValue: string
): UseInputReturnType {
  const [value, setValue] = useState<string | null>(null);

  const Component = useCallback(() => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const handlePasswordIcon = (e: MouseEvent) => {
      e.preventDefault();
      setShowPassword((prev) => !prev);
    };

    if (type === 'password') {
      const inputProps = {
        type: showPassword ? 'text' : 'password',
        value: value || '',
        onChange: handleChange,
        placeholder,
        id: label,
        autoComplete: 'new-password',
      };

      return (
        <S.InputBox>
          <S.InputText {...inputProps} />
          <S.IconBtn onClick={handlePasswordIcon}>{showPassword ? <HideIcon /> : <ShowIcon />}</S.IconBtn>
        </S.InputBox>
      );
    }

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

export function useCheckboxInput(type: string, label: string): UseCheckBoxReturnType {
  const [isChecked, setIsChecked] = useState(false);

  const Component = useCallback(() => {
    const handleClick = () => {
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
  InputBox: styled.div`
    position: relative;
    width: 100%;
  `,
  Checkbox: styled.input`
    appearance: none;
    border: 1.5px solid var(--color-border-gray);
    border-radius: 0.35rem;
    width: 1.4rem;
    height: 1.4rem;
    background-color: white;
    cursor: pointer;
    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-color: var(--color-point-lilac);
    }
  `,
  IconBtn: styled.button`
    z-index: 5;
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    cursor: pointer;
    transition: transform 0.3s;
    height: 100%;
    width: 3rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  InputText: styled.input`
    background-color: white;
    border-radius: 100px;
    width: 100%;
    padding: 0.875rem 1rem;
    color: var(--color-gray01);
    border: 1px solid var(--color-border-gray);
    line-height: 1;
    position: relative;
    &::placeholder {
      color: var(--color-gray07);
    }
    &:focus {
      outline: 1px solid var(--color-primary);
    }
  `,
};

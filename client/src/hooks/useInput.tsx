import React, { useState, useCallback, ChangeEvent } from 'react';
import CommonStyles from '../styles/CommonStyles';

type UseInputReturnType = [React.ReactNode, string | null];

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

    return (
      <S.InputText
        type={type}
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        id={label}
      />
    );
  }, [value]);

  return [Component(), value];
}

const S = {
  ...CommonStyles,
};

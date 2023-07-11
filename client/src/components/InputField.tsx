import styled from '@emotion/styled';

type FieldType = {
  inputComponent: React.ReactNode;
  error: string;
  label: string;
  id: string;
};

export default function InputField({
  inputComponent,
  error,
  label,
  id,
}: FieldType) {
  return (
    <fieldset>
      <S.Label htmlFor={id}>{label}</S.Label>
      {inputComponent}
      {error && <S.Error>{error}</S.Error>}
    </fieldset>
  );
}

const S = {
  Label: styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  `,
  Error: styled.div`
    color: var(--color-error-red);
    font-size: var(--text-s);
    padding: 0 1rem;
    margin-top: 0.75rem;
  `,
};

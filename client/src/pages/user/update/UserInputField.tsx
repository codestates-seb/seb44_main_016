import styled from '@emotion/styled';
import { UserInputLabel } from '../../../types/user';

interface InputFieldProps {
  label: UserInputLabel;
  guide: string | undefined;
  component: React.ReactNode;
  error: string | undefined;
}

export default function UserInputField({ label, guide, component, error }: InputFieldProps) {
  return (
    <S.InputBox key={label?.text || ''}>
      <S.LabelBox>
        <S.Label htmlFor={label?.htmlFor || ''}>{label?.text || ''}</S.Label>
        <S.Guide htmlFor={label?.htmlFor || ''}>{guide}</S.Guide>
      </S.LabelBox>
      <S.InputField>{component}</S.InputField>
      <S.ErrorBox>
        <S.Error htmlFor={label?.htmlFor || ''}>{error} </S.Error>
      </S.ErrorBox>
    </S.InputBox>
  );
}

const S = {
  InputField: styled.div`
    margin: 0.5rem 0;
  `,
  ErrorBox: styled.div`
    margin-left: 1rem;
  `,
  Error: styled.label`
    font-size: 0.98rem;
    color: var(--color-error-red);
    border: 1px solid transparent;
  `,
  InputBox: styled.div`
    width: 51%;
    @media screen and (max-width: 900px) {
      width: 44%;
    }
    @media screen and (max-width: 750px) {
      width: 51%;
    }
    @media screen and (max-width: 500px) {
      width: 70%;
    }
    @media screen and (max-width: 350px) {
      width: 90%;
    }
  `,
  LabelBox: styled.div`
    margin-top: 1rem;
    @media screen and (max-width: 750px) {
      display: flex;
      flex-direction: column;
    }
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

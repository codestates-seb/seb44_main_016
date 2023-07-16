import styled from '@emotion/styled';
import CommonStyles from '../../../styles/CommonStyles';
import { UserInput } from '../../../types/user';

interface DeleteInputFormProps {
  el: UserInput;
}

export default function DeleteInputForm({ el }: DeleteInputFormProps) {
  return (
    <S.InputBox key={el.label.text}>
      <S.LabelBox>
        <S.Label htmlFor={el.label.htmlFor}>{el.label.text}</S.Label>
      </S.LabelBox>
      <S.InputField>{el.component}</S.InputField>
      <S.Error htmlFor={el.label.htmlFor}>{el.error}</S.Error>
    </S.InputBox>
  );
}

const S = {
  ...CommonStyles,
  InputField: styled.div`
    margin: 0.5rem 0;
  `,
  Error: styled.label`
    padding-left: 20px;
    font-size: 0.98rem;
    margin-top: 8px;
    color: var(--color-error-red);
  `,
  InputBox: styled.div`
    width: 53%;
  `,
  LabelBox: styled.div`
    margin-bottom: 0.7rem;
  `,
  Label: styled.label`
    font-weight: 600;
    font-size: 1rem;
    display: inline-block;
    margin: 2rem 0 0 0rem;
    font-weight: 600;
    font-size: 1.07rem;
  `,
};

import styled from '@emotion/styled';
import CommonStyles from '../../../styles/CommonStyles';
import { UserInput } from '../../../types/user';

interface UpdateInputFormProps {
  el: UserInput;
}

export default function UpdateInputForm({ el }: UpdateInputFormProps) {
  return (
    <S.InputBox>
      <S.LabelBox>
        <S.Label htmlFor={el.label.htmlFor}>{el.label.text}</S.Label>
        <S.Guide htmlFor={el.label.htmlFor}>{el.guide}</S.Guide>
      </S.LabelBox>
      <S.InputField>{el.component}</S.InputField>
      <S.Error htmlFor={el.label.htmlFor}>{el.error} </S.Error>
    </S.InputBox>
  );
}

const S = {
  ...CommonStyles,
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

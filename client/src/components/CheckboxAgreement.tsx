import styled from '@emotion/styled';
import CommonStyles from '../styles/CommonStyles';
import useInput, { useCheckboxInput } from '../hooks/useComponents';

interface CheckboxAgreementProps {
  labelTitle: string;
  checkboxAgreement: string;
  agreementError: string;
  isBackgroundWhite: boolean;
}

export default function CheckboxAgreement({
  labelTitle,
  checkboxAgreement,
  agreementError,
  isBackgroundWhite,
}: CheckboxAgreementProps) {
  const [Checkbox, isChecked, setIsChecked] = useCheckboxInput(
    'checkbox',
    'policy'
  );
  return {
    CheckboxComponent: (
      <S.CheckboxContainer>
        <S.Policy>
          {Checkbox}
          <S.RadioBtnLabel htmlFor='policy'>{labelTitle}</S.RadioBtnLabel>
          <S.PolicyGuide htmlFor='policy'>{checkboxAgreement}</S.PolicyGuide>
        </S.Policy>
        <S.Error isBackgroundWhite={isBackgroundWhite}>
          {agreementError && agreementError}
        </S.Error>
      </S.CheckboxContainer>
    ),
    isChecked,
    setIsChecked,
  };
}

interface ErrorProps {
  isBackgroundWhite?: boolean;
}
const S = {
  ...CommonStyles,
  CheckboxContainer: styled.div`
    width: 100%;
    height: 100%;
  `,
  Policy: styled.div`
    padding: 0 0.6rem 0.1rem 0.6rem;
    display: flex;
    align-items: center;
  `,
  RadioBtnLabel: styled.label`
    font-weight: 600;
    margin-left: 0.6rem;
  `,
  PolicyGuide: styled.label`
    font-size: 0.9rem;
    color: #a4a7b5;
    margin-left: 0.7rem;
  `,
  Error: styled.div<ErrorProps>`
    padding-left: 20px;
    font-size: 0.9rem;
    margin-top: 8px;
    color: ${(props) =>
      props.isBackgroundWhite
        ? 'var(--color-point-pink)'
        : 'var(--color-point-purple)'};
  `,
};

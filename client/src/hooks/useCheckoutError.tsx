import styled from '@emotion/styled';
import CommonStyles from '../styles/CommonStyles';
import { useCheckboxInput } from './useComponents';

interface useCheckboxErrorProps {
  labelTitle: string;
  checkboxAgreement?: string;
  agreementError?: string;
  isBackgroundWhite?: boolean;
  isCentered?: boolean;
}

export default function useCheckboxError({
  labelTitle,
  checkboxAgreement,
  agreementError,
  isBackgroundWhite,
  isCentered,
}: useCheckboxErrorProps) {
  const [Checkbox, isChecked, setIsChecked] = useCheckboxInput('checkbox', labelTitle);
  return {
    CheckboxComponent: (
      <S.CheckboxContainer isCentered={isCentered}>
        <S.Policy>
          {Checkbox}
          <S.RadioBtnLabel className={checkboxAgreement ? 'guide' : ''} htmlFor={labelTitle}>
            {labelTitle}
          </S.RadioBtnLabel>
          <S.PolicyGuide htmlFor={labelTitle}>{checkboxAgreement}</S.PolicyGuide>
        </S.Policy>
        <S.ErrorBox>
          <S.Error isBackgroundWhite={isBackgroundWhite} htmlFor={labelTitle}>
            {agreementError && agreementError}
          </S.Error>
        </S.ErrorBox>
      </S.CheckboxContainer>
    ),
    isChecked,
    setIsChecked,
  };
}

interface ErrorProps {
  isBackgroundWhite?: boolean;
}
interface ContainerProps {
  isCentered?: boolean;
}
const S = {
  ...CommonStyles,
  CheckboxContainer: styled.div<ContainerProps>`
    width: ${(props) => (props.isCentered ? '' : '100%')};
    height: 100%;
  `,
  Policy: styled.div`
    padding: 0 0.6rem 0.5rem 0.6rem;
    display: flex;
    align-items: center;
  `,
  RadioBtnLabel: styled.label`
    font-weight: 600;
    margin-left: 0.8rem;
    &.guide {
      margin-left: 0.68rem;
    }
  `,
  PolicyGuide: styled.label`
    font-size: 0.9rem;
    color: var(--color-point-gray);
    margin-left: 0.7rem;
  `,
  ErrorBox: styled.div`
    padding-left: 1rem;
  `,
  Error: styled.label<ErrorProps>`
    color: ${(props) => (props.isBackgroundWhite ? 'var(--color-point-pink)' : 'var(--color-error-red)')};
    font-size: 0.98rem;
    border: 1px solid transparent;
  `,
};

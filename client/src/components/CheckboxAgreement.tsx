import styled from '@emotion/styled';
import CommonStyles from '../styles/CommonStyles';
import { useCheckboxInput } from '../hooks/useComponents';

interface CheckboxAgreementProps {
  labelTitle: string;
  checkboxAgreement?: string;
  agreementError?: string;
  isBackgroundWhite: boolean;
  isCentered?: boolean;
  hasGuide?: boolean;
}

export default function CheckboxAgreement({
  labelTitle,
  checkboxAgreement,
  agreementError,
  isBackgroundWhite,
  isCentered,
  hasGuide,
}: CheckboxAgreementProps) {
  const [Checkbox, isChecked, setIsChecked] = useCheckboxInput(
    'checkbox',
    labelTitle
  );
  return {
    CheckboxComponent: (
      <S.CheckboxContainer isCentered={isCentered}>
        <S.Policy>
          {Checkbox}
          <S.RadioBtnLabel
            className={hasGuide ? 'guide' : ''}
            htmlFor={labelTitle}
          >
            {labelTitle}
          </S.RadioBtnLabel>
          <S.PolicyGuide htmlFor={labelTitle}>
            {checkboxAgreement}
          </S.PolicyGuide>
        </S.Policy>
        <S.Error isBackgroundWhite={isBackgroundWhite}>
          <h3 className='blind'>에러 메시지</h3>
          <h4>{agreementError && agreementError}</h4>
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
    padding: 0 0.6rem 0.1rem 0.6rem;
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
    color: #a4a7b5;
    margin-left: 0.7rem;
  `,
  Error: styled.div<ErrorProps>`
    padding-left: 20px;

    margin-top: 8px;
    color: ${(props) =>
      props.isBackgroundWhite
        ? 'var(--color-point-pink)'
        : 'var(--color-error-red)'};
    h4 {
      font-size: 0.98rem;
      font-weight: 400;
    }
  `,
};

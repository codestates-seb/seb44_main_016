import styled from '@emotion/styled';
import CommonStyles from '../../../styles/CommonStyles';
import PersonalInfoLaw from './PersonalInfoLaw';

interface PolicyAgreementProps {
  CheckboxComponent: React.ReactNode;
  isSignUp: boolean;
}

export default function PolicyAgreement({ CheckboxComponent, isSignUp }: PolicyAgreementProps) {
  return (
    <S.PolicyContainer>
      <S.PolicyLabel>
        약관동의
        <span>*</span>
      </S.PolicyLabel>
      {/* {isSignUp ? <PersonalInfoLaw /> : ''} */}
      {CheckboxComponent}
    </S.PolicyContainer>
  );
}

const S = {
  ...CommonStyles,
  PolicyContainer: styled.div`
    margin: 4rem 0 1rem 0;
  `,
  PolicyLabel: styled.div`
    font-weight: 600;
    font-size: 1.13rem;
    display: inline-block;
    padding-left: 10px;
    margin-bottom: 1.3rem;
    > span {
      color: var(--color-point-pink);
      display: inline-block;
      margin-left: 0.5rem;
    }
  `,
};

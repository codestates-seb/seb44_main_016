import styled from '@emotion/styled';
import CommonStyles from '../../../styles/CommonStyles';
import SelectBox from '../../../components/SelectBox';
import { EMAIL_DOMAIN } from '../../../constants/selectItems';
import { UserInputLabel, InputData } from '../../../types/user';

interface SignUpInputFieldProps {
  i: number;
  label: UserInputLabel;
  component: React.ReactNode;
  subComponent: React.ReactNode;
  error: string | undefined;
  inputData: InputData[];
  domainValue: string;
  setDomainValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpInputField({
  i,
  label,
  component,
  subComponent,
  error,
  inputData,
  domainValue,
  setDomainValue,
}: SignUpInputFieldProps) {
  return (
    <S.InputContainer>
      <S.LabelBox>
        <S.Label htmlFor={label?.htmlFor || ''}>
          {label?.text || ''}
          <span>{label?.required && '*'}</span>
        </S.Label>
      </S.LabelBox>
      <S.EmailAddress className={i === inputData?.length - 1 ? 'email' : ''}>
        <S.InputBox className={i === inputData?.length - 1 ? 'email' : ''}>{component}</S.InputBox>
        {subComponent && (
          <S.DomainBox>
            <div>@</div>
            <SelectBox
              totalItem={EMAIL_DOMAIN}
              searchItem={domainValue}
              setSearchItem={setDomainValue}
              placeholder='직접 입력'
              ariaLabel='이메일 도메인 입력 또는 찾기'
            />
          </S.DomainBox>
        )}
      </S.EmailAddress>
      <S.ErrorBox>
        <S.Error>{error}</S.Error>
      </S.ErrorBox>
    </S.InputContainer>
  );
}

const S = {
  ...CommonStyles,
  InputContainer: styled.div`
    margin-bottom: 48px;
  `,
  LabelBox: styled.div``,
  Label: styled.label`
    font-weight: 600;
    font-size: 1.13rem;
    display: inline-block;
    margin-bottom: 10px;
    > span {
      color: var(--color-point-pink);
      display: inline-block;
      margin-left: 0.5rem;
    }
  `,
  ErrorBox: styled.div`
    margin-top: 0.5rem;
    padding-left: 1rem;
  `,
  Error: styled.label`
    color: var(--color-point-pink);
    font-size: 0.98rem;
    border: 1px solid transparent;
  `,
  InputBox: styled.div`
    &.email {
      width: 44%;
    }
  `,
  DomainBox: styled.div`
    width: 56%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    > div:first-of-type {
      color: #c4c4c4;
      margin: 0 1rem;
      font-size: 1.2rem;
    }
  `,
  EmailAddress: styled.div`
    &.email {
      display: flex;
    }
  `,
};

import styled from '@emotion/styled';
import tw from 'twin.macro';
import CommonStyles from '../../../styles/CommonStyles';
import useInput from '../../../hooks/useInput';
import { SIGN_UP_MESSAGES } from '../../../constants/signUp';

export default function SignUpForm() {
  const [IdInput, idValue] = useInput('text', '아이디', 'loginId');
  const [PwInput, pwValue] = useInput('password', '비밀번호', 'pw');
  const [PwConfirmInput, pwConfirmValue] = useInput(
    'password',
    '비밀번호 확인',
    'pwConfirm'
  );
  const [nickNameInput, nickNameValue] = useInput('text', '닉네임', 'nickname');
  const [emailInput, emailValue] = useInput('email', '이메일', 'email');
  const [domainInput, domainValue] = useInput('email', '도메인', 'domain');

  const inputData = [
    {
      label: {
        htmlFor: 'loginId',
        text: '아이디',
        required: true,
      },
      guide: SIGN_UP_MESSAGES.LOGIN_ID_GUIDE,
      component: IdInput,
      error: SIGN_UP_MESSAGES.ID_EXISTING_ERROR,
    },
    {
      label: {
        htmlFor: 'pw',
        text: '비밀번호',
        required: true,
      },
      guide: SIGN_UP_MESSAGES.PASSWORD_GUIDE,
      component: PwInput,
      error: SIGN_UP_MESSAGES.PASSWORD_FORMAT_ERROR,
    },
    {
      label: {
        htmlFor: 'pwConfirm',
        text: '비밀번호 확인',
        required: true,
      },
      component: PwConfirmInput,
      error: SIGN_UP_MESSAGES.PASSWORD_CONFIRM_ERROR,
    },
    {
      label: {
        htmlFor: 'nickname',
        text: '닉네임',
        required: true,
      },
      // guide: SIGN_UP_MESSAGES.NICKNAME_GUIDE,
      component: nickNameInput,
      error: SIGN_UP_MESSAGES.NICKNAME_EXISTING_ERROR,
    },
    {
      label: {
        htmlFor: 'email',
        text: '이메일',
        required: true,
      },
      // guide: SIGN_UP_MESSAGES.NICKNAME_GUIDE,
      component: emailInput,
      subComponent: domainInput,
      error: SIGN_UP_MESSAGES.NICKNAME_EXISTING_ERROR,
    },
  ];

  return (
    <S.FormContainer>
      <S.InputMapWrapper>
        {inputData.map((el, i) => (
          <S.InputContainer>
            <S.LabelBox>
              <S.Label htmlFor={el.label.htmlFor}>
                {el.label.text}
                <span>{el.label.required && '*'}</span>
              </S.Label>
              <S.Guide>{el.guide ? el.guide : null}</S.Guide>
            </S.LabelBox>
            <S.EmailAddress
              className={i === inputData.length - 1 ? 'email' : ''}
            >
              <S.InputBox className={i === inputData.length - 1 ? 'email' : ''}>
                {el.component}
              </S.InputBox>
              {el.subComponent && (
                <S.InputBox
                  className={i === inputData.length - 1 ? 'email' : ''}
                >
                  <div>@</div>
                  {el.subComponent}
                </S.InputBox>
              )}
            </S.EmailAddress>
            {/* <S.Error>{el.error} </S.Error> */}
          </S.InputContainer>
        ))}
      </S.InputMapWrapper>

      <S.PolicyContainer>
        <S.PolicyLabel htmlFor='라벨'>
          약관동의
          <span>*</span>
        </S.PolicyLabel>
        <S.Policy>
          <S.RadioBtn id='policy' />
          <S.RadioBtnLabel htmlFor='policy'>전체동의</S.RadioBtnLabel>
          <S.PolicyGuide htmlFor='policy'>
            {SIGN_UP_MESSAGES.POLICY_GUIDE}
          </S.PolicyGuide>
        </S.Policy>
      </S.PolicyContainer>

      <S.SubmitBtn large>회원가입</S.SubmitBtn>
    </S.FormContainer>
  );
}

const S = {
  ...CommonStyles,
  FormContainer: styled.div`
    width: 45%;
    height: 1000px;
    padding: 8px;
    margin-top: 20px;
  `,
  InputContainer: styled.div`
    margin-bottom: 48px;
  `,
  InputMapWrapper: styled.div``,
  LabelBox: styled.div`
    padding-left: 10px;
  `,
  Label: styled.label`
    font-weight: 700;
    font-size: 1.13rem;
    display: inline-block;
    margin-bottom: 10px;
    > span {
      color: #e483b0;
      display: inline-block;
      margin-left: 0.5rem;
    }
  `,
  Guide: styled.div`
    font-size: 1rem;
    color: #a4a7b5;
    margin-bottom: 14px;
  `,
  Error: styled.div`
    padding-left: 20px;
    font-size: 0.9rem;
    margin-top: 8px;
    color: #e483b0;
  `,
  PolicyContainer: styled.div`
    margin: 5rem 0 1rem 0;
  `,
  Policy: styled.div`
    ${tw`bg-white flex items-center rounded-full w-full px-3 py-4  text-fontColor-gray01 placeholder:text-fontColor-gray07 focus:outline-primary `}
  `,
  PolicyLabel: styled.label`
    font-weight: 700;
    font-size: 1.13rem;
    display: inline-block;
    margin-bottom: 10px;
    padding-left: 10px;
    > span {
      color: #e483b0;
      display: inline-block;
      margin-left: 0.5rem;
    }
  `,
  PolicyGuide: styled.label`
    font-size: 0.9rem;
    color: #a4a7b5;
    margin-left: 0.7rem;
  `,
  RadioBtnLabel: styled.label`
    font-weight: 600;
    margin-left: 0.3rem;
  `,
  InputBox: styled.div`
    &.email {
      width: 44%;
    }
    &.email:nth-child(2) {
      width: 59%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > div:first-child {
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

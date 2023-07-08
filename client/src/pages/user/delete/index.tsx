import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import { useState } from 'react';
import CommonStyles from '../../../styles/CommonStyles';
import useInput from '../../../hooks/useComponents';
import Image from 'next/image';
import { USER_DELETE_MESSAGES } from '../../../constants/user';
import BackBtn from '../../../../public/image/back2.svg';
import CheckboxAgreement from '../../../components/CheckboxAgreement';

export default function UserUpdate() {
  const router = useRouter();
  const [PwInput, pwValue, setPwValue] = useInput('password', '비밀번호', 'pw');
  const [PwConfirmInput, password, setPassword] = useInput(
    'password',
    '비밀번호 확인',
    'pwConfirm'
  );
  const [error, setError] = useState({
    nickname: '아이디를 입력해주세요.',
    password: '비밀번호를 입력해주세요.',
    passwordConfirm: '비밀번호를 입력해주세요.',
    policy: '동의해주세요.',
  });
  const { CheckboxComponent, isChecked, setIsChecked } = CheckboxAgreement({
    labelTitle: '삭제 동의',
    checkboxAgreement: '탈퇴를 원하고 되돌릴 수 없음에 동의합니다.',
    agreementError: error.policy,
    isBackgroundWhite: false,
  });
  const [isClicked, setIsClicked] = useState(false);

  const inputData = [
    {
      label: {
        htmlFor: 'pw',
        text: '비밀번호',
      },
      guide: USER_DELETE_MESSAGES.PASSWORD_GUIDE,
      component: PwInput,
      error: error.password,
    },
    {
      label: {
        htmlFor: 'pwConfirm',
        text: '비밀번호 확인',
      },
      guide: USER_DELETE_MESSAGES.PASSWORD_CONFIRM_GUIDE,
      component: PwConfirmInput,
      error: error.passwordConfirm,
    },
  ];

  return (
    <S.Container>
      <S.BackBox>
        <button
          type='button'
          aria-label='뒤로 가기'
          onClick={() => router.back()}
        >
          <BackBtn width='25' fill='#b8b7c2' aria-hidden={true} />
        </button>
      </S.BackBox>
      <S.FormContainer>
        <S.WarningMessage>
          회원 탈퇴를 할 경우, {'마마망'}님의 아이디, 가계부, 팔로워 모든 내역이
          삭제되며 되돌릴 수 없습니다.
        </S.WarningMessage>
        {inputData.map((el) => (
          <S.InputBox>
            <S.LabelBox>
              <S.Label htmlFor={el.label.htmlFor}>{el.label.text}</S.Label>
              <S.Guide>{el.guide}</S.Guide>
            </S.LabelBox>
            <S.InputField>{el.component}</S.InputField>
            <S.Error>{el.error} </S.Error>
          </S.InputBox>
        ))}
        <S.CheckboxBox>{CheckboxComponent}</S.CheckboxBox>
        <S.SubmitBox isClicked={isClicked ? 'true' : undefined}>
          <S.SubmitBtn large>
            {/* <S.SubmitBtn large onClick={handleSubmit}> 추후 사용 예정  */}
            회원 탈퇴
          </S.SubmitBtn>
        </S.SubmitBox>
      </S.FormContainer>
    </S.Container>
  );
}

const bounce = keyframes`
  0% {
    transform: translateX(0);
  }
  30% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
  70% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
`;

interface SubmitBoxProps {
  isClicked?: string | undefined;
}

const S = {
  ...CommonStyles,
  Container: styled.main`
    width: 100%;
    height: 100%;
    padding: 0rem 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  BackBox: styled.div`
    display: flex;
    padding-left: 1rem;
    position: absolute;
    top: 6.5%;
  `,
  InputField: styled.div`
    margin: 0.5rem 0;
  `,

  FormContainer: styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  WarningMessage: styled.div`
    padding: 1rem 0;
    color: red;
  `,
  SubmitBox: styled.div<SubmitBoxProps>`
    width: 53%;
    margin-top: 1.5rem;
    ${({ isClicked }) =>
      isClicked &&
      css`
        animation: ${bounce} 1s infinite;
      `}
  `,
  Error: styled.div`
    padding-left: 20px;
    font-size: 0.9rem;
    margin-top: 8px;
    color: var(--color-point-purple);
  `,
  InputBox: styled.div`
    width: 53%;
  `,
  LabelBox: styled.div`
    padding-left: 10px;
    margin-bottom: 0.7rem;
  `,
  Label: styled.label`
    font-weight: 600;
    font-size: 1rem;
    display: inline-block;
  `,
  Guide: styled.span`
    font-size: 0.9rem;
    color: var(--color-point-gray);
    display: inline-block;
    margin: 2rem 0 0 0.7rem;
  `,
  ModifyBtn: styled.button`
    position: relative;
    display: inline-block;
    color: var(--color-gray04);
    font-weight: 400;
    margin-bottom: 2rem;
    &:hover {
      color: var(--color-primary);
      transition-duration: 0.7s;
      font-weight: 400;
    }
  `,
  CheckboxBox: styled.div`
    width: 52.5%;
    margin-top: 3rem;
  `,
};

const imageStyle = {
  borderRadius: '50%',
  cursor: 'pointer',
};

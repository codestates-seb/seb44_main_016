import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import { useState } from 'react';
import CommonStyles from '../../../styles/CommonStyles';
import useInput from '../../../hooks/useComponents';
import { USER_DELETE_MESSAGES } from '../../../constants/user';
import BackBtn from '../../../../public/image/back2.svg';
import CheckboxAgreement from '../../../components/CheckboxAgreement';

export default function UserUpdate() {
  const router = useRouter();
  const [PwInput, pwValue, setPwValue] = useInput('password', '비밀번호', 'pw');
  const [PwConfirmInput, password, setPassword] = useInput('password', '비밀번호 확인', 'pwConfirm');
  const [error, setError] = useState({
    password: '회원 탈퇴를 원하시는 경우에 비밀번호를 입력해주세요.',
    passwordConfirm: '비밀번호를 다시 입력해주세요.',
    policy: '탈퇴를 원하고 되돌릴 수 없음에 동의합니다.',
  });
  const { CheckboxComponent, isChecked, setIsChecked } = CheckboxAgreement({
    labelTitle: '삭제 동의',
    // checkboxAgreement: '탈퇴를 원하고 되돌릴 수 없음에 동의합니다.',
    agreementError: error.policy,
  });
  const [isClicked, setIsClicked] = useState(false);

  const inputData = [
    {
      label: {
        htmlFor: 'pw',
        text: '비밀번호',
      },
      component: PwInput,
      error: error.password,
    },
    {
      label: {
        htmlFor: 'pwConfirm',
        text: '비밀번호 확인',
      },
      component: PwConfirmInput,
      error: error.passwordConfirm,
    },
  ];

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    // 탈퇴 로직 처리 후 페이지 이동
    // '/user/delete/goodbye'로 이동
    const deletePageURL = router.asPath;
    localStorage.setItem('deletePageURL', deletePageURL);
    router.push('/user/delete/goodbye');
  };
  return (
    <S.Container>
      <Head>
        <title>제로힙 회원 탈퇴 페이지</title>
      </Head>
      <h1 className='blind'>제로힙 회원 탈퇴</h1>
      <S.BackBox>
        <button type='button' aria-label='뒤로 가기' onClick={() => router.back()}>
          <BackBtn width='25' fill='#b8b7c2' aria-hidden={true} />
        </button>
      </S.BackBox>
      <S.FormContainer>
        <h2 className='blind'>경고 메시지</h2>

        <S.WarningMessage>
          {`회원 탈퇴를 할 경우, ${'마마망'}님의 회원 정보, 가계부, 구독 목록 등`}
          <br />
          {`모든 데이터가 삭제되며 되돌릴 수 없습니다.`}
        </S.WarningMessage>
        <input name='username' autoComplete='사용자명' style={{ display: 'none' }} />
        {inputData.map((el) => (
          <S.InputBox key={el.label.text}>
            <S.LabelBox>
              <S.Label htmlFor={el.label.htmlFor}>
                <h2>{el.label.text}</h2>
              </S.Label>
            </S.LabelBox>
            <S.InputField>{el.component}</S.InputField>
            <S.Error>
              <h3 className='blind'>에러 메시지</h3>
              <h4>{el.error}</h4>
            </S.Error>
          </S.InputBox>
        ))}
        <S.CheckboxBox>
          <h2 className='blind'>삭제 동의</h2>
          {CheckboxComponent}
        </S.CheckboxBox>
        <S.SubmitBox isClicked={isClicked ? 'true' : undefined}>
          <S.SubmitBtn large onClick={handleDelete}>
            {/* <S.SubmitBtn large onClick={handleSubmit}> 추후 사용 예정  */}
            <h2>회원 탈퇴</h2>
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
  Container: styled.div`
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
  WarningMessage: styled.h3`
    width: 61%;
    padding: 1rem 0;
    color: var(--color-error-red);
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
  `,
  SubmitBox: styled.div<SubmitBoxProps>`
    width: 53%;
    margin-top: 1.5rem;
    ${({ isClicked }) =>
      isClicked &&
      css`
        animation: ${bounce} 1s infinite;
      `}
    h2 {
      font-size: 1.1rem;
      font-weight: 500;
    }
  `,
  Error: styled.div`
    padding-left: 20px;
    font-size: 0.98rem;
    margin-top: 8px;
    color: var(--color-error-red);

    h4 {
      font-weight: 400;
    }
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
    h2 {
      font-weight: 600;
      font-size: 1.07rem;
    }
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

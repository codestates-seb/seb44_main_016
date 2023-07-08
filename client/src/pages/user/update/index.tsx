import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import { useState } from 'react';
import CommonStyles from '../../../styles/CommonStyles';
import useInput from '../../../hooks/useComponents';
import Image from 'next/image';
import { USER_UPDATE_MESSAGES } from '../../../constants/updateUser';
import Back2 from '../../../../public/image/back2.svg';
import ImageUpload from '../../../../public/image/imageUpload.svg';

export default function UserUpdate() {
  const router = useRouter();
  const [nicknameInput, nickname, setNickname] = useInput(
    'text',
    '망고 사랑',
    'nickname'
  );
  const [PwInput, pwValue, setPwValue] = useInput('password', '비밀번호', 'pw');
  const [PwConfirmInput, password, setPassword] = useInput(
    'password',
    '비밀번호 확인',
    'pwConfirm'
  );
  const [error, setError] = useState({
    nickname: '아이디를 입력해주세요.',
    password: '아이디를 입력해주세요.',
    passwordConfirm: '아이디를 입력해주세요.',
  });
  const [isClicked, setIsClicked] = useState(false);

  const inputData = [
    {
      label: {
        htmlFor: 'nickname',
        text: '닉네임',
      },
      guide: USER_UPDATE_MESSAGES.NICKNAME_GUIDE,
      component: nicknameInput,
      error: error.nickname,
    },
    {
      label: {
        htmlFor: 'pw',
        text: '비밀번호',
      },
      guide: USER_UPDATE_MESSAGES.PASSWORD_GUIDE,
      component: PwInput,
      error: error.password,
    },
    {
      label: {
        htmlFor: 'pwConfirm',
        text: '비밀번호 확인',
      },
      guide: USER_UPDATE_MESSAGES.PASSWORD_CONFIRM_GUIDE,
      component: PwConfirmInput,
      error: error.passwordConfirm,
    },
  ];

  return (
    <S.Container>
      <S.BackBox>
        <button type='button' onClick={() => router.back()}>
          <Back2 width='25' fill='#b8b7c2' />
        </button>
      </S.BackBox>
      <S.FormContainer>
        <S.UserImg>
          <div>
            <Image
              src='/image/mango.png'
              alt='userProfileImg'
              width={150}
              height={150}
              style={imageStyle}
            />
          </div>
          <S.ImageUploadBtn>
            <ImageUpload />
          </S.ImageUploadBtn>
        </S.UserImg>
        {inputData.map((el) => (
          <S.InputBox>
            <S.LabelBox>
              <S.Label htmlFor={el.label.htmlFor}>{el.label.text}</S.Label>
              <S.Guide>{el.guide}</S.Guide>
            </S.LabelBox>
            <S.InputBtn>{el.component}</S.InputBtn>
            <S.Error>{el.error} </S.Error>
          </S.InputBox>
        ))}

        <S.SubmitBox isClicked={isClicked ? 'true' : undefined}>
          <S.SubmitBtn large>
            {/* <S.SubmitBtn large onClick={handleSubmit}> */}
            회원 정보 수정
          </S.SubmitBtn>
        </S.SubmitBox>

        {/* <S.SubmitBtn large onClick={handleSubmit}> */}
        <S.ModifyBtn>회원 탈퇴</S.ModifyBtn>
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
    padding: 2rem 2rem;
    position: relative;
  `,
  BackBox: styled.div`
    display: flex;
    padding-left: 1rem;
    height: 7%;
    position: absolute;
  `,
  InputBtn: styled.div`
    margin: 0.5rem 0;
  `,
  UserImg: styled.div`
    margin: 2.3rem 0 1.8rem 0;
    width: 150px;
    height: 150px;
    position: relative;
  `,
  ImageUploadBtn: styled.button`
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  SubmitBox: styled.div<SubmitBoxProps>`
    width: 45%;
    margin: 4rem 0 4rem 0;
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
    width: 45%;
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
    margin: 2.2rem 0 0 0.7rem;
  `,
  ModifyBtn: styled.button`
    position: relative;
    display: inline-block;
    color: var(--color-gray04);
    font-weight: 400;

    &:hover {
      color: var(--color-primary);
      transition-duration: 0.7s;
      font-weight: 400;
    }
  `,
};

const imageStyle = {
  borderRadius: '50%',
  cursor: 'pointer',
};
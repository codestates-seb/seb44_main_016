import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CommonStyles from '../../../styles/CommonStyles';
import useInput from '../../../hooks/useComponents';
import { USER_UPDATE_MESSAGES } from '../../../constants/messages/user';
import { useRefusalAni, isClickedStyled, SubmitBoxProps } from '../../../hooks/useRefusalAni';
import BackBtn from '../../../components/BackBtn';
import getNewError from '../../../utils/inputValidationError';
import apiUser from '../../../services/apiUser';
import ProfileImgUpdate from './ProfileImgUpdate';
import { RootState } from '../../../components/redux/store';
import { useSelector } from 'react-redux';
import UserInputField from './UserInputField';
import { UserInfoResData } from '../../../types/user';
import useMutateUser from '../../../services/useMutateUser';

interface UserUpdatePageProps {
  myInfoData: UserInfoResData;
}
export default function UserUpdatePage({ myInfoData }: UserUpdatePageProps) {
  const router = useRouter();

  const currentImgSrc = useSelector<RootState>((state) => state.currentImgReducer.currentImgSrc);
  const originalNickname = myInfoData ? myInfoData.nickname : '';

  const [nicknameInput, nickname] = useInput('text', originalNickname, 'nickname', 'nickname');
  const [PwInput, pwValue] = useInput('password', '비밀번호', 'pw', 'current-password');
  const [PwConfirmInput, password] = useInput('password', '비밀번호 확인', 'pwConfirm', 'current-password');
  const formData = new FormData();

  const [error, setError] = useState({
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [isClickedProps, RefusalAnimation] = useRefusalAni();

  useEffect(() => {
    const newError = getNewError.update({ nickname, pwValue, password });
    setError(newError);
  }, [nickname, pwValue, password]);

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

  const { updateUserMutate } = useMutateUser.update(apiUser.updateMyInfo);

  const handleUpdateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (nickname && error.nickname) ||
      (pwValue && !password) ||
      (password && !pwValue) ||
      (pwValue && error.password) ||
      (password && error.passwordConfirm)
    ) {
      RefusalAnimation();
      toast.error('에러 메시지를 확인해주세요.');
      return;
    }

    if (!currentImgSrc && !nickname && !password && !pwValue) {
      RefusalAnimation();
      toast.error('수정할 정보가 없습니다.');
      return;
    }

    formData.append('nickname', nickname ? nickname : '');
    formData.append('password', pwValue ? pwValue : '');
    formData.append('profileImgPath', typeof currentImgSrc === 'string' ? currentImgSrc : '');

    updateUserMutate(formData);
  };

  const handleMoveDeletePage = () => {
    router.push('/user/delete');
  };

  return (
    <S.Container>
      <BackBtn />
      <S.FormContainer>
        <ProfileImgUpdate myInfoData={myInfoData} />
        {inputData.map((el) => (
          <UserInputField
            key={el.label.text}
            label={el.label}
            guide={el.guide}
            component={el.component}
            error={el.error}
          />
        ))}
        <S.SubmitBox {...isClickedProps}>
          <S.SubmitBtn large onClick={handleUpdateUserSubmit}>
            회원 정보 수정
          </S.SubmitBtn>
        </S.SubmitBox>
        <S.MoveDeletePageBtn type='button' onClick={handleMoveDeletePage}>
          회원 탈퇴
        </S.MoveDeletePageBtn>
      </S.FormContainer>
    </S.Container>
  );
}

const S = {
  ...CommonStyles,
  Container: styled.div`
    width: 100%;
    height: 100%;
    padding: 0rem 2rem;
    position: relative;
    @media screen and (max-width: 750px) {
      padding: 0rem 1rem;
    }
    @media screen and (max-width: 500px) {
      padding: 0rem 0rem;
    }
  `,
  BackBox: styled.div`
    display: flex;
    padding-left: 1rem;
    height: 13%;
    position: absolute;
  `,
  UserImg: styled.div`
    margin: 2.7rem 0 1.5rem 0;
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
  FormContainer: styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 600px) {
      margin-bottom: 4.5rem;
    }
  `,
  SubmitBox: styled.div<SubmitBoxProps>`
    width: 45%;
    margin: 2.7rem 0 4rem 0;
    ${isClickedStyled}
    @media screen and (max-width: 900px) {
      width: 40%;
    }
    @media screen and (max-width: 500px) {
      width: 48%;
    }
  `,
  MoveDeletePageBtn: styled.button`
    position: relative;
    display: inline-block;
    color: var(--color-gray03);
    font-weight: 400;
    margin-bottom: 2rem;
    &:hover {
      color: var(--color-primary);
      transition-duration: 0.7s;
      font-weight: 400;
    }
  `,
};

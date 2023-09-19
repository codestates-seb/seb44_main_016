import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useState } from 'react';
import CommonStyles from '../../../styles/CommonStyles';
import useInput from '../../../hooks/useComponents';
import { useRefusalAni, isClickedStyled, SubmitBoxProps } from '../../../hooks/useRefusalAni';
import BackBtn from '../../../components/BackBtn';
import getNewError from '../../../utils/common/validation/inputValidationError';
import apiUser from '../../../services/apiUser';
import ProfileImgUpdate from './ProfileImgUpdate';
import { RootState } from '../../../components/redux/store';
import { useSelector } from 'react-redux';
import UserInputField from './UserInputField';
import { UserInfoResData } from '../../../types/user';
import useMutateUser from '../../../services/mutate/useMutateUser';
import useUserGlobalValue from '../../../components/redux/getUserInfo';
import generateInputData from '../../../utils/common/getInputData';
import isValidForm from '../../../utils/common/validation/isValidForm';

interface UserUpdatePageProps {
  myInfoData: UserInfoResData;
}

export default function UserUpdatePage({ myInfoData }: UserUpdatePageProps) {
  const router = useRouter();

  const currentImgSrc = useSelector<RootState>((state) => state.currentImgReducer.currentImgSrc);
  const { loginId } = useUserGlobalValue();
  const originalNickname = myInfoData ? myInfoData.nickname : '';

  const [nicknameInput, nickname] = useInput('text', originalNickname, 'nickname', 'nickname');
  const [PwInput, pwValue] = useInput('password', '비밀번호', 'pw', 'current-password');
  const [PwConfirmInput, password] = useInput('password', '비밀번호 확인', 'pwConfirm', 'current-password');

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

  const inputData = generateInputData({ type: '회원수정', nicknameInput, PwInput, PwConfirmInput, error });

  const { updateUserMutate } = useMutateUser.update(apiUser.updateMyInfo);
  const requestBody = {
    loginId,
    password,
    nickname,
    profileImgPath: typeof currentImgSrc === 'string' ? currentImgSrc : null,
  };
  const handleUpdateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidForm.update({ nickname, password, pwValue, currentImgSrc, error })) {
      RefusalAnimation();
      return;
    }

    updateUserMutate(requestBody);
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

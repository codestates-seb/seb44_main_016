import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CommonStyles from '../../../styles/CommonStyles';
import useInput from '../../../hooks/useComponents';
import { USER_UPDATE_MESSAGES } from '../../../constants/user';
import { useRefusalAni, isClickedStyled, SubmitBoxProps } from '../../../hooks/useRefusalAni';
import BackBtnBox from '../../../components/BackBtn';
import getNewError from '../../../utils/inputValidationError';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiUser from '../../../services/apiUser';
import Loading from '../../../components/Loading';
import ProfileImgUpdate from './ProfileImg';
import { RootState } from '../../../components/redux/store';
import { changeImgSrc } from '../../../components/redux/currentImgReducer';
import { useAppDispatch } from '../../../components/redux/hooks';
import { useSelector } from 'react-redux';

export default function UserUpdate() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    isLoading: isMyInfoLoading,
    error: myInfoError,
    data: myInfoData,
  } = useQuery(['myInfo'], apiUser.getMyInfo);

  if (myInfoError) {
    toast.error('오류가 발생했습니다.');
    toast.info('다시 시도해주세요.');
  }

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

  const { mutateAsync } = useMutation(apiUser.updateMyInfo);

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

    await mutateAsync(formData);
    toast.success('회원 정보가 수정되었습니다.');
    dispatch(changeImgSrc({ currentImgSrc: '', isAvatar: false }));
    router.push(`/user/mypage`);
  };

  const handleMoveDeletePage = () => {
    router.push('/user/delete');
  };

  return (
    <>
      {isMyInfoLoading ? (
        <Loading />
      ) : (
        myInfoData && (
          <S.Container>
            <BackBtnBox />
            <S.FormContainer>
              <ProfileImgUpdate data={myInfoData} />
              {inputData.map((el) => (
                <S.InputBox key={el.label.text}>
                  <S.LabelBox>
                    <S.Label htmlFor={el.label.htmlFor}>{el.label.text}</S.Label>
                    <S.Guide htmlFor={el.label.htmlFor}>{el.guide}</S.Guide>
                  </S.LabelBox>
                  <S.InputField>{el.component}</S.InputField>
                  <S.Error htmlFor={el.label.htmlFor}>{el.error} </S.Error>
                </S.InputBox>
              ))}
              <S.SubmitBox {...isClickedProps}>
                <S.SubmitBtn large onClick={handleUpdateUserSubmit}>
                  회원 정보 수정
                </S.SubmitBtn>
              </S.SubmitBox>
              <S.ModifyBtn type='button' onClick={handleMoveDeletePage}>
                회원 탈퇴
              </S.ModifyBtn>
            </S.FormContainer>
          </S.Container>
        )
      )}
    </>
  );
}

const S = {
  ...CommonStyles,
  Container: styled.div`
    width: 100%;
    padding: 0rem 2rem;
    position: relative;
  `,
  BackBox: styled.div`
    display: flex;
    padding-left: 1rem;
    height: 13%;
    position: absolute;
  `,
  InputField: styled.div`
    margin: 0.5rem 0;
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
  `,
  SubmitBox: styled.div<SubmitBoxProps>`
    width: 45%;
    margin: 2.7rem 0 4rem 0;
    ${isClickedStyled}
  `,
  Error: styled.label`
    padding-left: 0.5rem;
    font-size: 0.98rem;
    color: var(--color-error-red);
  `,
  InputBox: styled.div`
    width: 51%;
  `,
  LabelBox: styled.div`
    margin-top: 1rem;
  `,
  Label: styled.label`
    font-weight: 600;
    font-size: 1rem;
    display: inline-block;
  `,
  Guide: styled.label`
    font-size: 0.94rem;
    color: var(--color-point-gray);
    display: inline-block;
    margin: 1rem 0 0 0.7rem;
  `,
  ModifyBtn: styled.button`
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

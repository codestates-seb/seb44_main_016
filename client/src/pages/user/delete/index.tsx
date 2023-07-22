import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CommonStyles from '../../../styles/CommonStyles';
import useInput from '../../../hooks/useComponents';
import useCheckboxError from '../../../hooks/useCheckoutError';
import apiUser from '../../../services/apiUser';
import { useRefusalAni, isClickedStyled, SubmitBoxProps } from '../../../hooks/useRefusalAni';
import getNewError from '../../../utils/inputValidationError';
import BackBtn from '../../../components/BackBtn';
import useMutateUser from '../../../services/useMutateUser';
import HeadMeta from '../../../components/HeadMeta';
import { userMetaData } from '../../../constants/seo/userMetaData';

export default function UserDelete() {
  const [PwInput, pwValue] = useInput('password', '비밀번호', 'pw', 'current-password');
  const [PwConfirmInput, password] = useInput('password', '비밀번호 확인', 'pwConfirm', 'current-password');
  const [error, setError] = useState({
    password: '',
    passwordConfirm: '',
    policy: '',
  });
  const { CheckboxComponent, isChecked } = useCheckboxError({
    labelTitle: '삭제 동의',
    agreementError: error.policy,
  });
  const [isClickedProps, RefusalAnimation] = useRefusalAni();

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

  const { deleteUserMutate } = useMutateUser.delete(apiUser.deleteMyInfo);

  useEffect(() => {
    const newError = getNewError.delete({ pwValue, password, isChecked });
    setError(newError);
  }, [pwValue, password, isChecked]);

  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (error.password || error.passwordConfirm || error.policy) {
      RefusalAnimation();
      toast.error('에러 메시지를 확인해주세요.');
      return;
    }

    deleteUserMutate(password ? password : '');
  };

  return (
    <S.Container>
      <HeadMeta
        title={userMetaData.userDeletePage.title}
        description={userMetaData.userDeletePage.description}
      />
      <BackBtn />
      <S.FormContainer>
        <S.WarningMessage>
          <S.ReactiveBox>회원 탈퇴를 하실 경우, {`${'마마망'}님의 `}</S.ReactiveBox> 회원 정보, 가계부, 구독
          목록 등
          <br />
          모든 데이터가 삭제되며 <S.ReactiveBox>되돌릴 수 없습니다.</S.ReactiveBox>
        </S.WarningMessage>
        <input name='username' autoComplete='사용자명' style={{ display: 'none' }} />
        {inputData.map((el) => (
          <S.InputBox key={el.label.text}>
            <S.LabelBox>
              <S.Label htmlFor={el.label.htmlFor}>{el.label.text}</S.Label>
            </S.LabelBox>
            <S.InputField>{el.component}</S.InputField>
            <S.ErrorBox>
              <S.Error htmlFor={el.label.htmlFor}>{el.error}</S.Error>
            </S.ErrorBox>
          </S.InputBox>
        ))}
        <S.CheckboxBox>{CheckboxComponent}</S.CheckboxBox>
        <S.SubmitBox {...isClickedProps}>
          <S.SubmitBtn large onClick={handleDeleteSubmit}>
            회원 탈퇴
          </S.SubmitBtn>
        </S.SubmitBox>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 500px) {
      padding: 0rem 1rem;
    }
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
    width: 100%;
    padding: 1rem 0;
    color: var(--color-error-red);
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
  `,
  ReactiveBox: styled.span`
    @media screen and (max-width: 450px) {
      display: block;
    }
  `,
  SubmitBox: styled.div<SubmitBoxProps>`
    width: 53%;
    margin-top: 1.5rem;
    ${isClickedStyled}
    font-size: 1.1rem;
    font-weight: 500;
  `,
  ErrorBox: styled.div`
    margin-left: 1rem;
  `,
  Error: styled.label`
    font-size: 0.98rem;
    margin-top: 8px;
    color: var(--color-error-red);
  `,
  InputBox: styled.div`
    width: 53%;
    @media screen and (max-width: 750px) {
      width: 70%;
    }
    @media screen and (max-width: 500px) {
      width: 90%;
    }
  `,
  LabelBox: styled.div`
    margin-bottom: 0.7rem;
  `,
  Label: styled.label`
    font-weight: 600;
    font-size: 1rem;
    display: inline-block;
    margin: 2rem 0 0 0rem;
    font-weight: 600;
    font-size: 1.07rem;
  `,
  CheckboxBox: styled.div`
    width: 52.5%;
    margin-top: 3rem;
    @media screen and (max-width: 750px) {
      width: 70%;
    }
    @media screen and (max-width: 500px) {
      width: 90%;
    }
  `,
};

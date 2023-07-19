import styled from '@emotion/styled';
import React from 'react';
import CommonStyles from '../styles/CommonStyles';
import Head from 'next/head';

interface ErrorComponentProps {
  message: string;
}

export default function ErrorComponent({ message }: ErrorComponentProps) {
  const handleRetry = () => {
    window.location.reload();
  };
  return (
    <S.Container>
      <Head>
        <title>오류 페이지</title>
      </Head>
      <S.CommentBox>
        <S.MajorComment>오류가 발생 했어요!</S.MajorComment>
        <S.ExplainComment>{message}</S.ExplainComment>
        <S.SubmitBtn type='button' small onClick={handleRetry}>
          다시 시도하기
        </S.SubmitBtn>
      </S.CommentBox>
    </S.Container>
  );
}

const S = {
  ...CommonStyles,
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    margin: 3rem 0;
  `,
  AnimationBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  CommentBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > button {
      margin-top: 2rem;
    }
  `,
  MajorComment: styled.div`
    font-size: 1.8rem;
    margin: 1rem auto 0.7rem auto;
    font-weight: 600;
  `,
  ExplainComment: styled.div`
    font-size: 1.4rem;
    color: var(--color-primary);
    margin-bottom: 0.3rem;
  `,
};

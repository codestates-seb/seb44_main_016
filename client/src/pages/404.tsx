import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import CommonStyles from '../styles/CommonStyles';
import Lottie from 'react-lottie-player';
import notFoundAnimation from '../animation/404.json';

export default function NotFound() {
  const router = useRouter();

  return (
    <S.Container>
      <Head>
        <title>404 페이지</title>
      </Head>
      <h1 className='blind'>페이지를 찾을 수 없습니다.</h1>
      <S.ContentBox>
        <S.AnimationBox>
          <Lottie loop animationData={notFoundAnimation} play style={{ width: 370, height: 360 }} />{' '}
        </S.AnimationBox>
        <S.CommentBox>
          <S.MajorComment>요청하신 페이지가 없어요!</S.MajorComment>
          <S.ExplainComment>존재하지 않는 주소를 입력하셨거나</S.ExplainComment>
          <S.ExplainComment>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</S.ExplainComment>
          <S.HomeBtn type='button' onClick={() => router.push('/')}>
            홈으로 이동
          </S.HomeBtn>
        </S.CommentBox>
      </S.ContentBox>
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
    margin-top: 1rem;
  `,
  ContentBox: styled.div``,
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
  HomeBtn: styled.button`
    position: relative;
    display: inline-block;
    color: var(--color-white);
    padding: 0.7rem 1rem;
    border-radius: 100px;
    font-weight: 400;
    overflow: hidden;
    background-color: white;
    z-index: 1;
    border: 2px solid var(--color-primary);
    margin-top: 2rem;
    width: 36%;
    height: 50%;
    &:hover {
      color: var(--color-primary);
      background-color: white;
      transition-duration: 0.7s;
      font-weight: 600;
    }
    &::before {
      content: '';
      position: absolute;
      width: 20rem;
      height: 20rem;
      top: -4rem;
      left: -4rem;
      z-index: -1;
      border-radius: 100%;
      background: var(--color-primary);
      transition: 0.7s;
    }

    &:hover::before {
      top: 2.5rem;
      left: 2.5rem;
    }
    font-size: 1.1rem;
  `,
};

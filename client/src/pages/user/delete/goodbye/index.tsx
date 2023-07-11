import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Logo from '../../../../../public/image/logo.svg';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../components/redux/store';
import CommonStyles from '../../../../styles/CommonStyles';
import Link from 'next/link';
import Lottie from 'react-lottie-player';
import deleteAnimation from '../../../../animation/delete.json';
import Loading from '../../../../components/Loading';

export default function GoodBye() {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const accessToken = useSelector<RootState>((state) => state.authnReducer.login);
  console.log(accessToken);

  useEffect(() => {
    const previousUrl = localStorage.getItem('deletePageURL');
    const isFromDeletePage = previousUrl && previousUrl.includes('/user/delete');
    if (!isFromDeletePage) {
      // router.push('/'); // 코드 수정 때마다 페이지 이동하기 때문에, 완성 전까지 주석처리
      return;
    }
    localStorage.removeItem('deletePageURL');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <S.Container>
      <Head>
        <title>제로힙 회원 탈퇴 성공 페이지</title>
      </Head>
      <h1 className='blind'>회원탈퇴 성공</h1>
      <S.HomeBtnBox>
        <Link href='/'>
          <h2 className='blind'>홈으로 이동하는 제로힙 로고 이미지</h2>
          <Logo width='155' />
        </Link>
      </S.HomeBtnBox>
      {showMessage ? (
        <S.ContentBox>
          <S.AnimationBox>
            <Lottie
              loop
              animationData={deleteAnimation}
              play
              style={{ width: 310, height: 310 }}
            />{' '}
          </S.AnimationBox>
          <S.GoodByeBox>
            <S.GoodByeComment>
              <span style={{ color: 'var(--color-primary)' }}> {'마마망'}</span>
              <span>님의 탈퇴가 정상적으로 처리되었습니다.</span>
            </S.GoodByeComment>
            <S.NextTimeComment>다음에 또 이용해주세요!</S.NextTimeComment>
            <S.HomeBtn type='button'>
              <h2>홈으로 이동</h2>
            </S.HomeBtn>
          </S.GoodByeBox>
        </S.ContentBox>
      ) : (
        <Loading />
      )}
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
  `,
  HomeBtnBox: styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 4%;
  `,
  LogoBtn: styled.button``,

  ContentBox: styled.div``,
  AnimationBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  GoodByeBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  GoodByeComment: styled.h3`
    font-size: 1.8rem;
    margin: 1rem auto 0.7rem auto;
  `,
  NextTimeComment: styled.h3`
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-primary);
  `,
  HomeBtn: styled.button`
    position: relative;
    display: inline-block;
    color: var(--color-white);
    padding: 0.7rem 1rem;
    border-radius: 100px;
    font-weight: 500;
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
    > h2 {
      font-weight: 500;
      font-size: 1.1rem;
    }
  `,
};

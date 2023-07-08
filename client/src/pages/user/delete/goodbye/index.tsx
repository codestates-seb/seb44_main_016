import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Logo from '../../../../../public/image/logo.svg';
import { useState, useEffect } from 'react';
import CommonStyles from '../../../../styles/CommonStyles';
import Link from 'next/link';
import Lottie from 'react-lottie-player';
import deleteAnimation from '../../../../animation/delete.json';
import Loading from '../../../../components/Loading';
export default function GoodBye() {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    const previousUrl = localStorage.getItem('deletePageURL');
    const isFromDeletePage =
      previousUrl && previousUrl.includes('/user/delete');
    if (!isFromDeletePage) {
      router.push('/'); // 404
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
      <S.HomeBtnBox>
        <Link href='/'>
          <S.LogoBtn type='button'>
            <Logo width='155' aria-label='제로힙 로고 아이콘' />
          </S.LogoBtn>
        </Link>
      </S.HomeBtnBox>
      {showMessage ? (
        <S.ContentBox>
          <S.AnimationBox>
            <Lottie
              loop
              animationData={deleteAnimation}
              play
              style={{ width: 330, height: 330 }}
            />{' '}
          </S.AnimationBox>
          <S.GoodByeBox>
            <S.GoodByeComment>
              탈퇴가 정상적으로 처리되었습니다.{' '}
            </S.GoodByeComment>
            <S.NextTimeComment>다음에 또 이용해주세요!</S.NextTimeComment>
            <S.BtnBox>
              <Link href='/'>
                <S.SubmitBtn type='button'>홈으로</S.SubmitBtn>
              </Link>
            </S.BtnBox>
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
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  GoodByeComment: styled.h1`
    font-size: 1.8rem;
    margin: 0.6rem auto;
  `,
  NextTimeComment: styled.h2`
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-primary);
  `,
  BtnBox: styled.div`
    margin-top: 2rem;
  `,
};

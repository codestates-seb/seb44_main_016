import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import Logo from '../../../../../public/images/logo.svg';
import { useState, useEffect } from 'react';
import CommonStyles from '../../../../styles/CommonStyles';
import Lottie from 'react-lottie-player';
import deleteAnimation from '../../../../animation/delete.json';
import Loading from '../../../../components/Loading';
import HeadMeta from '../../../../components/HeadMeta';
import { USER_META_DATA } from '../../../../constants/seo/userMetaData';
import useUserGlobalValue from '../../../../components/redux/getUserInfo';

export default function GoodBye() {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const { nickname } = useUserGlobalValue();

  useEffect(() => {
    const previousUrl = localStorage.getItem('deletePageURL');
    const isFromDeletePage = previousUrl && previousUrl.includes('/user/delete');

    if (!isFromDeletePage) {
      toast.error('잘못된 요청입니다');
      router.push('/');
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

  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', () => history.pushState(null, '', location.href));
  }, []);

  return (
    <S.Container>
      <HeadMeta
        title={USER_META_DATA.USER_DELETE_SUCCESS_PAGE.TITLE}
        description={USER_META_DATA.USER_DELETE_SUCCESS_PAGE.DESCRIPTION}
      />
      <h1 className='blind'>회원탈퇴 성공</h1>
      <S.HomeBtnBox type='button' onClick={() => router.push(`/`)}>
        <Logo width='155' aria-label='제로힙 로고' />
      </S.HomeBtnBox>
      {showMessage ? (
        <>
          <S.AnimationBox>
            <Lottie loop animationData={deleteAnimation} play style={{ width: 300, height: 310 }} />{' '}
          </S.AnimationBox>
          <S.GoodByeBox>
            <S.GoodByeComment>
              <S.NicknameBox> {nickname}</S.NicknameBox>
              <span>님의 탈퇴가</span>
              <S.ReactiveSentence> 정상적으로 처리되었습니다.</S.ReactiveSentence>
            </S.GoodByeComment>
            <S.NextTimeComment>다음에 또 이용해주세요!</S.NextTimeComment>
            <S.HomeBtn type='button' onClick={() => router.push(`/`)}>
              홈으로 이동
            </S.HomeBtn>
          </S.GoodByeBox>
        </>
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
    justify-content: center;
    align-items: center;
    position: relative;
  `,
  HomeBtnBox: styled.button`
    display: flex;
    position: absolute;
    top: 0;
    left: 4%;
  `,
  AnimationBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 480px) {
      margin-top: 5rem;
    }
  `,
  GoodByeBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 1.4rem;
    text-align: center;
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  `,
  GoodByeComment: styled.div`
    font-size: 1.8rem;
    margin: 2.5rem auto 1rem auto;
    font-weight: 600;
    @media screen and (max-width: 480px) {
      margin: 1.3rem auto 1rem auto;
    }
  `,
  NicknameBox: styled.span`
    color: var(--color-primary);
  `,
  ReactiveSentence: styled.span`
    @media screen and (max-width: 480px) {
      display: block;
    }
  `,
  NextTimeComment: styled.div`
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
    width: 37%;
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
    font-weight: 500;
    font-size: 1.1rem;
    &:focus {
      outline: 2px solid var(--color-point-yellow);
    }
  `,
};

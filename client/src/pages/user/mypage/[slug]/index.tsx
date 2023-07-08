import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { keyframes, css } from '@emotion/react';
import { useEffect, useState } from 'react';
import CommonStyles from '../../../../styles/CommonStyles';
import useInput, { useCheckboxInput } from '../../../../hooks/useComponents';
import FollowModal from './FollowModal';

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { slug } = router.query;
  const [isOpen, setIsOpen] = useState(true);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.Container>
      <S.UserProfileContainer>
        <S.UserImg>
          <Image
            src='/image/mango.png'
            alt='프로필 사진'
            priority={true}
            width={150}
            height={150}
            style={imageStyle}
          />
        </S.UserImg>
        <S.UserName>
          <S.H1>마마망</S.H1>
        </S.UserName>
        <S.ModifyBtnBox>
          <FollowModal />
          <FollowModal />
          <Link href='/user/update'>
            <S.ModifyBtn type='button'>설정</S.ModifyBtn>
          </Link>
        </S.ModifyBtnBox>
      </S.UserProfileContainer>
      <S.UserArticleContainer>
        <S.ArticleContainer>
          {'공통 컴포넌트 trunk에 머지되면 사용 예정'}
        </S.ArticleContainer>
      </S.UserArticleContainer>
    </S.Container>
  );
}

const S = {
  ...CommonStyles,
  Container: styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  UserProfileContainer: styled.section`
    width: 90%;
    border-bottom: 1.5px solid var(--color-point-light-gray);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2.7rem 0 3.5rem 0;
  `,
  UserImg: styled.div``,
  UserName: styled.div`
    margin: 1rem 0;
  `,
  H1: styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    background-image: linear-gradient(to right, #0d0d0d, var(--color-primary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  `,
  ModifyBtnBox: styled.div`
    margin: 0 0 1.5rem 0;
    display: flex;
  `,
  ModifyBtn: styled.button`
    position: relative;
    display: inline-block;
    color: black;
    padding: 0.7rem 1rem;
    border-radius: 100px;
    font-weight: 500;
    overflow: hidden;
    background-color: white;
    z-index: 1;

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
      background: #dee2f1;
      transition: 0.7s;
    }

    &:hover::before {
      top: 2.5rem;
      left: 2.5rem;
    }
  `,
  UserArticleContainer: styled.div``,

  ModalBackdrop: styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: grid;
    place-items: center;
  `,
  ModalView: styled.div`
    border-radius: 10px;
    background-color: #ffffff;
    width: 300px;
    height: 100px;
    > span.close-btn {
      margin-top: 5px;
      cursor: pointer;
    }
    > div.desc {
      margin-top: 25px;
      color: #4000c7;
    }
  `,
  ArticleContainer: styled.article`
    /* 임시 */
    height: 2000px;
  `,
};

const imageStyle = {
  borderRadius: '50%',
  left: '20%',
  cursor: 'pointer',
};

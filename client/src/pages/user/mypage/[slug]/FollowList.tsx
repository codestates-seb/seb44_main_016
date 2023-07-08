import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ModalList() {
  return (
    <S.ModalFollowerBox>
      <S.UserInfo>
        <S.UserPic>
          <div>
            {' '}
            <Image
              src='/image/mango2.png'
              alt='프로필 사진'
              width={44}
              height={44}
              style={imageStyle}
            />
          </div>
        </S.UserPic>
        <S.UserId>
          <div>manng35</div>
        </S.UserId>
        <S.UserFollow>
          <S.UserFollowBtn type='button'>구독하기</S.UserFollowBtn>
        </S.UserFollow>
      </S.UserInfo>
      <S.UserDeleteBtn type='button'>삭제</S.UserDeleteBtn>
    </S.ModalFollowerBox>
  );
}

const S = {
  ModalFollowerBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 0rem;
  `,
  UserInfo: styled.div`
    display: flex;
  `,
  UserPic: styled.div`
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    background-color: #f0dab1;
    border-radius: 50%;
  `,
  UserId: styled.div`
    display: flex;
    align-items: center;
    margin: 0 0.9rem 0 0.6rem;
    color: var(--color-gray04);
    font-size: 0.95rem;
    font-weight: 500;
    &:hover {
      color: var(--color-gray05);
    }
  `,
  UserFollow: styled.div`
    display: flex;
    align-items: center;
  `,
  UserFollowBtn: styled.button`
    font-size: 0.93rem;
    color: var(--color-primary);
    &:hover {
      color: var(--color-primary-hover);
    }
  `,
  UserDeleteBtn: styled.button`
    display: flex;
    align-items: center;
    font-size: 0.93rem;
    font-weight: 400;
    color: var(--color-gray06);

    &:hover {
      color: var(--color-gray07);
    }
  `,
};

const imageStyle = {
  borderRadius: '50%',
  left: '20%',
  cursor: 'pointer',
};

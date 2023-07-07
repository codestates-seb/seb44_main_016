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
              alt='userProfileImg'
              width={44}
              height={44}
            />
          </div>
        </S.UserPic>
        <S.UserId>
          <div>manng35</div>
        </S.UserId>
        <S.UserFollow>
          <div>팔로우</div>
        </S.UserFollow>
      </S.UserInfo>
      <S.UserDelete>삭제</S.UserDelete>
    </S.ModalFollowerBox>
  );
}

const S = {
  ModalFollowerBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.6rem 0rem;
  `,
  UserInfo: styled.div`
    display: flex;
  `,
  UserPic: styled.div`
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
  `,
  UserId: styled.div`
    display: flex;
    align-items: center;
    margin: 0 0.9rem 0 0.6rem;
    color: var(--color-gray04);
    font-size: 0.92rem;
    font-weight: 400;
  `,
  UserFollow: styled.div`
    display: flex;
    align-items: center;
    color: var(--color-primary);
  `,
  UserDelete: styled.div`
    display: flex;
    align-items: center;
    font-size: 0.98rem;
    font-weight: 500;
  `,
};

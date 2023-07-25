import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import SVGs from '../../constants/svg';

export default function MobileLoginBtn() {
  return (
    <S.MobileLoginBtn href='/user/login'>
      <>{SVGs.person}</>
    </S.MobileLoginBtn>
  );
}

const S = {
  MobileLoginBtn: styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2vw;
  `,
};

import React from 'react'; // useState 사용
import styled from '@emotion/styled';
import Link from 'next/link';

import CommonStyles from '../../styles/CommonStyles';
import svgs from '../../constants/svg';

export default function MobileEditBtn() {
  return <S.MobileEditBtn href='/editor'>{svgs.pen}</S.MobileEditBtn>;
}

const S = {
  ...CommonStyles,
  MobileEditBtn: styled(Link)`
    position: absolute;
    width: 4rem;
    height: 4rem;
    bottom: 3rem;
    right: -1rem;
    transform: translate(-50%, -50%);
    background-color: var(--color-primary);
    border-radius: var(--rounded-full);
    box-shadow: var(--shadow-default);

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      filter: brightness(0.9);
    }

    & svg {
    }
    & path {
      fill: white;
    }
  `,
};

import styled from '@emotion/styled';
import Link from 'next/link';

import SvgBox from '../aside/SvgBox';
import svgs from '../../constants/svg';

export default function MobileHomeHeaderLogo() {
  return (
    <S.LogoContainer href='/'>
      <SvgBox>{svgs.logoSymbol}</SvgBox>
    </S.LogoContainer>
  );
}

const S = {
  LogoContainer: styled(Link)`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
      padding: 0.4rem 0;
    }
    & svg {
      height: 100%;
    }
  `,
};

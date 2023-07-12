import styled from '@emotion/styled';
import Link from 'next/link';

import SvgBox from '../aside/SvgBox';
import svgs from '../../constants/svg';

type Props = {
  isTabClosed?: boolean;
  children?: JSX.Element; // <svg>
};

export default function Logo(props: Props) {
  return (
    <S.LogoContainer href='/' isTabClosed={props.isTabClosed}>
      <SvgBox>{svgs.logoSymbol}</SvgBox>
      <span>{props.isTabClosed && svgs.logotext}</span>
    </S.LogoContainer>
  );
}

const S = {
  LogoContainer: styled(Link)<{ isTabClosed: boolean | undefined }>`
    width: 100%;
    height: 3.25rem;
    padding-left: 1rem;
    margin: 2rem 0rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    & svg {
      transform: scale(1.25);
    }
  `,
};

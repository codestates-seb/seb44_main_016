import styled from '@emotion/styled';
import Link from 'next/link';

import SvgBox from '../aside/SvgBox';
import svgs from '../../constants/svg';

type Props = {
  className?: string;
  children?: JSX.Element; // <svg>
};

export default function Logo(props: Props) {
  return (
    <S.LogoContainer href='/' className={props.className}>
      <SvgBox>{svgs.logoSymbol}</SvgBox>
      <span>{props.className === 'tab-closed' ? svgs.logoText : <></>}</span>
    </S.LogoContainer>
  );
}

const S = {
  LogoContainer: styled(Link)`
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

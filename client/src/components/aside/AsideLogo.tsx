import styled from '@emotion/styled';
import Link from 'next/link';

import SvgBox from '../aside/SvgBox';
import svgs from '../../constants/svg';

type Props = {
  className?: string;
  children?: JSX.Element; // <svg>
};

export default function AsideLogo(props: Props) {
  const isShrinkOrMobile = ['shrink', 'mobile'].includes(props.className || '');

  return (
    <S.LogoContainer href='/' className={props.className}>
      <SvgBox>{svgs.logoSymbol}</SvgBox>
      <span>{isShrinkOrMobile ? <></> : svgs.logoText}</span>
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
    gap: 16px; // 폰트 사이즈와 상관 없이 크기 고정
    & svg {
      transform: scale(1.25);
    }
  `,
};

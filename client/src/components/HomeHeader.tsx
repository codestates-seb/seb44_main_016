import React from 'react'; // useState 사용
import styled from '@emotion/styled';
import Link from 'next/link';

import CommonStyles from '../styles/CommonStyles';

export default function HomeHeader() {
  const [isHomeButtonActive, setIsHomeButtonActive] = React.useState(true);
  const [isFollowerButtonActive, setIsFollowerButtonActive] = React.useState(false);

  const handleClickHomeButton = () => {
    setIsHomeButtonActive(true);
    setIsFollowerButtonActive(false);
  };
  const handleClickFollowerButton = () => {
    setIsHomeButtonActive(false);
    setIsFollowerButtonActive(true);
  };

  return (
    <S.HomeHeaderContainer>
      <S.HomeHeaderBtn href='/' onClick={handleClickHomeButton} isActive={isHomeButtonActive}>
        홈
      </S.HomeHeaderBtn>
      {/* href='/?filterfollower=true' // 쿼리 미확정 */}
      <S.HomeHeaderBtn href='' onClick={handleClickFollowerButton} isActive={isFollowerButtonActive}>
        팔로워
      </S.HomeHeaderBtn>
    </S.HomeHeaderContainer>
  );
}

const S = {
  ...CommonStyles,
  HomeHeaderContainer: styled.header`
    position: fixed;
    padding-left: var(--aside-w);
    max-width: var(--app-max-w);
    width: 100%;
    height: var(--header-h);
    background-color: white;
    // border-right: 0.05rem solid var(--color-gray08);
    border-bottom: 0.05rem solid var(--color-gray08);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 998;
  `,
  HomeHeaderBtn: styled(Link)<{ isActive: boolean }>`
    width: 6rem;
    height: 75%;
    background-color: white;
    font-size: 1.25rem;
    font-weight: ${(props) => props.isActive && 'bold'};
    color: ${(props) => (props.isActive ? 'var(--color-primary)' : 'var(--color-gray03)')};
    border-bottom: 3px solid ${(props) => (props.isActive ? 'var(--color-primary)' : 'transparent')};

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      color: var(--color-primary);
    }
  `,
};

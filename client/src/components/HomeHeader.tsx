import React from 'react'; // useState 사용
import styled from '@emotion/styled';

import CommonStyles from '../styles/CommonStyles';

export default function HomeHeader() {
  const [isHomeButtonActive, setIsHomeButtonActive] = React.useState(true);
  const [isFollowerButtonActive, setIsFollowerButtonActive] = React.useState(false);

  const handleClickHomeButton = () => {
    setIsHomeButtonActive(true);
    setIsFollowerButtonActive(false);
  };
  const handleClickFollowButton = () => {
    setIsHomeButtonActive(false);
    setIsFollowerButtonActive(true);
  };

  return (
    <S.HomeHeaderContainer>
      <S.HomeHeaderButton onClick={handleClickHomeButton} isActive={isHomeButtonActive}>
        홈
      </S.HomeHeaderButton>
      <S.HomeHeaderButton
        onClick={handleClickFollowButton}
        isActive={isFollowerButtonActive}
      >
        팔로워
      </S.HomeHeaderButton>
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
    // border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  `,
  HomeHeaderButton: styled.button<{ isActive: boolean }>`
    width: 6rem;
    height: 75%;
    background-color: white;
    font-size: 1.25rem;
    font-weight: ${(props) => props.isActive && 'bold'};
    color: var(--color-gray01);
    border-bottom: 3px solid
      ${(props) => (props.isActive ? 'var(--color-primary)' : 'transparent')};

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      color: var(--color-primary);
    }
  `,
};

import React from 'react'; // useState 사용
import styled from '@emotion/styled';

import CommonStyles from '../styles/CommonStyles';

export default function HomeHeader() {
  const [isHomeButtonActive, setIsHomeButtonActive] = React.useState(true);
  const [isFollowerButtonActive, setIsFollowerButtonActive] =
    React.useState(false);

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
      <S.HomeHeaderButton
        onClick={handleClickHomeButton}
        isActive={isHomeButtonActive}
      >
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
    margin-left: 250px;
    width: 890px;
    height: 5rem;
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
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.isActive && 'var(--color-primary)'};
    border-bottom: ${(props) =>
      props.isActive
        ? '3px solid var(--color-primary)'
        : '3px solid transparent'};

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      filter: brightness(0.9);
    }
  `,
};

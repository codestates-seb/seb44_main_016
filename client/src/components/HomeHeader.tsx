import React from 'react'; // useState 사용
import styled from '@emotion/styled';
import Link from 'next/link';

import CommonStyles from '../styles/CommonStyles';
import { ScreenEnum } from '../constants/enums';

type Props = {
  windowType: ScreenEnum;
};

export default function HomeHeader(props: Props) {
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
    <S.HomeHeaderContainer isDesktopScreen={props.windowType === ScreenEnum.DESKTOP}>
      <S.HomeHeaderBtn
        href='/'
        onClick={handleClickHomeButton}
        className={isHomeButtonActive ? 'current-tab' : ''}
      >
        홈
      </S.HomeHeaderBtn>
      {/* href='/?filterfollower=true' // 쿼리 미확정 */}
      <S.HomeHeaderBtn
        href=''
        onClick={handleClickFollowerButton}
        className={isFollowerButtonActive ? 'current-tab' : ''}
      >
        팔로워
      </S.HomeHeaderBtn>
    </S.HomeHeaderContainer>
  );
}

const S = {
  ...CommonStyles,
  HomeHeaderContainer: styled.header<{ isDesktopScreen: boolean }>`
    position: fixed;
    padding-left: ${(props) => (props.isDesktopScreen ? 'var(--aside-w)' : 'var(--aside-shrink-w)')};
    max-width: var(--app-max-w);
    width: 100%;
    height: var(--header-h);
    background-color: white;
    border-bottom: 0.05rem solid var(--color-gray08);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 998;
  `,
  HomeHeaderBtn: styled(Link)`
    width: 6rem;
    height: 75%;
    background-color: white;
    font-size: 1.25rem;
    color: var(--color-gray03);
    border-bottom: 3px solid transparent;

    &.current-tab {
      font-weight: bold;
      color: var(--color-primary);
      border-bottom: 3px solid var(--color-primary);
    }

    &:hover {
      color: var(--color-primary);
    }

    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

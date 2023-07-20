import React from 'react'; // useState 사용
import styled from '@emotion/styled';
import Link from 'next/link';

import MobileHomeHeaderLogo from './home-header/MobileHomeHeaderLogo';
import ProfileHamburgerBtn from './home-header/ProfileHamburgerBtn';
import CommonStyles from '../styles/CommonStyles';
import { ScreenEnum } from '../constants/enums';

type Props = {
  windowType: ScreenEnum;
};

export default function HomeHeader(props: Props) {
  const [isHomeBtnActive, setIsHomeBtnActive] = React.useState(true);
  const [isFollowerBtnActive, setIsFollowerBtnActive] = React.useState(false);
  const [isRankBtnActive, setIsRankBtnActive] = React.useState(false);

  const handleClickHomeBtn = () => {
    setIsHomeBtnActive(true);
    setIsFollowerBtnActive(false);
    setIsRankBtnActive(false);
  };
  const handleClickFollowerBtn = () => {
    setIsHomeBtnActive(false);
    setIsFollowerBtnActive(true);
    setIsRankBtnActive(false);
  };
  const handleClickRankBtn = () => {
    setIsHomeBtnActive(false);
    setIsFollowerBtnActive(false);
    setIsRankBtnActive(true);
  };

  return (
    <S.HomeHeaderContainer windowType={props.windowType}>
      {props.windowType === ScreenEnum.MOBILE ? <MobileHomeHeaderLogo /> : <></>}

      <S.HomeHeaderTabBtns>
        <S.HomeHeaderBtn
          href=''
          windowType={props.windowType}
          onClick={handleClickHomeBtn}
          className={isHomeBtnActive ? 'current-tab' : ''}
        >
          홈
        </S.HomeHeaderBtn>
        {/* href='/?filterfollower=true' // 쿼리 미확정 */}
        <S.HomeHeaderBtn
          href=''
          windowType={props.windowType}
          onClick={handleClickFollowerBtn}
          className={isFollowerBtnActive ? 'current-tab' : ''}
        >
          팔로워
        </S.HomeHeaderBtn>
        <S.HomeHeaderBtn
          href=''
          windowType={props.windowType}
          onClick={handleClickRankBtn}
          className={isRankBtnActive ? 'current-tab' : ''}
        >
          랭킹
        </S.HomeHeaderBtn>
      </S.HomeHeaderTabBtns>
      {props.windowType === ScreenEnum.MOBILE ? <ProfileHamburgerBtn className={props.windowType} /> : <></>}
    </S.HomeHeaderContainer>
  );
}

const S = {
  ...CommonStyles,
  HomeHeaderContainer: styled.header<{ windowType: ScreenEnum }>`
    position: fixed;
    padding-left: ${(props) =>
      props.windowType === ScreenEnum.DESKTOP
        ? 'var(--aside-w)'
        : props.windowType === ScreenEnum.TABLET
        ? 'var(--aside-shrink-w)'
        : '0'};
    max-width: var(--app-max-w);
    width: 100%;
    height: ${(props) => (props.windowType === ScreenEnum.MOBILE ? '8vw' : 'var(--header-h)')};
    max-height: var(--header-h);
    min-height: 3rem;
    background-color: white;
    border-bottom: 0.05rem solid var(--color-gray08);
    display: flex;
    justify-content: ${(props) => (props.windowType === ScreenEnum.MOBILE ? 'space-between' : 'center')};
    z-index: 998;
  `,
  HomeHeaderTabBtns: styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
  `,
  HomeHeaderBtn: styled(Link)<{ windowType: ScreenEnum }>`
    width: ${(props) => (props.windowType === ScreenEnum.MOBILE ? '5rem' : '6rem')};
    height: ${(props) => (props.windowType === ScreenEnum.MOBILE ? '100%' : '75%')};
    background-color: white;
    font-size: 1.25rem;
    color: var(--color-gray03);
    padding-top: 0.2rem;
    border-bottom: 0.2rem solid transparent;

    &.current-tab {
      font-weight: bold;
      color: var(--color-primary);
      border-bottom: 0.2rem solid var(--color-primary);
    }

    &:hover {
      color: var(--color-primary);
    }

    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

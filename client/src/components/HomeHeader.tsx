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

  const windowTypeStr = props.windowType.toString();

  const getClsName = (isActive: boolean) => {
    return `${windowTypeStr} ${isActive ? 'current-tab' : ''}`;
  };

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
    <S.HomeHeaderContainer className={windowTypeStr}>
      {props.windowType === ScreenEnum.MOBILE ? <MobileHomeHeaderLogo /> : <></>}

      <S.HomeHeaderTabBtns>
        <S.HomeHeaderBtn href='/' onClick={handleClickHomeBtn} className={getClsName(isHomeBtnActive)}>
          홈
        </S.HomeHeaderBtn>
        <S.HomeHeaderBtn href='' onClick={handleClickFollowerBtn} className={getClsName(isFollowerBtnActive)}>
          구독
        </S.HomeHeaderBtn>
        <S.HomeHeaderBtn
          href='/?rank=true&top=3'
          onClick={handleClickRankBtn}
          className={getClsName(isRankBtnActive)}
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
  HomeHeaderContainer: styled.header`
    position: fixed;
    max-width: var(--app-max-w);
    width: 100%;
    height: var(--header-h);
    max-height: var(--header-h);
    min-height: 3rem;
    background-color: white;
    border-bottom: 0.05rem solid var(--color-gray08);

    &.desktop {
      padding-left: var(--aside-w);
    }
    &.tablet {
      padding-left: var(--aside-shrink-w);
    }
    &.mobile {
      padding-left: 0;
      height: 8vw;
      justify-content: space-between;
    }

    display: flex;
    justify-content: center;
    z-index: 998;
  `,
  HomeHeaderTabBtns: styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
  `,
  HomeHeaderBtn: styled(Link)`
    width: 6rem;
    height: 75%;
    background-color: white;
    font-size: 1.25rem;
    color: var(--color-gray03);
    padding-top: 0.2rem;
    border-bottom: 0.2rem solid transparent;

    &.mobile {
      width: 5rem;
      height: 100%;
    }

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

import React from 'react'; // useState 사용
import styled from '@emotion/styled';

import CommonStyles from '../styles/CommonStyles';
import AsideBtn from '../components/aside/AsideBtn';
import AsideLogo from '../components/aside/AsideLogo';
import AsideProfileBox from '../components/aside/AsideProfileBox';
import MobileEditBtn from '../components/aside/MobileEditBtn';
import ProfileHamburgerBtn from '../components/home-header/ProfileHamburgerBtn';

import svgs from '../constants/svg';
import { ScreenEnum } from '../constants/enums';

function getClsName(isTabClosed: boolean, windowType: ScreenEnum) {
  let asideClsName = '';
  if (!isTabClosed || windowType !== ScreenEnum.DESKTOP) {
    asideClsName = 'shrink';
  }
  if (windowType === ScreenEnum.MOBILE) {
    asideClsName = 'mobile';
  }
  return asideClsName;
}

type Props = {
  isLoggedIn: boolean;
  windowType: ScreenEnum;
};

export default function Aside(props: Props) {
  const [isBookmarkedFaRecListOpened, setIsBookmarkedFaRecListOpened] = React.useState(true);
  const [isSearchTabOpened, setIsSearchTabOpened] = React.useState(false);
  const [isNoticeTabOpened, setIsNoticeTabOpened] = React.useState(false);
  const isTabClosed = !isSearchTabOpened && !isNoticeTabOpened;

  const asideClsName = getClsName(isTabClosed, props.windowType);
  const isShrinkOrMobile = ['shrink', 'mobile'].includes(asideClsName || '');
  const isMobile = asideClsName === 'mobile';

  const handleOpenOrCloseBookmarkedFaRecList = () => {
    setIsBookmarkedFaRecListOpened((prevBool) => !prevBool);
  };
  const handleOpenOrCloseSearchTab = () => {
    setIsSearchTabOpened((prevBool) => !prevBool);
    setIsNoticeTabOpened(false);
  };
  const handleOpenOrCloseNoticeTab = () => {
    setIsNoticeTabOpened((prevBool) => !prevBool);
    setIsSearchTabOpened(false);
  };
  const handleCloseTab = () => {
    setIsNoticeTabOpened(false);
    setIsSearchTabOpened(false);
  };

  return (
    <S.AsideContainer className={asideClsName}>
      <S.LeftOfAsideCover />
      <S.AsideInnerContainer className={asideClsName}>
        <S.Upper className={asideClsName}>
          {isMobile ? <></> : <AsideLogo className={asideClsName} />}
          <AsideBtn leftIcon={svgs.home} className={asideClsName} href='/'>
            홈
          </AsideBtn>
          {props.isLoggedIn && (
            <>
              <AsideBtn onClick={handleOpenOrCloseNoticeTab} leftIcon={svgs.notice} className={asideClsName}>
                알림
              </AsideBtn>
              {/* href='/financial-record' */}
              <AsideBtn
                leftIcon={svgs.faRec}
                rightIcon={svgs.dropdown}
                isReverse={isBookmarkedFaRecListOpened}
                onClickRight={handleOpenOrCloseBookmarkedFaRecList}
                className={asideClsName}
              >
                내 가계부
              </AsideBtn>
              {isBookmarkedFaRecListOpened || isShrinkOrMobile ? (
                <></>
              ) : (
                <ol>
                  <AsideBtn isSmall={true} className={asideClsName}>
                    XXX의 가계부
                  </AsideBtn>
                  <AsideBtn isSmall={true} className={asideClsName}>
                    ♡ 데이트 통장 ♥
                  </AsideBtn>
                  <AsideBtn isSmall={true} className={asideClsName}>
                    '산악회 곗돈 장부
                  </AsideBtn>
                </ol>
              )}
            </>
          )}
          <AsideBtn onClick={handleOpenOrCloseSearchTab} leftIcon={svgs.search} className={asideClsName}>
            검색
          </AsideBtn>
          <AsideBtn leftIcon={svgs.thumb} className={asideClsName} href='/about'>
            About
          </AsideBtn>
        </S.Upper>
        {isMobile ? (
          <MobileEditBtn />
        ) : (
          <S.Lower>
            {props.isLoggedIn ? (
              <>
                {/* href='/user/mypage' */}
                {isShrinkOrMobile && !isMobile ? (
                  <ProfileHamburgerBtn className={asideClsName} />
                ) : (
                  <AsideProfileBox className={asideClsName} />
                )}
                {isShrinkOrMobile ? (
                  isMobile ? (
                    <></>
                  ) : (
                    <AsideBtn leftIcon={svgs.pen} />
                  )
                ) : (
                  <S.LinkBtn href={'/editor'}>글쓰기</S.LinkBtn>
                )}
              </>
            ) : isShrinkOrMobile ? (
              <S.LinkBtn href='/user/login'>로그인</S.LinkBtn>
            ) : (
              <AsideBtn href='/user/login' leftIcon={svgs.person} />
            )}
          </S.Lower>
        )}
      </S.AsideInnerContainer>
      {isNoticeTabOpened && (
        <S.TabContainer className={asideClsName}>
          알림
          <S.CloseTabBtn onClick={handleCloseTab}>×</S.CloseTabBtn>
        </S.TabContainer>
      )}
      {isSearchTabOpened && (
        <S.TabContainer className={asideClsName}>
          검색
          <S.CloseTabBtn onClick={handleCloseTab}>×</S.CloseTabBtn>
        </S.TabContainer>
      )}
    </S.AsideContainer>
  );
}

const S = {
  ...CommonStyles,
  AsideContainer: styled.aside`
    width: var(--aside-w);
    position: fixed;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    z-index: 999; // HomeHeader와 겹쳐져 Aside 오른쪽 테두리의 일부가 안 보는 버그 수정

    &.shrink {
      width: var(--aside-shrink-w);
    }
    &.mobile {
      width: 100%;
      height: var(--aside-mobile-h);
      max-height: 12.5vw;
      bottom: 0;
    }
  `,
  LeftOfAsideCover: styled.div`
    position: absolute;
    width: var(--aside-tab-w);
    left: calc(var(--aside-tab-w) * -1);
    background-color: white;
    height: 100%;
  `,
  AsideInnerContainer: styled.div`
    width: 100%;
    border-right: 0.05rem solid var(--color-gray08);
    background-color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    &.mobile {
      border-right: none;
      border-top: 0.05rem solid var(--color-gray08);
    }

    animation: fadein 0.5s;
    @keyframes fadein {
      from {
        left: -10rem;
      }
    }
  `,
  Upper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    &.mobile {
      height: 100%;
      padding: 0;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      & > div {
        height: 100%;
      }
      & a,
      & button {
        padding: 0;
        gap: 0;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }
  `,
  Lower: styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem 0rem;
  `,

  TabContainer: styled.div`
    left: 5rem;
    border-right: 0.05rem solid var(--color-gray08);
    position: absolute;
    width: var(--aside-tab-w);
    height: 100%;
    background-color: white;
    font-weight: bold;
    font-size: 5rem;
    color: var(--color-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;

    animation: fadein 0.5s;
    @keyframes fadein {
      from {
        left: -10rem;
      }
    }

    &.mobile {
      position: fixed;
      left: 0%;
      top: 0rem;
      width: 100%;
      height: 100%;

      @keyframes fadein {
        from {
          left: -100%;
        }
      }
    }
  `,
  CloseTabBtn: styled.button`
    position: absolute;
    top: 0rem;
    right: 1rem;
    color: var(--color-gray02);
    font-weight: 100;
  `,
  /*
  Backdrop: styled.div`
    position: absolute;
    left: 5rem;
    background-color: pink;
  `,
  */
};

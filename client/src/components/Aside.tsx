import React from 'react'; // useState 사용
import styled from '@emotion/styled';

import CommonStyles from '../styles/CommonStyles';
import AsideButton from '../components/aside/AsideButton';
import AsideLogo from '../components/aside/AsideLogo';
import AsideProfileBox from '../components/aside/AsideProfileBox';

import svgs from '../constants/svg';
import { useWindowType } from '../hooks/useWindowSize';
import { ScreenEnum } from '../constants/enums';

/* type은 추후 다른 파일로 분리하고 Import할 예정 */
type Props = {
  isLoggedIn: boolean;
  windowType: ScreenEnum;
};

export default function Aside(props: Props) {
  const [isSearchTabOpened, setIsSearchTabOpened] = React.useState(false);
  const [isNoticeTabOpened, setIsNoticeTabOpened] = React.useState(false);
  const isTabClosed = !isSearchTabOpened && !isNoticeTabOpened;

  const asideClsName = !isTabClosed || props.windowType !== ScreenEnum.DESKTOP ? 'shrink' : '';
  const isShrink = asideClsName === 'shrink';

  const [isBookmarkedFaRecListOpened, setIsBookmarkedFaRecListOpened] = React.useState(true);

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
      <S.AsideInnerContainer>
        <S.Upper>
          <AsideLogo className={asideClsName} />
          <ol>
            <AsideButton leftIcon={svgs.home} className={asideClsName}>
              홈
            </AsideButton>
            {props.isLoggedIn && (
              <>
                <AsideButton
                  onClick={handleOpenOrCloseNoticeTab}
                  leftIcon={svgs.notice}
                  className={asideClsName}
                >
                  알림
                </AsideButton>
                {/* href='/financial-record' */}
                <AsideButton
                  leftIcon={svgs.faRec}
                  rightIcon={svgs.dropdown}
                  isReverse={isBookmarkedFaRecListOpened}
                  onClickRight={handleOpenOrCloseBookmarkedFaRecList}
                  className={asideClsName}
                >
                  내 가계부
                </AsideButton>
                {isBookmarkedFaRecListOpened || isShrink ? (
                  <></>
                ) : (
                  <ol>
                    <AsideButton isSmall={true} className={asideClsName}>
                      XXX의 가계부
                    </AsideButton>
                    <AsideButton isSmall={true} className={asideClsName}>
                      ♡ 데이트 통장 ♥
                    </AsideButton>
                    <AsideButton isSmall={true} className={asideClsName}>
                      '산악회 곗돈 장부
                    </AsideButton>
                  </ol>
                )}
              </>
            )}
            <AsideButton leftIcon={svgs.ranking} className={asideClsName}>
              명예의 전당
            </AsideButton>
            <AsideButton onClick={handleOpenOrCloseSearchTab} leftIcon={svgs.search} className={asideClsName}>
              검색
            </AsideButton>
          </ol>
        </S.Upper>
        <S.Lower>
          {props.isLoggedIn ? (
            <>
              {/* href='/user/mypage' */}
              <AsideProfileBox className={asideClsName} />
              {isShrink ? <AsideButton leftIcon={svgs.editor} /> : <S.SubmitBtn>글쓰기</S.SubmitBtn>}
            </>
          ) : isShrink ? (
            <S.LinkBtn href='/user/login'>로그인</S.LinkBtn>
          ) : (
            <AsideButton href='/user/login' leftIcon={svgs.person} />
          )}
        </S.Lower>
      </S.AsideInnerContainer>
      {isNoticeTabOpened && (
        <S.TabContainer>
          알림
          <S.CloseTabButton onClick={handleCloseTab}>×</S.CloseTabButton>
        </S.TabContainer>
      )}
      {isSearchTabOpened && (
        <S.TabContainer>
          검색
          <S.CloseTabButton onClick={handleCloseTab}>×</S.CloseTabButton>
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

    animation: fadein 0.5s;
    @keyframes fadein {
      from {
        left: -10rem;
      }
    }
  `,
  Upper: styled.div`
    width: 100%;
  `,
  Lower: styled.div`
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
  `,
  CloseTabButton: styled.button`
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

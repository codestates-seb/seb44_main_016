import React from 'react'; // useState 사용
import styled from '@emotion/styled';

import CommonStyles from '../styles/CommonStyles';
import AsideButton from '../components/aside/AsideButton';
import SvgBox from '../components/aside/SvgBox';

import svgs from '../constants/svg';

/* type은 추후 다른 파일로 분리하고 Import할 예정 */
type Props = {
  isLoggedIn: boolean;
};

export default function Aside(props: Props) {
  const [isSearchTabOpened, setIsSearchTabOpened] = React.useState(false);
  const [isNoticeTabOpened, setIsNoticeTabOpened] = React.useState(false);
  const isTabClosed = !isSearchTabOpened && !isNoticeTabOpened;

  const [isBookmarkedFaRecListOpened, setIsBookmarkedFaRecListOpened] =
    React.useState(true);

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
    <S.AsideContainer>
      <S.AsideInnerContainer>
        <S.Upper>
          <S.Logo>
            <SvgBox>{svgs.logoSymbol}</SvgBox>
            {isTabClosed && svgs.logotext}
          </S.Logo>
          <ol>
            <AsideButton leftIcon={svgs.home}>
              {isTabClosed && '홈'}
            </AsideButton>

            {props.isLoggedIn && (
              <>
                <AsideButton
                  onClick={handleOpenOrCloseNoticeTab}
                  leftIcon={svgs.notice}
                >
                  {isTabClosed && '알림'}
                </AsideButton>
                <AsideButton
                  leftIcon={svgs.faRec}
                  rightIcon={svgs.dropdown}
                  isReverse={isBookmarkedFaRecListOpened}
                  onClickRight={handleOpenOrCloseBookmarkedFaRecList}
                >
                  {isTabClosed && '내 가계부'}
                </AsideButton>
                {isBookmarkedFaRecListOpened && isTabClosed && (
                  <ol>
                    <AsideButton isSmall={true}>
                      {isTabClosed && 'XXX의 가계부'}
                    </AsideButton>
                    <AsideButton isSmall={true}>
                      {isTabClosed && '♡ 데이트 통장 ♥'}
                    </AsideButton>
                    <AsideButton isSmall={true}>
                      {isTabClosed && '산악회 곗돈 장부'}
                    </AsideButton>
                  </ol>
                )}
              </>
            )}

            <AsideButton leftIcon={svgs.ranking}>
              {isTabClosed && '명예의 전당'}
            </AsideButton>
            <AsideButton
              onClick={handleOpenOrCloseSearchTab}
              leftIcon={svgs.search}
            >
              {isTabClosed && '검색'}
            </AsideButton>
          </ol>
        </S.Upper>
        <S.Lower>
          {props.isLoggedIn ? (
            <>
              <S.ProfileBox>
                <S.ProfileLeftSection>
                  <S.ProfileImg />
                  <S.ProfileTexts>
                    <S.Nickname>{isTabClosed && 'Waypil'}</S.Nickname>
                    <span>{isTabClosed && '@waypil'}</span>
                  </S.ProfileTexts>
                </S.ProfileLeftSection>
                <S.ProfileRightSection>
                  <span>…</span>
                </S.ProfileRightSection>
              </S.ProfileBox>
              {isTabClosed ? (
                <S.SubmitBtn>글 쓰기</S.SubmitBtn>
              ) : (
                <AsideButton leftIcon={svgs.editor} />
              )}
            </>
          ) : isTabClosed ? (
            <S.SubmitBtn>로그인</S.SubmitBtn>
          ) : (
            <AsideButton leftIcon={svgs.person} />
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
    position: relative;
    height: 100%;
    background-color: white;
    border-right: 1px solid var(--color-gray08);
    // border: 1px solid;
    display: flex;
    align-items: flex-start;
  `,
  AsideInnerContainer: styled.section`
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
  Upper: styled.section`
    width: 100%;
    height: 100%;
  `,
  Lower: styled.section`
    width: 100%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem 0rem;
  `,

  Logo: styled.button`
    width: 100%;
    height: 3.25rem;
    padding-left: 1rem;
    margin: 2rem 0rem;
    display: flex;
    align-items: center;
  `,
  BookmarkedFaRecButton: styled.button`
    width: 100%;
    padding: 1rem 0rem;
  `,
  ProfileBox: styled.button`
    width: 100%;
    height: 3.25rem;
    background-color: white;
    padding-left: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      filter: brightness(0.9);
    }
  `,
  ProfileLeftSection: styled.section`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &:hover {
      filter: brightness(0.9);
    }
  `,
  ProfileRightSection: styled.section`
    height: 100%;
    padding-right: 1rem;
    display: flex;
    align-items: start;
    justify-content: space-between;
  `,
  ProfileTexts: styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  `,
  Nickname: styled.span`
    font-weight: bold;
  `,
  ProfileImg: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    overflow: hidden;
    flex-shrink: 0;
    background-color: black;
  `,

  TabContainer: styled.section`
    left: 80px;
    border-left: 1px solid var(--color-gray08);
    border-right: 1px solid var(--color-gray08);
    position: absolute;
    width: 350px;
    height: 100%;
    background-color: white;
    font-weight: bold;
    font-size: 5rem;
    color: var(--color-primary);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  CloseTabButton: styled.button`
    position: absolute;
    top: 0px;
    right: 20px;
    color: var(--color-gray02);
  `,
  /*
  Backdrop: styled.section`
    position: absolute;
    left: 80px;
    background-color: pink;
  `,
  */
};

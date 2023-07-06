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
  const [isBookmarkedFaRecListOpened, setIsBookmarkedFaRecListOpened] =
    React.useState(true);

  const handleOpenOrFoldBookmarkedFaRecList = () => {
    setIsBookmarkedFaRecListOpened((prevBool) => !prevBool);
  };

  return (
    <S.AsideContainer>
      <S.Upper>
        <S.Logo>
          <SvgBox>{svgs.logoSymbol}</SvgBox>
          {svgs.logotext}
        </S.Logo>
        <ol>
          <AsideButton leftIcon={svgs.home}>홈</AsideButton>
          <AsideButton leftIcon={svgs.notice}>알림</AsideButton>
          <section>
            <AsideButton
              leftIcon={svgs.faRec}
              dropdownIcon={svgs.dropdown}
              isReverse={isBookmarkedFaRecListOpened}
              onClick={handleOpenOrFoldBookmarkedFaRecList}
            >
              내 가계부
            </AsideButton>
            {isBookmarkedFaRecListOpened ? (
              <ol>
                <AsideButton isSmall={true}>가계부 1</AsideButton>
                <AsideButton isSmall={true}>가계부 2</AsideButton>
                <AsideButton isSmall={true}>가계부 3</AsideButton>
              </ol>
            ) : (
              <ol></ol>
            )}
          </section>
          <AsideButton leftIcon={svgs.ranking}>명예의 전당</AsideButton>
          <AsideButton leftIcon={svgs.search}>검색</AsideButton>
        </ol>
      </S.Upper>
      <S.Lower>
        <S.ProfileBox>
          <S.ProfileLeftSection>
            <S.ProfileImg />
            <S.ProfileTexts>
              <S.Nickname>Waypil</S.Nickname>
              <span>@waypil</span>
            </S.ProfileTexts>
          </S.ProfileLeftSection>
          <S.ProfileRightSection>
            <span>…</span>
          </S.ProfileRightSection>
        </S.ProfileBox>
        <S.SubmitBtn>글 쓰기</S.SubmitBtn>
      </S.Lower>
    </S.AsideContainer>
  );
}

/*
접혔을 때: 104px (6.5rem)
펼쳤을 때: 250px
*/

const S = {
  ...CommonStyles,
  AsideContainer: styled.aside`
    width: 250px;
    height: 100%;
    background-color: white;
    // border: 1px solid;
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
};

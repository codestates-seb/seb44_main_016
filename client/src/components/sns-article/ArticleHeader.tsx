import React from 'react';
import styled from '@emotion/styled';

import { numToStrWithSign } from '../../utils/numToStrWithSign';
import { convertToKoreanDate } from '../../utils/convertToKoreanDate';
import { ScreenEnum } from '../../constants/enums';

/* type은 추후 다른 파일로 분리하고 Import할 예정 */
type PropsFeed = {
  type: 'feed';
  windowType: ScreenEnum;
  isNarrowScreen?: boolean;
  profileImg?: string;
  createdAt: string;
  children?: string;
};
type PropsTimeline = {
  type: 'timeline';
  windowType: ScreenEnum;
  isNarrowScreen?: boolean;
  category: string;
  price: number;
  profileImg?: string;
  faDate: string;
  children?: string;
};

export default function ArticleHeaderComponent(props: PropsFeed | PropsTimeline) {
  const [dateStr, setDateStr] = React.useState('');

  // Date 객체의 hydration 에러로 인한 useEffect 처리
  React.useEffect(() => {
    if (props.type === 'feed') {
      setDateStr(convertToKoreanDate(new Date(props.createdAt)));
    } else {
      setDateStr(convertToKoreanDate(new Date(props.faDate)));
    }
  });

  let PriceText;
  if (props.type === 'feed') {
    PriceText = styled(S.PriceTextBase)``;
  } else {
    PriceText =
      props.price < 0
        ? styled(S.PriceTextBase)`
            color: var(--color-point-red);
          `
        : styled(S.PriceTextBase)`
            color: var(--color-point-blue);
          `;
  }

  return (
    <S.ArticleHeaderContainer className={props.windowType}>
      <S.LeftDiv>
        <S.ProfileImgDiv>
          <S.ProfileImgButton>
            <S.ProfileImg src={props.profileImg} alt='유저 프로필 이미지' />
          </S.ProfileImgButton>
        </S.ProfileImgDiv>
        <S.Texts className={props.windowType}>
          <S.Nickname>{props.children}</S.Nickname>
          {props.type === 'timeline' || props.windowType === ScreenEnum.MOBILE ? (
            <S.DateText>{dateStr}</S.DateText>
          ) : (
            <></>
          )}
        </S.Texts>
      </S.LeftDiv>
      <S.RightDiv className={props.windowType} isNarrowScreen={props.isNarrowScreen}>
        {props.type === 'feed' ? (
          props.windowType === ScreenEnum.MOBILE ? (
            <></>
          ) : (
            <S.DateText>{dateStr}</S.DateText>
          )
        ) : props.category !== '' ? (
          <>
            <S.CategoryContainer>
              <S.CategoryText>{props.category}</S.CategoryText>
            </S.CategoryContainer>
            <PriceText>{numToStrWithSign(props.price)}</PriceText>
          </>
        ) : (
          <PriceText>{numToStrWithSign(props.price)}</PriceText>
        )}
      </S.RightDiv>
    </S.ArticleHeaderContainer>
  );
}
// 팔로우 버튼 추가

const S = {
  ArticleHeaderContainer: styled.div<{ className: ScreenEnum }>`
    width: 100%;
    min-height: 3.5rem;
    padding: 0 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border-bottom: 0.05rem solid var(--color-gray08);

    &.mobile {
      padding: 0 3vw;
    }
  `,
  LeftDiv: styled.div`
    gap: 0.6rem;
    display: flex;
    flex-shrink: 0;
  `,
  Texts: styled.div<{ className: ScreenEnum }>`
    width: 100%;
    padding-top: 0.1rem;
    gap: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &.mobile {
      flex-direction: column;
      align-items: start;
    }

    & > span {
      font-size: 0.75rem;
    }
  `,
  RightDiv: styled.div<{ className?: ScreenEnum; isNarrowScreen?: boolean }>`
    gap: 10px;
    display: flex;
    align-items: baseline;

    &.mobile {
      height: 100%;
      flex-wrap: wrap;
      justify-content: end;
      align-items: end;
      gap: 0.3rem;

      & > span {
        font-size: ${(props) => (props.isNarrowScreen ? '3vw' : '1rem')};
      }
    }
  `,
  Nickname: styled.button`
    font-weight: bold;
    margin-right: 0.1rem;
  `,
  DateText: styled.span`
    font-weight: 500;
    font-size: 0.85rem;
    color: var(--color-gray03);
  `,
  ProfileImgDiv: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ProfileImgButton: styled.button`
    width: 2.5rem; // 40px
    height: 2.5rem; // 40px
    border-radius: 9999px;
    overflow: hidden;
    flex-shrink: 0;
  `,
  ProfileImg: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  CategoryContainer: styled.div`
    height: 1rem;
    display: flex;
    align-items: end;
    flex-shrink: 0;
  `,
  CategoryText: styled.span`
    height: 0.6rem;
    padding: 0rem 0.3rem;
    background-color: #ffdcdd;
    font-weight: 500;
    border-radius: var(--rounded-full);
    display: flex;
    flex-direction: column;
    justify-content: end;
  `,
  PriceTextBase: styled.span`
    font-weight: bold;
  `,
};

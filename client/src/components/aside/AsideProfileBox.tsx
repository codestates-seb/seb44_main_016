import styled from '@emotion/styled';
import Link from 'next/link';

import AsideHamburgerBtn from './AsideHamburgerBtn';

type Props = {
  href?: string;
  className?: string;
};

export default function AsideProfileBox(props: Props) {
  let nickname = '';
  let loginId = '';
  let hamburgerBtn = <></>;

  if (props.className !== 'shrink') {
    nickname = '마마망';
    loginId = '@doyu';
    hamburgerBtn = <AsideHamburgerBtn />;
  }

  return (
    <S.ProfileBoxContainer>
      <S.ProfileLeftBtn href='/user/mypage'>
        <S.ProfileImg />
        <S.ProfileTexts>
          <S.Nickname>{nickname}</S.Nickname>
          <span>{loginId}</span>
        </S.ProfileTexts>
      </S.ProfileLeftBtn>
      <S.ProfileRightDiv>{hamburgerBtn}</S.ProfileRightDiv>
    </S.ProfileBoxContainer>
  );
}

const S = {
  ProfileBoxContainer: styled.div`
    width: 100%;
    height: 3.25rem;
    color: black;
    background-color: white;
    padding-left: 1.25rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  ProfileLeftBtn: styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  ProfileRightDiv: styled.div`
    height: 100%;
    display: flex;
    align-items: start;
    justify-content: space-between;
  `,
  ProfileTexts: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.3rem;
  `,
  Nickname: styled.span`
    font-weight: bold;
  `,
  ProfileImg: styled.img`
    width: 2.5rem; // 40px
    height: 2.5rem; // 40px
    border-radius: var(--rounded-full);
    overflow: hidden;
    flex-shrink: 0;
    background-color: black;
  `,
};

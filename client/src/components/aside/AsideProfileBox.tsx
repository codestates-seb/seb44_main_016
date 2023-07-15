import styled from '@emotion/styled';
import Link from 'next/link';

import AsideHamburgerBtn from './AsideHamburgerBtn';

type Props = {
  href?: string;
  className?: string;
};

export default function AsideProfileBox(props: Props) {
  const [nickname, userId] = props.className === 'tab-closed' ? ['Waypil', '@waypil'] : ['', ''];
  const hamburgerBtn = props.className === 'tab-closed' ? <AsideHamburgerBtn /> : <></>;

  return (
    <S.ProfileBoxContainer href={props.href || ''}>
      <S.ProfileLeftDiv>
        <S.ProfileImg />
        <S.ProfileTexts>
          <S.Nickname>{nickname}</S.Nickname>
          <span>{userId}</span>
        </S.ProfileTexts>
      </S.ProfileLeftDiv>
      <S.ProfileRightDiv>{hamburgerBtn}</S.ProfileRightDiv>
    </S.ProfileBoxContainer>
  );
}

const S = {
  ProfileBoxContainer: styled(Link)`
    width: 100%;
    height: 3.25rem;
    color: black;
    background-color: white;
    padding-left: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  ProfileLeftDiv: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  ProfileRightDiv: styled.div`
    height: 100%;
    padding-right: 1rem;
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

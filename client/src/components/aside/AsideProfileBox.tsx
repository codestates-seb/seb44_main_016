import styled from '@emotion/styled';

type Props = {
  isTabClosed?: boolean;
};

export default function AsideProfileBox(props: Props) {
  return (
    <S.ProfileBoxContainer>
      <S.ProfileLeftSection>
        <S.ProfileImg />
        <S.ProfileTexts>
          <S.Nickname>{props.isTabClosed && 'Waypil'}</S.Nickname>
          <span>{props.isTabClosed && '@waypil'}</span>
        </S.ProfileTexts>
      </S.ProfileLeftSection>
      <S.ProfileRightSection>
        <span>…</span>
      </S.ProfileRightSection>
    </S.ProfileBoxContainer>
  );
}

const S = {
  ProfileBoxContainer: styled.button`
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

import styled from '@emotion/styled';

/* Util 함수는 추후 다른 파일로 분리하고 Import할 예정 */
function getKoreanDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0'); // 한 자릿수라면 앞에 0 추가
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 한 자릿수라면 앞에 0 추가

  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  return formattedDate;
}
function formatNumber(number: number): string {
  const formattedNumber = Math.abs(number).toLocaleString();
  const sign = number >= 0 ? '+' : '-';
  return `${sign}${formattedNumber}`;
}

/* type은 추후 다른 파일로 분리하고 Import할 예정 */
type PropsFeed = {
  type: 'feed';
  profileImg?: string;
  createdAt: Date;
  children: string;
};
type PropsTimeline = {
  type: 'timeline';
  category: string;
  price: number;
  profileImg?: string;
  createdAt: Date;
  children: string;
};

export default function ArticleHeaderComponent(props: PropsFeed | PropsTimeline) {
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
    <S.ArticleHeaderContainer>
      <S.LeftDiv>
        <S.ProfileImgButton>
          <S.ProfileImg src={props.profileImg} alt='유저 프로필 이미지' />
        </S.ProfileImgButton>
        <S.Nickname>{props.children}</S.Nickname>
        {props.type === 'feed' || <S.DateText>{getKoreanDate(props.createdAt)}</S.DateText>}
      </S.LeftDiv>
      <S.RightDiv>
        {props.type === 'feed' ? (
          <S.DateText>{getKoreanDate(props.createdAt)}</S.DateText>
        ) : (
          <>
            {props.category === '' ? <></> : <S.CategoryText>{props.category}</S.CategoryText>}
            <PriceText>{formatNumber(props.price)}</PriceText>
          </>
        )}
      </S.RightDiv>
    </S.ArticleHeaderContainer>
  );
}
// 팔로우 버튼 추가

const S = {
  ArticleHeaderContainer: styled.div`
    width: 100%;
    height: 58px;
    padding: 0px 20px;
    gap: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.05rem solid var(--color-gray08);
  `,
  LeftDiv: styled.div`
    gap: 10px;
    display: flex;
    align-items: center;
  `,
  RightDiv: styled.div`
    gap: 10px;
    display: flex;
    align-items: baseline;
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
  ProfileImgButton: styled.button`
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    overflow: hidden;
    flex-shrink: 0;
  `,
  ProfileImg: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
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

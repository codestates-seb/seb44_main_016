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

export default function ArticleHeaderComponent(
  props: PropsFeed | PropsTimeline
) {
  let PriceText;
  if (props.type === 'feed') {
    PriceText = styled(S.PriceText)``;
  } else {
    PriceText =
      props.price < 0
        ? styled(S.PriceText)`
            color: var(--color-point-red);
          `
        : styled(S.PriceText)`
            color: var(--color-point-blue);
          `;
  }

  return (
    <S.ArticleHeaderContainer>
      <S.LeftDiv>
        <S.ProfileImgButton>
          <S.ProfileImg />
        </S.ProfileImgButton>
        <S.Nickname>{props.children}</S.Nickname>
        {props.type === 'feed' ? (
          <>
            <></>
          </>
        ) : (
          <>
            <section>{getKoreanDate(props.createdAt)}</section>
          </>
        )}
      </S.LeftDiv>
      <S.RightDiv>
        {props.type === 'feed' ? (
          <>
            <section>{getKoreanDate(props.createdAt)}</section>
          </>
        ) : (
          <>
            <span>{props.category}</span>
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
  `,
  LeftDiv: styled.div`
    gap: 10px;
    display: flex;
    align-items: center;
  `,
  RightDiv: styled.div`
    gap: 10px;
    display: flex;
    align-items: center;
  `,
  Nickname: styled.button`
    font-weight: bold;
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
    background-color: black;
  `,
  PriceText: styled.span`
    font-weight: bold;
  `,
};

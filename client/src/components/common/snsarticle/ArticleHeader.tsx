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

type Props = {
  profileImg?: string;
  createdAt: Date;
  children: string;
};

export default function ArticleHeaderComponent(props: Props) {
  return (
    <S.ArticleHeaderContainer>
      <S.Profile>
        <S.ProfileImgButton>
          <S.ProfileImg />
        </S.ProfileImgButton>
        <S.Nickname>{props.children}</S.Nickname>
      </S.Profile>
      <section>{getKoreanDate(props.createdAt)}</section>
    </S.ArticleHeaderContainer>
  );
}

const S = {
  ArticleHeaderContainer: styled.section`
    width: 100%;
    height: 58px;
    padding: 0px 20px;
    gap: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Profile: styled.section`
    gap: 10px;
    display: flex;
    justify-content: center;
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
};

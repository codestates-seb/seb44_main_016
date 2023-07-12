import styled from '@emotion/styled';
import ImgIcon from '../../../../../public/images/icon/img.svg';
import SVGs from '../../../../constants/svg';
import FaRecCarousel from './FaRecCarousel';

type FaRecArticleProps = {
  data: {
    financialRecordId: number;
    category: string;
    faDate: number;
    title: string;
    price: number;
    content: string;
    scope: string;
    imgId: string[];
    userId: number;
  };
};

export default function FaRecArticle({ data }: FaRecArticleProps) {
  return (
    <S.Article>
      <S.Header>
        <span>지출</span>
        <S.Category>카테고리</S.Category>
        <S.Title>제목</S.Title>
        <span>-4,550원</span>
        <S.ImgAndDate>
          <span>
            <ImgIcon />
          </span>
          <span>2023.06.28</span>
        </S.ImgAndDate>
        <S.DropdownIcon>{SVGs.dropdown}</S.DropdownIcon>
      </S.Header>
      <FaRecCarousel />
      <S.Contents>완전 끝내주는 초밥 오마카세를 먹으러 다녀왔다 너무너무마싰다~</S.Contents>
    </S.Article>
  );
}

const S = {
  Article: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: var(--color-white);
    border-radius: var(--rounded-default);
    box-shadow: var(--shadow-default);
  `,
  Header: styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1.25rem;
    gap: 1.68rem;
    font-weight: 500;
  `,
  Title: styled.span`
    flex: 1;
    text-align: left;
  `,
  Category: styled.span`
    width: 6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  ImgAndDate: styled.span`
    display: flex;
    align-items: center;
    gap: 0.875rem;

    & > span:nth-of-type(1) {
      width: 1.125rem;
      & > svg {
        width: 100%;
      }
    }

    & > span:nth-of-type(2) {
      color: var(--color-gray03);
      font-weight: 400;
    }
  `,
  DropdownIcon: styled.span`
    transform: ratate(180deg);
  `,
  Price: styled.span`
    font-weight: 600;
    color: var(--color-point-red);
  `,
  Contents: styled.div`
    width: 100%;
    min-height: 10rem;
    padding: 1.25rem;
  `,
};

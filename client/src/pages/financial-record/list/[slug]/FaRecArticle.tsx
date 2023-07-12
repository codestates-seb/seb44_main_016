import styled from '@emotion/styled';
import ImgIcon from '../../../../../public/images/icon/img.svg';
import SVGs from '../../../../constants/svg';
import FaRecCarousel from './FaRecCarousel';

export default function FaRecArticle() {
  const dummyData = [
    {
      financialRecordId: 1,
      category: '식비',
      faDate: 1657686000000,
      title: '초밥',
      price: -20000,
      content: '완전 끝내주는 초밥 오마카세를 먹으러 다녀왔다 너무너무마싰다~',
      scope: '가계부 타임라인',
      imgId: [
        'https://images.unsplash.com/photo-1563612116625-3012372fccce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=741&q=80',
        'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      ],
      userId: 2,
    },
  ];
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
};

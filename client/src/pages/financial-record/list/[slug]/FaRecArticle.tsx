import styled from '@emotion/styled';
import SVGs from '../../../../constants/svg';
import { useState } from 'react';
import { keyframes } from '@emotion/react';
import { numToStrWithSign } from '../../../../utils/numToStrWithSign';
import { convertToKoreanDate, convertToKoreanMonthDay } from '../../../../utils/convertToKoreanDate';
import ImgsCarousel from '../../../../components/ImgsCarousel';
import Category from '../../../../components/Category';

interface FaRecArticleProps {
  category: string;
  faDate: Date;
  title: string;
  price: number;
  content: string;
  imgPath: string[];
  faRecId: number;
  articleId: number;
}

export default function FaRecArticle(props: FaRecArticleProps) {
  if (!props) {
    return null;
  }
  const { title, price, content, imgPath, faDate, category, faRecId, articleId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const isIncome = price >= 0;

  return (
    <S.Article>
      <S.Header onClick={toggleDropdown}>
        <S.FinancialText isIncome={isIncome}>{price >= 0 ? '수입' : '지출'}</S.FinancialText>
        <S.CategoryWrap>
          <Category category={category} />
        </S.CategoryWrap>
        <S.Title>{title}</S.Title>
        <S.FinancialText isIncome={isIncome}>{numToStrWithSign(price)}</S.FinancialText>
        <S.ImgAndDate>
          <span>{imgPath !== undefined && imgPath.length >= 1 ? SVGs.imgIcon : <></>}</span>
          <span>{faDate ? convertToKoreanMonthDay(faDate) : ''}</span>
        </S.ImgAndDate>
        <S.DropdownIcon isOpen={isOpen}>{SVGs.dropdown}</S.DropdownIcon>
      </S.Header>
      <S.Details isOpen={isOpen}>
        {imgPath !== undefined && imgPath.length >= 1 ? (
          <ImgsCarousel imgPath={imgPath} width={'100%'} />
        ) : (
          <></>
        )}
        <S.Contents>
          <div>
            <span>{title}</span>
            <span>{faDate && convertToKoreanDate(faDate)}</span>
          </div>
          <div>{content}</div>

          <S.ContentBtnWrap>
            <button>수정</button>
            <button>삭제</button>
          </S.ContentBtnWrap>
        </S.Contents>
      </S.Details>
    </S.Article>
  );
}

const slideDown = keyframes`
  0% { max-height: 0; overflow: hidden; }
  100% { max-height: 1000px; overflow: hidden; }
`;

const slideUp = keyframes`
  0% { max-height: 1000px; overflow: hidden; }
  100% { max-height: 0; overflow: hidden; }
`;

const S = {
  Article: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background: var(--color-white);
    border-radius: var(--rounded-default);
    box-shadow: var(--shadow-default);
    margin-bottom: 1.25rem;
  `,
  Header: styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1.25rem;
    gap: 1.68rem;
    font-weight: 500;

    @media screen and (max-width: 768px) {
      gap: 0.8rem;
    }

    @media screen and (max-width: 480px) {
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0.3rem;
      & > span:nth-of-type(4) {
        order: 2;
        width: calc(40% - 0.8rem);
        text-align: right;
      }
    }
    @media screen and (max-width: 360px) {
      & > span:nth-of-type(4) {
        width: calc(40% - 0.3rem);
      }
    }
  `,
  Title: styled.span`
    flex: 1;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    @media screen and (max-width: 480px) {
      flex: 0 0 auto;
      width: 70%;
      order: 1;
    }
    @media screen and (max-width: 480px) {
      width: 60%;
    }
  `,
  CategoryWrap: styled.span`
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
  DropdownIcon: styled.span<{ isOpen: boolean }>`
    transform: rotate(${(props) => (props.isOpen ? 0 : 180)}deg);
    transition: transform 0.3s ease-in-out;
  `,
  FinancialText: styled.span<{ isIncome: boolean }>`
    font-weight: 600;
    color: ${(props) => (props.isIncome ? 'var(--color-point-blue)' : 'var(--color-point-red)')};
  `,
  Details: styled.div<{ isOpen: boolean }>`
    max-height: 0;
    overflow: hidden;
    display: ${(props) => (props.isOpen ? `block` : `none`)};
    animation: ${(props) => (props.isOpen ? slideDown : slideUp)} 0.3s ease-in forwards;
    border-top: 1px solid var(--color-gray08);
  `,
  Contents: styled.div`
    width: 100%;
    min-height: 10rem;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    & > div {
      display: flex;

      &:nth-of-type(1) {
        justify-content: space-between;
        align-items: flex-start;
      }
      & > span:nth-of-type(1) {
        font-weight: 600;
      }
      & > span:nth-of-type(2) {
        color: var(--color-gray03);
        font-size: var(--text-s);
      }
    }
  `,
  ContentBtnWrap: styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding-right: 0.7rem;
    gap: 0.8rem;
    & > button {
      color: var(--color-text-lightgray);
      font-size: var(--text-s);
    }
  `,
};

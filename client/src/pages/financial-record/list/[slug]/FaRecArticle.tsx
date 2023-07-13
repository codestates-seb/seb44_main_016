import styled from '@emotion/styled';
import ImgIcon from '../../../../../public/images/icon/img.svg';
import SVGs from '../../../../constants/svg';
import FaRecCarousel from './FaRecCarousel';
import { useState } from 'react';
import { keyframes } from '@emotion/react';

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
  date: string;
};

export default function FaRecArticle({ data, date }: FaRecArticleProps) {
  const { category, title, price, content, imgId } = data;
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <S.Article>
      <S.Header onClick={toggleDropdown}>
        <span>지출</span>
        <S.Category>{category}</S.Category>
        <S.Title>{title}</S.Title>
        <span>{price}</span>
        <S.ImgAndDate>
          <span>{!!imgId.length && <ImgIcon />}</span>
          <span>{date}</span>
        </S.ImgAndDate>
        <S.DropdownIcon isOpen={isOpen}>{SVGs.dropdown}</S.DropdownIcon>
      </S.Header>
      <S.Details isOpen={isOpen}>
        {!!imgId.length && <FaRecCarousel imgId={imgId} title={title} />}
        <S.Contents>{content}</S.Contents>
      </S.Details>
    </S.Article>
  );
}

const slideDown = keyframes`
  0% { max-height: 0; overflow: hidden; }
  100% { max-height: 700px; overflow: hidden; }
`;

const slideUp = keyframes`
  0% { max-height: 500px; overflow: hidden; }
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
  `,
  Title: styled.span`
    flex: 1;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
  DropdownIcon: styled.span<{ isOpen: boolean }>`
    /* transform: ratate(180deg); */
    transform: rotate(${(props) => (props.isOpen ? 0 : 180)}deg);
    transition: transform 0.3s ease-in-out;
  `,
  Price: styled.span`
    font-weight: 600;
    color: var(--color-point-red);
  `,
  Details: styled.div<{ isOpen: boolean }>`
    max-height: 0;
    overflow: hidden;
    display: ${(props) => (props.isOpen ? `block` : `none`)}
    animation: ${(props) => (props.isOpen ? slideDown : slideUp)} 0.3s ease-in forwards;
  `,
  Contents: styled.div`
    width: 100%;
    min-height: 10rem;
    padding: 1.25rem;
  `,
};

import { useEffect, useState } from 'react';
import SVGs from '../constants/svg';
import styled from '@emotion/styled';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, handlePageChange }: PaginationProps) {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - startPage < 2) {
      endPage = Math.min(totalPages, endPage + (2 - (currentPage - startPage)));
    }
    if (endPage - currentPage < 2) {
      startPage = Math.max(1, startPage - (2 - (endPage - currentPage)));
    }

    setPages(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
  }, [currentPage, totalPages]);

  return (
    <S.Pagination>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label='첫 페이지로 이동하기'
        className='arrow'
      >
        {SVGs.page.first}
      </button>
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        aria-label='이전 페이지로 이동하기'
        className='arrow'
      >
        {SVGs.page.prev}
      </button>
      {pages.map((el) => (
        <button
          key={el}
          onClick={() => handlePageChange(el)}
          disabled={el === currentPage}
          aria-label={`${el}번째 페이지로 이동하기`}
          className={el === currentPage ? 'currentPage' : ''}
        >
          {el}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        aria-label='다음 페이지로 이동하기'
        className='arrow'
      >
        {SVGs.page.next}
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label='마지막 페이지로 이동하기'
        className='arrow'
      >
        {SVGs.page.last}
      </button>
    </S.Pagination>
  );
}

const S = {
  Pagination: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    & > button {
      width: 25px;
      height: 25px;
      border-radius: var(--rounded-full);
      overflow: hidden;
      line-height: 1;
      transition-duration: 0.3s;
      font-weight: 400;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover:not(.arrow, .currentPage) {
        color: var(--color-primary);
      }
      &.arrow:hover {
        background: rgba(0, 0, 0, 0.1);
      }
      &:active {
        transform: scale(0.95);
      }

      &.currentPage {
        background: var(--color-primary);
        color: var(--color-white);
      }
    }
  `,
};

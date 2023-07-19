import { useEffect, useState } from 'react';
import SVGs from '../constants/svg';
import styled from '@emotion/styled';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, handlePageChange }: PaginationProps) {
  const [pageGroup, setPageGroup] = useState<number>(1);

  useEffect(() => {
    setPageGroup(Math.ceil(currentPage / 5));
  }, [currentPage]);

  const pages = Array.from(
    { length: Math.min(5, totalPages - (pageGroup - 1) * 5) },
    (_, i) => 5 * (pageGroup - 1) + (i + 1)
  );

  const handlePrevGroup = () => {
    setPageGroup((current) => Math.max(1, current - 1));
    handlePageChange(5 * (pageGroup - 2) + 5);
  };

  const handleNextGroup = () => {
    setPageGroup((current) => Math.min(Math.ceil(totalPages / 5), current + 1));
    handlePageChange(5 * pageGroup + 1);
  };

  return (
    <S.Pagination>
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        aria-label='첫 페이지로 이동하기'
        className='arrow'
      >
        {SVGs.page.first}
      </button>
      <button
        onClick={handlePrevGroup}
        disabled={currentPage === 1 || pageGroup === 1}
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
        onClick={handleNextGroup}
        disabled={currentPage === totalPages || pageGroup >= Math.ceil(totalPages / 5)}
        aria-label='다음 페이지로 이동하기'
        className='arrow'
      >
        {SVGs.page.next}
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
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
    margin: 1.5rem 0 0;
    gap: 10px;
    @media screen and (max-width: 480px) {
      gap: 6px;
    }
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

      padding-top: 2px;
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

      @media screen and (max-width: 480px) {
        width: 20px;
        height: 20px;
      }
    }
  `,
};

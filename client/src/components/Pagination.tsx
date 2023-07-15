import { useEffect, useState } from 'react';

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
    <div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label='첫 페이지로 이동하기'
      >
        &laquo;
      </button>
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        aria-label='이전 페이지로 이동하기'
      >
        &lt;
      </button>
      {pages.map((el) => (
        <button
          key={el}
          onClick={() => handlePageChange(el)}
          disabled={el === currentPage}
          aria-label={`${el}번째 페이지로 이동하기`}
        >
          {el}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        aria-label='다음 페이지로 이동하기'
      >
        &gt;
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label='마지막 페이지로 이동하기'
      >
        &raquo;
      </button>
    </div>
  );
}

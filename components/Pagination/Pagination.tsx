import ReactPaginate from 'react-paginate';
import css from '@/components/Pagination/Pagination.module.css';

interface PaginationProps {
  totalPages: number | undefined;
  page: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({ totalPages, page, onPageChange }: PaginationProps) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={onPageChange}
      forcePage={page - 1}

      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.page}
      previousLabel="←"
      nextLabel="→"
    />
  );
}
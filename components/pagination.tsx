import React from 'react';

interface PaginationProps {
  totalItems: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TablePagination: React.FC<PaginationProps> = ({
  totalItems,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const handlePrevPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (currentPage > 1) onPageChange(event, currentPage - 1);
  };
  const handleNextPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (currentPage < totalPages) onPageChange(event, currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <select
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
          className="border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <span className="ml-2 text-sm">items per page</span>
      </div>

      <div className="flex items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="mx-2 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;

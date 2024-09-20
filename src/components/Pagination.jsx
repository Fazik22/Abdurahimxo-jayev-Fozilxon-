import { Pagination as FlowbitePagination } from "flowbite-react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex overflow-x-auto sm:justify-center text-[#87CEEB]">
      <FlowbitePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Pagination;

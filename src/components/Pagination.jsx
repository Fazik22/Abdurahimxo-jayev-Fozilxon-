import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center mt-4">
      <nav className="flex">
        <ul className="flex space-x-2">
          {pages.map((page) => (
            <li key={page}>
              <button
                className={`px-4 py-2 rounded ${page === currentPage ? 'bg-[rgba(255,255,255,0.4)] text-black' : 'bg-gray-200'} hover:bg-gray-300`}
                onClick={() => {
                  console.log(`Page ${page}`);
                  onPageChange(page);
                }}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;

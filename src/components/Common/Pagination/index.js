import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { LIMIT } from "@/utils";

const Pagination = ({ page, onPagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [];
  const totalPage = Math.ceil(page / LIMIT);
  for (let index = 0; index < totalPage; index++) {
    pages.push(index + 1);
  }

  const handleNext = () => {
    if (currentPage == pages.length) return;
    setCurrentPage((prev) => prev + 1);
    onPagination(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage == 1) return;
    setCurrentPage((prev) => prev - 1);
    onPagination(currentPage - 1);
  };

  const handlePage = (item) => {
    setCurrentPage(item);
    onPagination(item);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentPage}</span> to{" "}
            <span className="font-medium">{pages.length}</span> of{" "}
            <span className="font-medium">{page}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <span
              onClick={() => handlePrev()}
              href="#"
              className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </span>

            {pages.map((item) => (
              <span
                onClick={() => handlePage(item)}
                key={item}
                href="#"
                className={`${
                  currentPage == item ? "bg-indigo-600 text-white" : ""
                } relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 cursor-pointer`}
              >
                {item}
              </span>
            ))}

            <span
              onClick={() => handleNext()}
              href="#"
              className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

"use client";

import Pagination from "../Pagination";

type Pagination = {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
  limit: number;
};

interface Props {
  title: string | JSX.Element;
  columns: JSX.Element[];
  rows: JSX.Element[];
  ActionHeader?: JSX.Element;
  className?: string;
  pagination?: Pagination;
}

const Table: React.FC<Props> = ({
  columns,
  rows,
  title,
  ActionHeader,
  pagination,
  className
}) => {
  return (
    <div className={`w-[520px] lg:w-auto ${className}`}>
      <div
        className={`mt-4 overflow-x-scroll rounded-[7px] bg-white pl-7 pr-7 pt-7 shadow-1 dark:bg-gray-dark dark:shadow-card`}
      >
        <div className="flex w-full justify-between">
          {typeof title === "string" ? (
            <h2 className="text-2xl font-bold dark:text-white">{title}</h2>
          ) : (
            title
          )}

          {ActionHeader}
        </div>

        <div className="overflow-x-scroll">
          <table className="mt-5 overflow-x-scroll">
            <thead>
              <tr className="border-t border-stroke">{columns}</tr>
            </thead>
            <tbody className="text-center">{rows}</tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-center rounded-b-[7px] bg-gray-200 p-2 dark:bg-dark">
        {pagination && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Table;

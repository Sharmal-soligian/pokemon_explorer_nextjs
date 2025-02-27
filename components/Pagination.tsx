"use client";

import React, { useMemo } from "react";

interface PaginationProps {
  limit: number;
  setLimit: (limit: number) => void;
  offset: number;
  setOffset: (offset: number) => void;
  total: number;
}

const Pagination: React.FC<PaginationProps> = ({
  limit,
  offset,
  setOffset,
  total,
}) => {
  const totalPages = useMemo(() => Math.ceil(total / limit), [limit, total]);
  const currentPage = useMemo(
    () => Math.floor(offset / limit) + 1,
    [limit, offset]
  );

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        disabled={offset === 0}
        onClick={() => setOffset(0)}
        className="flex items-center justify-center text-pokemon-white disabled:opacity-50 underline"
      >
        {"First"}
      </button>

      {currentPage > 1 && (
        <button
          onClick={() => setOffset(offset - limit)}
          className="w-8 h-8 flex items-center justify-center text-pokemon-white border rounded-full"
        >
          {"<"}
        </button>
      )}

      {currentPage > 2 && (
        <button
          onClick={() => setOffset(offset - limit * 1)}
          className="w-8 h-8 flex items-center justify-center text-pokemon-white border rounded-full"
        >
          {currentPage - 1}
        </button>
      )}

      <button className="w-8 h-8 flex items-center justify-center border rounded-full bg-pokemon-blue text-white">
        {currentPage}
      </button>

      {currentPage < totalPages - 1 && (
        <button
          onClick={() => setOffset(offset + limit * 1)}
          className="w-8 h-8 flex items-center justify-center text-pokemon-white border rounded-full"
        >
          {currentPage + 1}
        </button>
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => setOffset(offset + limit)}
          className="w-8 h-8 flex items-center justify-center text-pokemon-white border rounded-full"
        >
          {">"}
        </button>
      )}

      <button
        disabled={offset + limit >= total}
        onClick={() => setOffset((totalPages - 1) * limit)}
        className="flex items-center justify-center text-pokemon-white disabled:opacity-50 underline"
      >
        {"Last"}
      </button>
    </div>
  );
};

export default Pagination;

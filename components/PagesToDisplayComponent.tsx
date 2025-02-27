import React from "react";

interface PagesToDisplayComponentProps {
  limit: number;
  setLimit: (limit: number) => void;
  setOffset: (offset: number) => void;
}

const PagesToDisplayComponent: React.FC<PagesToDisplayComponentProps> = ({
  limit,
  setLimit,
  setOffset,
}) => {
  return (
    <select
      value={limit}
      onChange={(e) => {
        setLimit(Number(e.target.value));
        setOffset(0);
      }}
      className="border p-2 rounded bg-pokemon-blue"
    >
      <option value={10}>Show 10</option>
      <option value={20}>Show 20</option>
      <option value={30}>Show 30</option>
    </select>
  );
};

export default PagesToDisplayComponent;

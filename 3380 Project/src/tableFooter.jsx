import React, { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="tableFooter">
      {range.map((item, index) => (
        <button
          key={index}
          className={`button} ${page === item ? activeButton : inactiveButton}`}
          onClick={() => setPage(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;

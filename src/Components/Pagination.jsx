/* eslint-disable react/prop-types */
// import React from "react";
import { HiOutlineBackward } from "react-icons/hi2";
import { PiFastForwardDuotone } from "react-icons/pi";
import "./Pagination.css"; // Import the CSS for pagination styling

export const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page changes
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination-controls">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn prev"
      >
        <HiOutlineBackward size={20} />
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn next"
      >
        Next
        <PiFastForwardDuotone size={20} />
      </button>
    </div>
  );
};

import React from 'react';
import './Paging.css';

const Paging = ({ pageNumber, pageSize, totalItems, onPageChange, onPageSizeChange}) => {
  const totalPages = pageSize > 0 ? Math.ceil(totalItems / pageSize) : 1;

  const handlePageSizeChange = (e) => {
    const newPageSize = parseInt(e.target.value, 10);
    onPageSizeChange(newPageSize);
  };

  const incrementPageNumber = () => {
    if (pageNumber < totalPages) {
      onPageChange(pageNumber + 1);
    }
  };

  const decrementPageNumber = () => {
    if (pageNumber > 1) {
      onPageChange(pageNumber - 1);
    }
  };


  return (
    <div className="pagination-controls">
      <div className="pagination-row">
        <div className='pagination-cell'>
          <label>
            Page Number:
            <button onClick={decrementPageNumber} disabled={pageNumber === 1}>Prev</button>
            <span>{pageNumber}</span>
            <button onClick={incrementPageNumber} disabled={pageNumber === totalPages}>Next</button>
          </label>
        </div>
        <div className='pagination-cell'>
          <label>
            Page Size:
            <select value={pageSize} onChange={handlePageSizeChange}>
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </label>
        </div>
        <div className='pagination-cell'>
          Page {pageNumber} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default Paging;

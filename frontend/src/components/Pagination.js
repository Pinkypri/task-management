import React from 'react';
import Button from './ui/Button';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, hasNext, hasPrev }) => {
  if (totalPages <= 1) return (
    <div className="pagination-simple">
      <button className="page-btn" disabled>Previous</button>
      <span className="page-info">Page 1 of 1</span>
      <button className="page-btn" disabled>Next</button>
    </div>
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing page {currentPage} of {totalPages} ({totalItems} total items)
      </div>
      
      <div className="pagination-controls">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
        >
          Previous
        </Button>
        
        {currentPage > 3 && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(1)}
            >
              1
            </Button>
            {currentPage > 4 && <span className="pagination-dots">...</span>}
          </>
        )}
        
        {getPageNumbers().map(page => (
          <Button
            key={page}
            variant={page === currentPage ? "primary" : "secondary"}
            size="sm"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="pagination-dots">...</span>}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
        
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
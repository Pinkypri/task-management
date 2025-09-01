import React from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';

const TaskFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="filter-modern">
      <div className="search-container">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          name="search"
          value={filters.search || ''}
          onChange={handleChange}
          placeholder="Search tasks..."
          className="search-input-modern"
        />
      </div>
      
      <div className="filter-container">
        <svg className="filter-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
        </svg>
        <select
          name="status"
          value={filters.status || ''}
          onChange={handleChange}
          className="status-filter-modern"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      {(filters.search || filters.status) && (
        <button onClick={onClearFilters} className="clear-btn-modern">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default TaskFilter;
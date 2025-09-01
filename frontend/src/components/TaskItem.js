import React from 'react';
import Button from './ui/Button';
import Card from './ui/Card';

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Invalid';
    }
  };

  const isOverdue = () => {
    const endDate = new Date(task.endDate);
    const today = new Date();
    return endDate < today && task.status !== 'completed';
  };

  return (
    <div className="task-row-modern">
      <div className="task-info">
        <span className={`status-dot-modern ${task.status.replace(' ', '')}`}></span>
        <div className="task-content">
          <div className="task-title-row">
            <span className="task-name">{task.name}</span>
            {isOverdue() && <span className="overdue-dot">!</span>}
          </div>
          <span className="task-desc">{task.description}</span>
        </div>
      </div>
      
      <div className="task-dates-compact">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
        </svg>
        <span>{formatDate(task.startDate)} - {formatDate(task.endDate)}</span>
      </div>
      
      <span className={`status-badge ${task.status.replace(' ', '')}`}>
        {task.status === 'pending' ? 'Pending' : 
         task.status === 'in progress' ? 'Progress' : 'Done'}
      </span>
      
      <div className="task-actions-compact">
        <button onClick={() => onEdit(task)} className="btn-compact edit">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
        <button onClick={() => onDelete(task._id)} className="btn-compact delete">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
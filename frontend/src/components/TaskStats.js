import React from 'react';
import Card from './ui/Card';

const TaskStats = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <div className="stats-modern">
      <div className="stat-card-modern total">
        <div className="stat-icon-modern">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <div className="stat-content-modern">
          <div className="stat-number-modern">{stats.total}</div>
          <div className="stat-label-modern">Total Tasks</div>
        </div>
      </div>
      
      <div className="stat-card-modern pending">
        <div className="stat-icon-modern">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div className="stat-content-modern">
          <div className="stat-number-modern">{stats.pending}</div>
          <div className="stat-label-modern">Pending</div>
        </div>
      </div>
      
      <div className="stat-card-modern progress">
        <div className="stat-icon-modern">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8z"/>
          </svg>
        </div>
        <div className="stat-content-modern">
          <div className="stat-number-modern">{stats.inProgress}</div>
          <div className="stat-label-modern">In Progress</div>
        </div>
      </div>
      
      <div className="stat-card-modern completed">
        <div className="stat-icon-modern">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        </div>
        <div className="stat-content-modern">
          <div className="stat-number-modern">{stats.completed}</div>
          <div className="stat-label-modern">Completed</div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
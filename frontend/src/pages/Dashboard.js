import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import TaskFilter from '../components/TaskFilter';
import Pagination from '../components/Pagination';
import TaskStats from '../components/TaskStats';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filters, setFilters] = useState({ search: '', status: '' });
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const { user } = useAuth();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTasks(1);
      setPagination(prev => ({ ...prev, page: 1 }));
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handlePageChange = (page) => {
    fetchTasks(page);
  };

  const fetchTasks = async (page = 1) => {
    try {
      setLoading(true);
      const params = { page, limit: 5 };
      if (filters.search) params.search = filters.search;
      if (filters.status) params.status = filters.status;
      
      const data = await taskAPI.getTasks(params);
      setTasks(data.data || []);
      
      const totalPages = data.pagination?.next || data.pagination?.prev ? 
        Math.ceil((data.count || data.total || tasks.length) / 5) : 1;
      
      setPagination({
        page: page,
        pages: totalPages,
        total: data.count || data.total || tasks.length
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskAPI.updateTask(editingTask._id, taskData);
      } else {
        await taskAPI.createTask(taskData);
      }
      setShowTaskModal(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleDeleteTask = (taskId) => {
    setDeleteConfirm(taskId);
  };

  const confirmDelete = async () => {
    try {
      await taskAPI.deleteTask(deleteConfirm);
      setDeleteConfirm(null);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskAPI.updateTask(taskId, { status: newStatus });
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({ search: '', status: '' });
  };

  const getTaskStats = () => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  });

  const stats = getTaskStats();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header-compact">
        <div className="welcome-compact">
          <h2>Welcome, {user?.name || 'User'}</h2>
        </div>
        <Button variant="primary" size="sm" onClick={handleAddTask}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '6px'}}>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Add Task
        </Button>
      </div>

      <TaskStats tasks={tasks} />

      <TaskFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <Card className="tasks-section">
        <h3>Your Tasks ({tasks.length})</h3>
        {error && <div className="error-message">{error}</div>}
        
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="#bdc3c7">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <h4>No Tasks Found</h4>
            <p>You haven't created any tasks yet. Start by creating your first task!</p>
          </div>
        ) : (
          <>
            <div className="tasks-list">
              {tasks.map(task => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
      
            
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              totalItems={pagination.total}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Card>

      {/* Task Modal */}
      <Modal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={() => setShowTaskModal(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Confirm Delete"
      >
        <div className="delete-confirm">
          <p>Are you sure you want to delete this task? This action cannot be undone.</p>
          <div className="delete-actions">
            <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete Task
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
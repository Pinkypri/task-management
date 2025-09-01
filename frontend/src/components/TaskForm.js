import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    totalTask: 1,
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || '',
        description: task.description || '',
        startDate: task.startDate ? new Date(task.startDate).toISOString().split('T')[0] : '',
        endDate: task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '',
        totalTask: task.totalTask || 1,
        status: task.status || 'pending'
      });
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Task name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (formData.startDate && formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be same or after start date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalTask' ? parseInt(value) || 1 : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const taskData = {
        ...formData,
        startDate: formData.startDate,
        endDate: formData.endDate
      };
      await onSave(taskData);
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
      <form onSubmit={handleSubmit}>
        <Input
          label="Task Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter task name"
        />
        
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`form-control ${errors.description ? 'error' : ''}`}
            placeholder="Enter task description"
            rows="3"
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>
        
        <div className="form-row">
          <Input
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            error={errors.startDate}
          />
          <Input
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            error={errors.endDate}
          />
        </div>
        
        <div className="form-row">
          <Input
            label="Total Tasks"
            type="number"
            name="totalTask"
            value={formData.totalTask}
            onChange={handleChange}
            min="1"
          />
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-control"
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        
        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            {task ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
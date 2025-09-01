const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

export const authAPI = {
  login: async (credentials) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return data.data;
  },

  register: async (userData) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return data.data;
  },
};

export const taskAPI = {
  getTasks: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/tasks?${queryString}` : '/tasks';
    return await apiRequest(endpoint);
  },

  createTask: async (taskData) => {
    const data = await apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
    return data.data;
  },

  updateTask: async (id, taskData) => {
    const data = await apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
    return data.data;
  },

  deleteTask: async (id) => {
    return await apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
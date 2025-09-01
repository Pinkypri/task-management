const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Task name is required'],
    trim: true,
    maxlength: [100, 'Task name cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(value) {
        if (!this.startDate) return true;
        const startDate = new Date(this.startDate);
        const endDate = new Date(value);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        return endDate >= startDate;
      },
      message: 'End date must be same or after start date'
    }
  },
  totalTask: {
    type: Number,
    required: [true, 'Total task is required'],
    min: [1, 'Total task must be at least 1']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in progress', 'completed'],
      message: 'Status must be pending, in progress, or completed'
    },
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
taskSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);
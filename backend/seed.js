const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');
const Task = require('./src/models/Task');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    // Create sample user
    const hashedPassword = await bcrypt.hash('password123', 12);
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      mobileNumber: '1234567890',
      password: hashedPassword,
      country: 'USA',
      city: 'New York',
      state: 'NY',
      gender: 'male'
    });

    // Create sample tasks
    const tasks = [
      {
        name: 'Complete project proposal',
        description: 'Write and submit the quarterly project proposal',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-15'),
        totalTask: 1,
        status: 'completed',
        user: user._id
      },
      {
        name: 'Review team feedback',
        description: 'Go through all team feedback and implement changes',
        startDate: new Date('2024-01-10'),
        endDate: new Date('2024-01-20'),
        totalTask: 3,
        status: 'in progress',
        user: user._id
      },
      {
        name: 'Update documentation',
        description: 'Update all project documentation with latest changes',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-25'),
        totalTask: 2,
        status: 'pending',
        user: user._id
      },
      {
        name: 'Prepare presentation',
        description: 'Create slides for the upcoming client presentation',
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-01-30'),
        totalTask: 1,
        status: 'pending',
        user: user._id
      },
      {
        name: 'Code review session',
        description: 'Conduct code review for the new features',
        startDate: new Date('2024-01-12'),
        endDate: new Date('2024-01-18'),
        totalTask: 4,
        status: 'completed',
        user: user._id
      },
      {
        name: 'Database optimization',
        description: 'Optimize database queries for better performance',
        startDate: new Date('2024-01-25'),
        endDate: new Date('2024-02-05'),
        totalTask: 2,
        status: 'in progress',
        user: user._id
      }
    ];

    await Task.insertMany(tasks);

    console.log('✅ Sample data seeded successfully!');
    console.log('📧 Login with: john@example.com');
    console.log('🔑 Password: password123');
    
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();
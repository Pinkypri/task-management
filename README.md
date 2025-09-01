# Task Management Application

A full-stack task management application built with Node.js, Express, MongoDB, and React.js.

## Features

### Backend Features
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose
- ✅ JWT Authentication
- ✅ User registration and login
- ✅ CRUD operations for tasks
- ✅ Pagination for task listing
- ✅ Task filtering by status
- ✅ Input validation and error handling
- ✅ User profile management

### Frontend Features
- ✅ React.js with modern hooks
- ✅ User authentication (login/register)
- ✅ Task dashboard with pagination
- ✅ Add, edit, delete tasks
- ✅ Task status management
- ✅ Search and filter functionality
- ✅ User profile management
- ✅ Responsive design
- ✅ Modern UI with animations

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Context API** - State management
- **CSS3** - Styling with modern features

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Tasks
- `GET /api/tasks` - Get all tasks (with pagination & filtering)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Database Schemas

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  mobileNumber: String (required),
  password: String (required, encrypted),
  country: String (required),
  city: String (required),
  state: String (required),
  gender: String (required)
}
```

### Task Schema
```javascript
{
  name: String (required),
  description: String,
  startDate: Date (required),
  endDate: Date (required),
  totalTask: Number (required),
  status: String (enum: pending, in progress, completed),
  user: ObjectId (ref: User)
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your MongoDB URI and JWT secret in .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Environment Variables
Create `.env` file in backend directory:
```
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Project Structure

```
ad-hash-project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── .gitignore
└── README.md
```

## Usage

1. **Register/Login**: Create account or login with existing credentials
2. **Dashboard**: View task statistics and manage tasks
3. **Add Tasks**: Create new tasks with details
4. **Manage Tasks**: Edit, delete, or update task status
5. **Search & Filter**: Find tasks by name or filter by status
6. **Profile**: Update user profile information

## Features Implemented

### Technical Requirements ✅
- [x] Node.js backend with Express.js
- [x] MongoDB with Mongoose
- [x] JWT authentication middleware
- [x] Input validation and error handling
- [x] RESTful API design
- [x] React.js frontend
- [x] Component-based architecture
- [x] State management with hooks
- [x] Responsive design

### Additional Features ✅
- [x] Pagination for task listing
- [x] Task filtering by status
- [x] Search functionality
- [x] User profile management
- [x] Modern UI with animations
- [x] Form validation
- [x] Error handling
- [x] Loading states

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any queries or support, please contact me.
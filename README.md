# Exercise Tracker - MERN Stack CRUD Application

A full-stack web application for tracking exercises built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to create, read, update, and delete exercise records with details like name, reps, weight, unit, and date.

## 🚀 Features

- **Create** new exercise records
- **Read** and view all exercises in a table format
- **Update** existing exercise records
- **Delete** exercise records
- **Responsive design** with modern UI
- **Real-time data** synchronization between frontend and backend
- **Data validation** on both client and server side

## 📁 Project Structure

```
CRUD-app/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── ExerciseRow.jsx
│   │   │   ├── ExerciseTable.jsx
│   │   │   └── Navigation.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreateExercisePage.jsx
│   │   │   └── EditExercisePage.jsx
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js       # Vite configuration with proxy
├── restapi/                 # Node.js backend API
│   ├── exercises_controller.mjs  # Express routes and server
│   ├── exercises_model.mjs       # Mongoose models and database logic
│   └── package.json
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js**
- **MongoDB**

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd CRUD-app
   ```

2. **Set up the Backend (REST API)**
   ```bash
   cd restapi
   npm install
   ```

3. **Create environment file for backend**
   Create a `.env` file in the `restapi/` directory:
   ```env
   PORT=3000
   MONGODB_CONNECT_STRING=mongodb://localhost:27017/exercise_db
   ```
   
   **For MongoDB Atlas (cloud):**
   ```env
   PORT=3000
   MONGODB_CONNECT_STRING=mongodb+srv://username:password@cluster.mongodb.net/exercise_db
   ```

4. **Set up the Frontend (React App)**
   ```bash
   cd ../frontend
   npm install
   ```

### 🏃‍♂️ Running the Application

You need to run both the backend and frontend servers simultaneously:

#### Terminal 1 - Backend Server
```bash
cd restapi
npm start
```
The backend will start on `http://localhost:3000`

#### Terminal 2 - Frontend Server
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

### 🌐 Access the Application

Open your browser and navigate to:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000`

## 📊 API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/exercises` | Get all exercises |
| GET | `/exercises/:id` | Get exercise by ID |
| POST | `/exercises` | Create new exercise |
| PUT | `/exercises/:id` | Update exercise by ID |
| DELETE | `/exercises/:id` | Delete exercise by ID |

### Exercise Data Model

```javascript
{
  "name": "Push-ups",           // String, required
  "reps": 20,                   // Number, required, min: 1
  "weight": 0,                  // Number, required, min: 1
  "unit": "kgs",                // String, required, enum: ["kgs", "lbs"]
  "date": "25-01-2025"          // String, required, format: DD-MM-YY
}
```

## 🎯 Usage

1. **View Exercises**: Navigate to the home page to see all your exercises in a table
2. **Add Exercise**: Click "Create Exercise" to add a new exercise record
3. **Edit Exercise**: Click the edit button on any exercise row to modify it
4. **Delete Exercise**: Click the delete button to remove an exercise
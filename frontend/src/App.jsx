import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import EditExercisePage from './pages/EditExercisePage'
import CreateExercisePage from './pages/CreateExercisePage'
import './App.css'
import { useState } from 'react'

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="app">
      <Router>
        <header>
          <h1>Exercise Tracker</h1>
          <p>Track your exercises with ease!</p>
        </header>
        <Navigation />
        <main className="page-container">
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}></Route>
            <Route path="/create" element={ <CreateExercisePage />}></Route>
            <Route path="/edit" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
          </Routes>
        </main>
        <footer>© 2025 Humza Hussain</footer>
      </Router>
    </div>
  );
}

export default App;
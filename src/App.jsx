import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Login from './pages/Login';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App

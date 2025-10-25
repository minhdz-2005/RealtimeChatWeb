import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Login from './pages/Login';
import Messages from './pages/Messages';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </Router>
  )
}

export default App

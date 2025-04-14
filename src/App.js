import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MapPage from './pages/MapPage';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#eee' }}>
        <Link to="/map" style={{ marginRight: '10px' }}>Map</Link>
        <Link to="/signup" style={{ marginRight: '10px' }}>Signup</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/map" element={<MapPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

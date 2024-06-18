
import './App.css';
import Tours from './components/Tours';
import Navbar from './components/NavBar';
import Login from './components/Login';
import Reservas from './components/Reservas';
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  const handleLogin = (credentials) => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsAuthenticated(true);
  };

  return (

    
    <Router>
    <div className="App">
    {isAuthenticated  && <Navbar />}
    <Routes>
          <Route path="/" element={!isAuthenticated  ? <Login handleLogin={handleLogin} /> : <Navigate to="/tours" />} />
          <Route path="/tours" element={isAuthenticated ? <Tours /> : <Navigate to="/" />} />
          <Route path="/tours/reservas" element={isAuthenticated ? <Reservas /> : <Navigate to="/" />} />
        </Routes>
    </div>
  </Router>
  );
}

export default App;

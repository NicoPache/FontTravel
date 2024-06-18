
import './App.css';
import Tours from './components/Tours';
import Navbar from './components/NavBar';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/tours" element={<Tours />} />
        {/* Agrega aquí más rutas según sea necesario */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;

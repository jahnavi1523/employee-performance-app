import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import EmployeeList from './pages/EmployeeList';
import AIRecommendation from './pages/AIRecommendation';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
        <Route path="/add-employee" element={<><Navbar /><AddEmployee /></>} />
        <Route path="/employees" element={<><Navbar /><EmployeeList /></>} />
        <Route path="/ai-recommendation" element={<><Navbar /><AIRecommendation /></>} />
      </Routes>
    </Router>
  );
}

export default App;
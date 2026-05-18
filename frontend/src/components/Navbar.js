import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{ background: '#007bff', padding: '10px 20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
      <Link to="/add-employee" style={{ color: 'white', textDecoration: 'none' }}>Add Employee</Link>
      <Link to="/employees" style={{ color: 'white', textDecoration: 'none' }}>Employees</Link>
      <Link to="/ai-recommendation" style={{ color: 'white', textDecoration: 'none' }}>AI Recommendation</Link>
      <button onClick={handleLogout} style={{ marginLeft: 'auto', padding: '6px 12px', background: 'white', color: '#007bff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
    </nav>
  );
}

export default Navbar;
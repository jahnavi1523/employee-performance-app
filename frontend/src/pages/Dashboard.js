import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('https://employee-performance-app-a6mj.onrender.com/api/employees', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmployees(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', background: '#007bff', color: 'white', borderRadius: '8px', minWidth: '150px' }}>
          <h3>Total Employees</h3>
          <p style={{ fontSize: '32px' }}>{employees.length}</p>
        </div>
        <div style={{ padding: '20px', background: '#28a745', color: 'white', borderRadius: '8px', minWidth: '150px' }}>
          <h3>Avg Performance</h3>
          <p style={{ fontSize: '32px' }}>
            {employees.length > 0
              ? (employees.reduce((sum, e) => sum + e.performanceScore, 0) / employees.length).toFixed(1)
              : 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
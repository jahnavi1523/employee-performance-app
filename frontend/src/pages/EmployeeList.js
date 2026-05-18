import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  const fetchEmployees = async (dept = '') => {
    try {
      const url = dept
        ? `https://employee-performance-backend.onrender.com/api/employees/search?department=${dept}`
        : 'https://employee-performance-backend.onrender.com/api/employees';
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://employee-performance-backend.onrender.com/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Employee List</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input placeholder="Search by department..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '8px', width: '300px' }} />
        <button onClick={() => fetchEmployees(search)} style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Search</button>
        <button onClick={() => { setSearch(''); fetchEmployees(); }} style={{ padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>Reset</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#007bff', color: 'white' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Department</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Score</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Experience</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Skills</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px' }}>{emp.name}</td>
              <td style={{ padding: '10px' }}>{emp.email}</td>
              <td style={{ padding: '10px' }}>{emp.department}</td>
              <td style={{ padding: '10px' }}>{emp.performanceScore}</td>
              <td style={{ padding: '10px' }}>{emp.experience}</td>
              <td style={{ padding: '10px' }}>{emp.skills.join(', ')}</td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => handleDelete(emp._id)} style={{ padding: '4px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
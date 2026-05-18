import React, { useState } from 'react';
import axios from 'axios';

function AddEmployee() {
  const [form, setForm] = useState({ name: '', email: '', department: '', skills: '', performanceScore: '', experience: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const employeeData = {
        ...form,
        skills: form.skills.split(',').map(s => s.trim()),
        performanceScore: Number(form.performanceScore),
        experience: Number(form.experience)
      };
      await axios.post('http://localhost:5000/api/employees', employeeData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Employee added successfully!');
      setForm({ name: '', email: '', department: '', skills: '', performanceScore: '', experience: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding employee');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Add Employee</h2>
      {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'department', 'skills', 'performanceScore', 'experience'].map(field => (
          <div key={field} style={{ marginBottom: '10px' }}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}{field === 'skills' ? ' (comma separated)' : ''}</label>
            <input name={field} value={form[field]} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '4px' }} required />
          </div>
        ))}
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
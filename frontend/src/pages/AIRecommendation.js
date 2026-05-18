import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AIRecommendation() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleRecommend = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const res = await axios.post('https://employee-performance-app-a6mj.onrender.com/api/ai/recommend',
        { employee: selected },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecommendation(res.data.recommendation);
    } catch (err) {
      setRecommendation('Error getting recommendation');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI Recommendation</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>Select Employee:</label>
        <select onChange={e => setSelected(employees.find(emp => emp._id === e.target.value))} style={{ marginLeft: '10px', padding: '8px', width: '300px' }}>
          <option value="">-- Select --</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.name} - {emp.department}</option>
          ))}
        </select>
      </div>
      <button onClick={handleRecommend} disabled={loading} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        {loading ? 'Getting Recommendation...' : 'Get AI Recommendation'}
      </button>
      {recommendation && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
          <h3>AI Recommendation:</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default AIRecommendation;
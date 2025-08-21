import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getData();
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home-page">
      <section className="hero">
        <h2>Welcome to My car</h2>
        <p>Create a car maintenance app with service scheduling, mileage tracking, expense logging, maintenance reminders, fuel efficiency monitoring, and service history. Include maintenance checklist templates, cost per mile calculations, and vehicle performance analytics. Target audience: car owners, fleet managers, and automotive enthusiasts.</p>
      </section>
      
      
      <section className="analytics-section">
        <h3>Analytics</h3>
        <div className="feature-content">
          {/* Analytics implementation goes here */}
        </div>
      </section>
      
      
      <section className="data-display">
        <h3>Data Overview</h3>
        <div className="data-grid">
          {data.map((item, index) => (
            <div key={index} className="data-item">
              <h4>{item.title || `Item ${index + 1}`}</h4>
              <p>{item.description || 'No description available'}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
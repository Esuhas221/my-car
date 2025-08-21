import React from 'react';
import './App.css';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My car</h1>
        <p>Create a car maintenance app with service scheduling, mileage tracking, expense logging, maintenance reminders, fuel efficiency monitoring, and service history. Include maintenance checklist templates, cost per mile calculations, and vehicle performance analytics. Target audience: car owners, fleet managers, and automotive enthusiasts.</p>
      </header>
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;
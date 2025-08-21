const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store (replace with database in production)
let dataStore = [];
let idCounter = 1;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'My car API is running',
    timestamp: new Date().toISOString()
  });
});

// CRUD endpoints for main data
app.get('/api/data', (req, res) => {
  res.json({ data: dataStore, total: dataStore.length });
});

app.post('/api/data', (req, res) => {
  const newItem = {
    id: idCounter++,
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  dataStore.push(newItem);
  res.status(201).json({ data: newItem, message: 'Data created successfully' });
});

app.get('/api/data/:id', (req, res) => {
  const item = dataStore.find(d => d.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Data not found' });
  }
  res.json({ data: item });
});

app.put('/api/data/:id', (req, res) => {
  const index = dataStore.findIndex(d => d.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Data not found' });
  }
  
  dataStore[index] = {
    ...dataStore[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json({ data: dataStore[index], message: 'Data updated successfully' });
});

app.delete('/api/data/:id', (req, res) => {
  const index = dataStore.findIndex(d => d.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Data not found' });
  }
  
  const deletedItem = dataStore.splice(index, 1)[0];
  res.json({ data: deletedItem, message: 'Data deleted successfully' });
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 My car server running on port ${PORT}`);
  console.log(`📝 Description: Create a car maintenance app with service scheduling, mileage tracking, expense logging, maintenance reminders, fuel efficiency monitoring, and service history. Include maintenance checklist templates, cost per mile calculations, and vehicle performance analytics. Target audience: car owners, fleet managers, and automotive enthusiasts.`);
  console.log(`🌐 Access the API at http://localhost:${PORT}/api`);
});
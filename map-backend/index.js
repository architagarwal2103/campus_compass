const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World from Backend');
});

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/map-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

const locationRoutes = require('./routes/locations');

app.use('/locations', locationRoutes);


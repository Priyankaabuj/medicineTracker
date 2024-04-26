// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;
const mongoose = require('./config');
const medicineRoutes = require('./routes/medicineRoutes');

app.use(express.json());
app.use(cors());

app.use('/api/medicines', medicineRoutes);

// Start server
mongoose.connection.on('connected', () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
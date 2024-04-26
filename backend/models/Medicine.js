// models/Medicine.js
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  medicineID: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Medicine', medicineSchema);

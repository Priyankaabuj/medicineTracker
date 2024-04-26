// routes/medicineRoutes.js
const express = require('express');
const router = express.Router();
const { addMedicine, getMedicineById, getAllMedicines } = require('../controllers/medicineController');

router.post('/', addMedicine);
router.get('/:medicineID', getMedicineById); // Update route parameter to 'medicineID'
router.get('/', getAllMedicines);

module.exports = router;

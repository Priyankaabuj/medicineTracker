const Web3 = require('web3');
const MedicineTrackerContract = require('../../build/contracts/MedicineTracker.json'); // Contract ABI
const web3 = new Web3('http://127.0.0.1:7545'); // Update with your local Ethereum node address
const contractAddress = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8'; // Update with your deployed contract address
const contract = new web3.eth.Contract(MedicineTrackerContract.abi, contractAddress);

// controllers/medicineController.js
const Medicine = require('../models/Medicine');

exports.addMedicine = async (req, res) => {
  try {
    const { medicineID, name, manufacturer, expiryDate, count } = req.body;
    // Convert date string to Unix timestamp
    const expiryTimestamp = new Date(expiryDate).getTime() / 1000; // Convert milliseconds to seconds
    // Call the addMedicine function of the smart contract
    await contract.methods.addMedicine(medicineID, name, manufacturer, expiryTimestamp, count).send({ from: '0xc5edb8D829aE8fA1a85eE32CF5008EB7993FC966' }); // Update with your wallet address

    // Save medicine details to MongoDB
    const medicine = new Medicine({ medicineID, name, manufacturer, expiryDate: new Date(expiryDate), count });
    await medicine.save();

    res.status(201).json({ success: true, message: 'Medicine added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getMedicineById = async (req, res) => {
  try {
    const { medicineID } = req.params;
    // Retrieve medicine details from MongoDB
    const medicine = await Medicine.findOne({ medicineID });
    if (!medicine) {
      return res.status(404).json({ success: false, message: 'Medicine not found' });
    }

    // Convert Unix timestamp to human-readable date format
    const expiryDate = new Date(medicine.expiryDate * 1000).toISOString().split('T')[0];

    // Return medicine details with converted expiryDate
    res.status(200).json({ success: true, data: { ...medicine._doc, expiryDate } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getAllMedicines = async (req, res) => {
  try {
    // Retrieve all medicines from MongoDB
    const medicines = await Medicine.find();

    // Convert Unix timestamp to human-readable date format for each medicine
    const medicinesWithReadableExpiry = medicines.map(medicine => {
      const expiryDate = new Date(medicine.expiryDate * 1000).toISOString().split('T')[0];
      return { ...medicine._doc, expiryDate };
    });

    res.status(200).json({ success: true, data: medicinesWithReadableExpiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

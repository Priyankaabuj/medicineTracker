// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineTracker {
    // Structure to represent a medicine
    struct Medicine {
        string name;
        string manufacturer;
        uint256 expiryDate;
        uint256 count;
    }

    // Mapping to store medicines by their ID
    mapping(uint256 => Medicine) public medicines;

    // Event to emit when a new medicine is added
    event MedicineAdded(uint256 indexed medicineID, string name, string manufacturer, uint256 expiryDate, uint256 count);

    // Function to add a new medicine
    function addMedicine(uint256 medicineID, string memory name, string memory manufacturer, uint256 expiryDate, uint256 count) external {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(manufacturer).length > 0, "Manufacturer cannot be empty");
        require(expiryDate > block.timestamp, "Expiry date must be in the future");
        require(count > 0, "Count must be greater than zero");
        require(medicines[medicineID].expiryDate == 0, "Medicine with this ID already exists");

        Medicine storage newMedicine = medicines[medicineID];
        newMedicine.name = name;
        newMedicine.manufacturer = manufacturer;
        newMedicine.expiryDate = expiryDate;
        newMedicine.count = count;

        emit MedicineAdded(medicineID, name, manufacturer, expiryDate, count);
    }

    // Function to retrieve medicine details by ID
    function getMedicineById(uint256 medicineID) external view returns (string memory name, string memory manufacturer, uint256 expiryDate, uint256 count) {
        require(medicines[medicineID].expiryDate != 0, "Medicine with this ID does not exist");
        
        Medicine memory medicine = medicines[medicineID];
        return (medicine.name, medicine.manufacturer, medicine.expiryDate, medicine.count);
    }
    // Add more functions as needed
}

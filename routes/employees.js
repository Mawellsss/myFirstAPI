const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");
const middleware = require("../middleware/validation");

// POST Create Employee Details
router.post(
  "/",
  middleware.validateContactNo,
  middleware.validateEmail,
  middleware.validateTrainingDetails,
  async (req, res) => {
    const regionCode = req.body.regionCode;
    const provinceCode = req.body.provinceCode;
    const cityCode = req.body.cityCode;
    const barangayCode = req.body.barangayCode;

    const regionData = await middleware.fetchLocationData(
      "regions",
      regionCode
    );
    const provinceData = await middleware.fetchLocationData(
      "provinces",
      provinceCode
    );
    const cityData = await middleware.fetchLocationData("cities", cityCode);
    const barangayData = await middleware.fetchLocationData(
      "barangays",
      barangayCode
    );

    const address = {
      region: regionData.id,
      province: provinceData.id,
      city: cityData.id,
      barangay: barangayData.id,
    };

    const employee = new Employee({
      employeeNumber: req.body.employeeNumber,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      gender: req.body.gender,
      maritalStatus: req.body.maritalStatus,
      address: address,
      tin: req.body.tin,
      sssId: req.body.sssId,
      hdmf: req.body.hdmf,
      phic: req.body.phic,
      email: req.body.email,
      contactNo: req.body.contactNo,
      qualifiedDependents: req.body.qualifiedDependents,
      trainingDetails: req.body.trainingDetails,
    });
    try {
      const newEmployee = await employee.save();
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// GET ALL Employee Details
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({ isActive: true });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by ID
router.get("/:id", middleware.checkEmployee, (req, res) => {
  res.json(res.employee);
});

// PUT
router.put("/:id", middleware.checkEmployee, (req, res) => {});

// PATCH
router.patch("/:id", middleware.checkEmployee, async (req, res) => {
  if (req.body.regionCode != null) {
  }
  const regionData = await middleware.fetchLocationData(
    "regions",
    req.body.regionCode
  );
  const provinceData = await middleware.fetchLocationData(
    "provinces",
    req.body.provinceCode
  );
  const cityData = await middleware.fetchLocationData(
    "cities",
    req.body.cityCode
  );
  const barangayData = await middleware.fetchLocationData(
    "barangays",
    req.body.barangayCode
  );

  const address = {
    region: regionData.name,
    province: provinceData.name,
    city: cityData.name,
    barangay: barangayData.name,
  };

  if (address.region != null) {
    res.employee.address = address;
  }

  if (req.body.employeeNumber != null) {
    res.employee.employeeNumber = req.body.employeeNumber;
  }
  if (req.body.firstName != null) {
    res.employee.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.employee.lastName = req.body.lastName;
  }
  if (req.body.middleName != null) {
    res.employee.middleName = req.body.middleName;
  }
  if (req.body.dob != null) {
    res.employee.dob = req.body.dob;
  }
  if (req.body.gender != null) {
    res.employee.gender = req.body.gender;
  }
  if (req.body.maritalStatus != null) {
    res.employee.maritalStatus = req.body.maritalStatus;
  }
  if (req.body.tin != null) {
    res.employee.tin = req.body.tin;
  }
  if (req.body.sssId != null) {
    res.employee.sssId = req.body.sssId;
  }
  if (req.body.hdmf != null) {
    res.employee.hdmf = req.body.hdmf;
  }
  if (req.body.phic != null) {
    res.employee.phic = req.body.phic;
  }
  if (req.body.email != null) {
    res.employee.email = req.body.email;
  }
  if (req.body.contactNo != null) {
    res.employee.contactNo = req.body.contactNo;
  }
  if (req.body.qualifiedDependents != null) {
    res.employee.hdmf = req.body.qualifiedDependents;
  }
  if (req.body.trainingDetails != null) {
    res.employee.hdmf = req.body.trainingDetails;
  }
  if (req.body.isActive != null) {
    res.employee.isActive = req.body.isActive;
  }
  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", middleware.checkEmployee, (req, res) => {});

module.exports = router;

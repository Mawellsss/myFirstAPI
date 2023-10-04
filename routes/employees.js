const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");
const axios = require("axios");
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
      region: regionData.name,
      province: provinceData.name,
      city: cityData.name,
      barangay: barangayData.name,
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
    const employees = await Employee.find();
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
router.patch("/:id", middleware.checkEmployee, (req, res) => {});

// DELETE
router.delete("/:id", middleware.checkEmployee, (req, res) => {});

module.exports = router;

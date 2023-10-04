const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");
const axios = require("axios");

const fetchLocationData = async function fetchLocationData(
  locationType,
  locationCode
) {
  try {
    const response = await axios.get(
      `https://ph-locations-api.buonzz.com/v1/${locationType}/${locationCode}`
    );
    return response.data; // Assuming the API response is JSON data
  } catch (error) {
    throw new Error(
      `Error fetching ${locationType} data from the API for code ${locationCode}`
    );
  }
};

const validateContactNo = function validateContactNo(req, res, next) {
  const contactNo = req.body.contactNo;

  if (!contactNo || !contactNo.match(/^\+63\d{9}$/)) {
    return res.status(400).json({
      error:
        "Invalid contact number. It should start with +63 and have 9 digits.",
    });
  }
  next();
};

const validateEmail = function validateEmail(req, res, next) {
  const email = req.body.email;

  if (!email || !email.match(/^\S+@\S+\.\S+$/)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  next();
};

const validateTrainingDetails = function validateTrainingDetails(
  req,
  res,
  next
) {
  const trainingDetails = req.body.trainingDetails;

  if (!Array.isArray(trainingDetails)) {
    return res
      .status(400)
      .json({ error: "Training details must be an array." });
  }

  for (const training of trainingDetails) {
    const dateStart = new Date(training.dateStart);
    const dateEnd = new Date(training.dateEnd);

    if (dateStart > dateEnd) {
      return res.status(400).json({
        error: "Training start date should not be after the end date.",
      });
    }
  }

  next();
};

const checkEmployee = async function checkEmployee(req, res, next) {
  let employee;
  try {
    employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res
        .status(404)
        .json({ message: "Cannot find Employee " + req.params.id });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.employee = employee;
  next();
};

module.exports = {
  fetchLocationData,
  validateContactNo,
  validateEmail,
  validateTrainingDetails,
  checkEmployee,
};

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeNumber: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: String,
    lastName: {
      type: String,
      required: true,
    },
    suffix: String,
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      required: true,
    },
    address: {
      region: String,
      province: String,
      city: String,
      barangay: String,
    },
    tin: String,
    sssId: String,
    hdmf: String,
    phic: String,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
      match: /^\+63\d{9}$/,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    qualifiedDependents: [
      {
        name: String,
        dob: Date,
        relationship: String,
      },
    ],
    trainingDetails: [
      {
        trainingName: String,
        dateStart: Date,
        dateEnd: Date,
        certificateUrl: String,
        remarks: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);

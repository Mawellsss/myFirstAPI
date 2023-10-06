require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const employeeRouter = require("./routes/employees");
app.use("/employee", employeeRouter);

app.listen(process.env.PORT, () =>
  console.log("Server is running on port " + process.env.PORT)
);

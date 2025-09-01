const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

//database connection
mongoose.connect(process.env.DB_URL);
mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
});

app.listen(3000, () => {
  console.log("App is listening!");
});

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT;

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoute = require("./routes/auth");
app.use("/mesela", authRoute);

// CONNECT TO DATABASE
const MONGODB = process.env.MONGODB;
mongoose.connect(
  MONGODB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

// IS DB CONNECTED ?
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MONGO DB database established succesfully");
});

app.listen(PORT || 5000);

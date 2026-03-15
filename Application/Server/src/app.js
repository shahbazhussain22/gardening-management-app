// src/app.js


const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Routes
const userRoute = require("./routes/user");
const plantRoutes = require("./routes/plantRoute");
const recommendationsRoutes = require("./routes/recommendations");
const plantTrackingRoutes = require("./routes/plantTrackingRoutes");
const groupRoutes = require("./routes/groupRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const plantIdentifierRoutes = require("./routes/plantIdentifierRoutes");
const diseaseDiagnosisRoutes = require("./routes/diseaseDiagnosis");
const wateringRoutes = require("./routes/wateringRoutes");

// Connect DB
// console.log("Mongo URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRoute);
app.use("/plants", plantRoutes);
app.use("/recommendations", recommendationsRoutes);
app.use("/plant-tracking", plantTrackingRoutes);
app.use("/groups", groupRoutes);
app.use("/weather", weatherRoutes);
app.use("/identify", plantIdentifierRoutes);
app.use("/disease-diagnosis", diseaseDiagnosisRoutes);
app.use("/watering", wateringRoutes);

module.exports = app;

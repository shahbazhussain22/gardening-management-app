const mongoose = require("mongoose");

const PlantIdentificationSchema = new mongoose.Schema({
  name: String,
  common_names: [String],
  confidence: Number,
  timestamp: Date
});

module.exports = mongoose.model("PlantIdentification", PlantIdentificationSchema);

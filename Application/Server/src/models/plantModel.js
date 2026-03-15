const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["Flower", "Vegetable", "Fruit"], required: true },
    scientificName: { type: String },
    characteristics: { type: String },

    sunlight: { type: String },
    water: { type: String },
    soilType: { type: String },
    fertilizer: { type: String },

    age: { type: Number }, 
    growthStage: { type: String, enum: ["Seedling", "Vegetative", "Flowering", "Mature"] },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Plant", plantSchema);

const express = require('express');
const router = express.Router();
const PlantTracking = require("../models/plantTracking");
const { body, validationResult } = require('express-validator');

// Add a tracking plant
const addTrackingPlant = async (req, res) => {
    try {
        const { userId, plantName, growthStage, healthStatus, observations, reminderDate, reminderType } = req.body;

        if (!userId || !plantName || !growthStage || !healthStatus || !reminderDate || !reminderType) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const plant = new PlantTracking({
            userId,
            plantName,
            growthStage,
            healthStatus,
            observations,
            reminderDate,
            reminderType
        });

        await plant.save();
        res.status(201).json(plant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all tracked plants for a user
const getAllTrackPlant = async (req, res) => {
    try {
        const plants = await PlantTracking.find({ userId: req.params.userId });
        res.status(200).json(plants); // return empty array if none
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update plant tracking details
const updatePlantTracking = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedPlant = await PlantTracking.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedPlant) {
            return res.status(404).json({ error: "Plant tracking entry not found" });
        }

        res.json(updatedPlant);
    } catch (error) {
        console.error("Error updating plant tracking:", error);
        res.status(500).json({ error: "Failed to update plant. Please try again." });
    }
};

// Delete a plant tracking entry
const deleteTrackPlant = async (req, res) => {
    try {
        const deletedPlant = await PlantTracking.findByIdAndDelete(req.params.id);
        if (!deletedPlant) {
            return res.status(404).json({ error: "Plant tracking entry not found" });
        }
        res.json({ message: "Plant tracking entry deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addTrackingPlant, getAllTrackPlant, updatePlantTracking, deleteTrackPlant };

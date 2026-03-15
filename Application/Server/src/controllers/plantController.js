const Plant = require("../models/plantModel");

// Add a new plant
const addPlant = async (req, res) => {
    try {
        const plant = new Plant(req.body);
        await plant.save();
        res.status(201).json({ message: "Plant added successfully", plant });
    } catch (error) {
        res.status(500).json({ error: "Failed to add plant" });
    }
};

//Get all plants
const getPlants = async (req, res) => {
    try {
        const plants = await Plant.find();
        res.status(200).json(plants);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch plants" });
    }
};

// Search plants
const searchPlants = async (req, res) => {
    try {
        const { name, age, type, growthStage } = req.query;
        let query = {};

        if (name) query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
        if (age) query.age = Number(age);
        if (type) {
            query.$or = [{ type: type }, { category: type }]; // Search by both fields
        }
        if (growthStage) query.growthStage = { $regex: new RegExp(growthStage, "i") };

        console.log("Backend Query:", query); // Debugging log

        const plants = await Plant.find(query);
        
        if (plants.length === 0) {
            return res.status(404).json({ message: "No plants found" });
        }

        res.json(plants);
    } catch (error) {
        console.error("Error searching plants:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports={addPlant, getPlants, searchPlants }
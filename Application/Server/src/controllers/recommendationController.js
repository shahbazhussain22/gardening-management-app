const express = require('express');
const User = require('../models/user');

//  Get personalized plant care recommendations
const getRecomentations=  async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

// Generate recommendations based on location, climate, and soil type
        const recommendations = generatePlantCareRecommendations(user);
        res.status(200).json({ recommendations });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Function to generate plant care recommendations
const generatePlantCareRecommendations = (user) => {
    let wateringSchedule = "";
    let fertilizationPlan = "";
    let pestControl = "";
    let generalTips = "";

    const location = user.location?.toLowerCase() || "";
    const soilType = user.soilType?.toLowerCase() || "";
    const climate = user.climate?.toLowerCase() || "";

    // General tips based on location
    if (location.includes("desert")) {
        generalTips = "Use drought-resistant plants like succulents. Provide shade during peak sun hours. Mulch soil to reduce water evaporation.";
    } else if (location.includes("coastal")) {
        generalTips = "Choose salt-tolerant plants like palm trees. Protect plants from strong winds and salt spray. Rinse foliage regularly.";
    } else if (location.includes("mountain")) {
        generalTips = "Use hardy perennials and evergreens. Protect roots during cold seasons and watch for frost damage.";
    } else {
        generalTips = "Ensure proper drainage and monitor seasonal changes. Match your plants to your local environment for optimal growth.";
    }

    // Watering schedule based on soil type
    switch (soilType) {
        case "sandy":
            wateringSchedule = "Water every 2 days; sandy soil drains quickly. Consider adding compost or organic matter to retain moisture.";
            break;
        case "clay":
            wateringSchedule = "Water once a week; clay soil retains moisture. Ensure good drainage to prevent root rot.";
            break;
        case "loamy":
            wateringSchedule = "Water every 3-4 days for balanced moisture. Loamy soil is ideal for most plants.";
            break;
        case "peaty":
            wateringSchedule = "Water every 5 days; peaty soil holds water well. Be cautious of waterlogging during heavy rains.";
            break;
        default:
            wateringSchedule = "Observe your soil’s behavior and adjust watering accordingly. Consistent moisture without sogginess is key.";
    }

    // Fertilization plan based on climate
    switch (climate) {
        case "tropical":
            fertilizationPlan = "Use nitrogen-rich fertilizer monthly. Boost flowering with phosphorus-rich supplements during bloom periods.";
            break;
        case "temperate":
            fertilizationPlan = "Apply balanced fertilizer every 2 months. Reduce feeding during cold or dormant seasons.";
            break;
        case "arid":
            fertilizationPlan = "Use compost-based fertilizers every 6 weeks. Avoid over-fertilization in dry conditions.";
            break;
        case "Continental":
            fertilizationPlan = "Apply organic fertilizer once every 3 months. Mulch well to retain nutrients and moisture.";
            break;
        default:
            fertilizationPlan = "Choose a fertilizer based on your plant types and monitor growth patterns for deficiencies.";
    }

    // Pest control based on climate
    switch (climate) {
        case "tropical":
            pestControl = "Monitor for fungal diseases, apply neem oil regularly. Keep leaves dry and ensure good airflow.";
            break;
        case "temperate":
            pestControl = "Watch out for aphids and caterpillars, use insecticidal soap or natural predators like ladybugs.";
            break;
        case "arid":
            pestControl = "Check for spider mites and scale insects. Mist plants occasionally to increase humidity.";
            break;
        case "mediterranean":
            pestControl = "Prevent root rot by ensuring good drainage. Keep an eye out for whiteflies and snails.";
            break;
        default:
            pestControl = "Inspect plants weekly for pests or mold. Keep foliage dry and rotate crops if possible.";
    }

    return {
        wateringSchedule,
        fertilizationPlan,
        pestControl,
        generalTips,
    };
};


module.exports = {getRecomentations}

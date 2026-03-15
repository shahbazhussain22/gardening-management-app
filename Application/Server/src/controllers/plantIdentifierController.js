const fs = require("fs");
const axios = require("axios");

// Identify plant from uploaded image using Plant ID API
const identifyPlant = async (req, res) => {
  const imagePath = req.file.path;

  try {
    // Convert image to base64 format
    const base64Image = fs.readFileSync(imagePath, { encoding: "base64" });

    // Send image to Plant ID API 
    const response = await axios.post("https://api.plant.id/v2/identify", {
      api_key: process.env.PLANT_ID_API_KEY,
      images: [base64Image],
      plant_language: "en",
      plant_details: ["common_names", "url", "wiki_description", "taxonomy"]
    });

    // Remove the uploaded image from server
    fs.unlinkSync(imagePath);

    // Send identification result back to client
    res.json(response.data);

  } catch (err) {
    console.error("Plant identification failed:", err.message);
    res.status(500).json({ error: "Failed to identify plant" });
  }
};

module.exports = { identifyPlant };

const axios = require("axios");

const diagnoseDisease = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      console.log("No image provided in request.");
      return res.status(400).json({ error: "No image provided." });
    }

    const apiKey = process.env.PLANT_ID_API_KEY;
    const apiUrl = "https://api.plant.id/v2/health_assessment";

    const formData = {
      images: [`data:image/jpeg;base64,${image.buffer.toString("base64")}`],
    };

    const response = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey,
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to diagnose plant disease." });
  }
};

module.exports = {diagnoseDisease};

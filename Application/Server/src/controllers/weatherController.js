const axios = require('axios');
const WeatherLog = require('../models/WeatherLog');

// Reusable weather fetcher function
exports.fetchWeatherData = async (latitude, longitude, userId = null) => {
  if (!latitude || !longitude) {
    throw new Error("Latitude and longitude are required.");
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  const response = await axios.get(url);
  const data = response.data;

  if (userId) {
    const log = new WeatherLog({
      userId,
      location: data.name,
      forecast: data
    });
    await log.save();
  }

  const temp = data.main.temp;
  let tip = "🌱 Enjoy your gardening! Remember to always check your plants' specific needs.";

  if (temp >= 35) {
    tip = "🔥 Extremely hot! Provide shade for sensitive plants using shade cloth or umbrellas. Water deeply early in the morning and late in the evening to avoid evaporation. Mulch heavily to keep soil cool and retain moisture. Avoid fertilizing as plants are stressed.";
  } else if (temp >= 30) {
    tip = "🌞 It's hot! Water your plants early morning or late evening to reduce water loss. Apply mulch around the base to conserve moisture and prevent soil cracking. Consider using drought-resistant plants and avoid heavy pruning.";
  } else if (temp >= 26 && temp < 30) {
    tip = "🌼 Warm weather! Ideal for flowering plants to thrive. Ensure regular watering but avoid waterlogging. Fertilize with balanced nutrients and monitor for pests like aphids or spider mites which can increase in warm weather.";
  } else if (temp >= 20 && temp < 26) {
    tip = "🌤️ Perfect weather for planting, pruning, and fertilizing. Take advantage of moderate temperatures to propagate new plants. Keep an eye on soil moisture and adjust watering accordingly.";
  } else if (temp >= 15 && temp < 20) {
    tip = "🍃 Mild temperatures! Great time to sow cool-season crops like lettuce and spinach. Prepare soil by adding compost and mulch to retain moisture. Watch for fungal diseases in damp weather and improve airflow around plants.";
  } else if (temp >= 10 && temp < 15) {
    tip = "🌥️ Slightly chilly. Protect seedlings from cold snaps using cloches or row covers. Limit watering as plant growth slows, but keep soil from drying out completely. Remove any damaged or diseased foliage to prevent spread.";
  } else if (temp >= 5 && temp < 10) {
    tip = "🥶 Cold weather! Cover tender plants with frost blankets or bring pots indoors overnight. Reduce watering frequency and avoid fertilizing. Clean up fallen leaves and debris to reduce pests and diseases.";
  } else if (temp < 5) {
    tip = "❄️ Freezing! Move potted plants indoors or into a greenhouse if possible. Cover garden beds with mulch or straw to insulate roots. Avoid disturbing soil to protect dormant plants. Check for signs of frost damage and prune damaged branches in spring.";
  }

  return {
    location: data.name,
    temperature: data.main.temp,
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    tip
  };
};

// REST API endpoint
exports.getWeatherForecast = async (req, res) => {
  const { latitude, longitude, userId } = req.query;

  if (!latitude || !longitude || !userId) {
    return res.status(400).json({ message: "Latitude, longitude, and userId are required." });
  }

  try {
    const result = await exports.fetchWeatherData(latitude, longitude, userId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Weather API error:", err.message);
    res.status(500).json({ message: "Failed to fetch weather data." });
  }
};


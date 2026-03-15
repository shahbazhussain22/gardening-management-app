const WateringSchedule = require("../models/WateringSchedule");

const upsertWateringSchedule = async (req, res) => {
  const { plantName, scheduleDate, frequency } = req.body;
  const userId = req.user.id;

  // Validate date
  const parsedDate = new Date(scheduleDate);
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: "Invalid schedule date" });
  }

  // Validate frequency
  if (!["daily", "weekly"].includes(frequency)) {
    return res.status(400).json({ error: "Invalid frequency type" });
  }

  try {
    const updated = await WateringSchedule.findOneAndUpdate(
      { userId, plantName },
      { scheduleDate: parsedDate, frequency },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error("Upsert error:", err.message);
    res.status(500).json({ error: "Failed to save watering schedule." });
  }
};

const getUserWateringSchedules = async (req, res) => {
  try {
    const schedules = await WateringSchedule.find({ userId: req.user.id });
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schedules." });
  }
};

const deleteWateringSchedule = async (req, res) => {
  try {
    await WateringSchedule.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.status(200).json({ message: "Schedule deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete schedule." });
  }
};

module.exports = { upsertWateringSchedule,getUserWateringSchedules,deleteWateringSchedule,};

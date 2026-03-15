const mongoose = require('mongoose');

const wateringScheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plantName: { type: String, required: true },
  scheduleDate: { type: Date, required: true },
  frequency: { type: String, enum: ['daily', 'weekly'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('WateringSchedule', wateringScheduleSchema);

const express = require('express');
const router = express.Router();
const {upsertWateringSchedule, getUserWateringSchedules, deleteWateringSchedule} = require('../controllers/wateringController');
const auth = require('../middleware/auth'); // Auth middleware to protect routes

router.post("/schedule", auth, upsertWateringSchedule);
router.get("/schedule", auth, getUserWateringSchedules);
router.delete("/schedule/:id", auth, deleteWateringSchedule);

module.exports = router;

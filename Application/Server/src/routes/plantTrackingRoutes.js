const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {addTrackingPlant, getAllTrackPlant, updatePlantTracking, deleteTrackPlant} = require("../controllers/plantTrackingController");


router.post("/add-plant-tracking", addTrackingPlant ); 
router.get("/:userId", getAllTrackPlant )
router.put(
    "/:id",
    [
        body("plantName").optional().notEmpty().withMessage("Plant name cannot be empty"),
        body("growthStage").optional().notEmpty().withMessage("Growth stage cannot be empty"),
        body("healthStatus").optional().notEmpty().withMessage("Health status cannot be empty"),
        body("reminderDate").optional().isISO8601().withMessage("Invalid date format"),
        body("reminderType").optional().isIn(["Watering", "Repotting", "Pruning"]).withMessage("Invalid reminder type"),
    ],
    updatePlantTracking
);
router.delete("/:id", deleteTrackPlant)

module.exports = router;

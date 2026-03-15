const mongoose = require("mongoose");

const plantTrackingSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "User ID is required"] 
    },
    plantName: { 
      type: String, 
      required: [true, "Plant name is required"], 
      trim: true 
    },
    growthStage: { 
      type: String, 
      required: [true, "Growth stage is required"], 
      trim: true 
    },
    healthStatus: { 
      type: String, 
      required: [true, "Health status is required"], 
      trim: true 
    },
    observations: { 
      type: String, 
      default: "" 
    },
    reminderDate: { 
      type: Date, 
      required: [true, "Reminder date is required"] 
    },
    reminderType: { 
      type: String, 
      required: [true, "Reminder type is required"], 
      enum: ["Watering", "Repotting", "Pruning"], 
      trim: true 
    },
  },
  { timestamps: true }
);

const PlantTracking = mongoose.model("PlantTracking", plantTrackingSchema);
module.exports = PlantTracking;

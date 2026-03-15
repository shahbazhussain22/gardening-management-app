const express = require("express");
const router = express.Router();
const { addPlant, getPlants, searchPlants } = require("../controllers/plantController");

router.post("/add", addPlant); 
router.get("/all", getPlants); 
router.get("/search", searchPlants);

module.exports = router;

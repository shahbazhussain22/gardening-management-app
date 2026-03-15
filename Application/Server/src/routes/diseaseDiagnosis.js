const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { diagnoseDisease } = require("../controllers/diseaseDiagnosisController");
router.post("/", upload.single("image"), diagnoseDisease);

module.exports = router;

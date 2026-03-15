const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { identifyPlant } = require("../controllers/plantIdentifierController");

router.post("/", upload.single("image"), identifyPlant);

module.exports = router;

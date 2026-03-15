const express = require("express");
const { getRecomentations } = require("../controllers/recommendationController");
const router = express.Router();
router.get("/:userId", getRecomentations); 

module.exports = router;

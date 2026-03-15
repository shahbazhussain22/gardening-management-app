const express = require("express");
const router = express.Router();
const {createGroup, findGroups, deleteGroup} = require("../controllers/groupController");
const auth = require("../middleware/auth"); 
router.post("/", auth, createGroup);
router.get("/", auth, findGroups);
router.delete("/:id", auth, deleteGroup); 

module.exports = router;

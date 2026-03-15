const express = require('express');
const router = express.Router();
const {signup, login, editUser }= require('../controllers/userController');
router.post('/signup', signup)
router.post('/login', login ) 
router.put('/:id', editUser) 
module.exports = router;
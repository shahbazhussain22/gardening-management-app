const User = require('../models/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//User registration
const signup = async (req, res) => {
    try {
        const { username, email, password, userType, location, climate, soilType } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            email,
            password: hashedPassword,
            userType,
            location,
            climate,
            soilType
        });

        // Save the user to the database
        await user.save();

        // Respond with the created user and the token
        res.status(201).json({
            message: "User registered successfully",
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// user login
const login= async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate token
        const token = jwt.sign({ userId: user._id, userType:user.userType }, process.env.JWT_SECRET);
        res.status(200).json({ token, user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Update User by id
const editUser = async (req, res) => {
    try {
        const { username, email, userType, location, climate, soilType } = req.body;
        if (!username || !email || !userType || !location || !climate || !soilType) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.json({ updatedUser });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { signup, login, editUser };

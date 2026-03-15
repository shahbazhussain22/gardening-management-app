const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: {
        type: String,
        enum: ["Gardener", "Supervisor", "HomeOwner", "Admin"],
        required: true
    },
    location: {
        type: String,
        enum: ["desert", "coastal"],
        required: true
    },
    climate: {
        type: String,
        enum: ["Tropical", "Temperate", "Arid", "Continental"],
        required: true
    },
    soilType: {
        type: String,
        enum: ["Sandy", "Clay", "Loamy", "Peaty"],
        required: true
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;

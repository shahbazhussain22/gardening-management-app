import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPlantTracking } from "../../api";
import "./AddPlantTracking.css";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";

const AddPlantTracking = ({ user }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        plantName: "",
        growthStage: "",
        healthStatus: "",
        observations: "",
        reminderDate: "",
        reminderType: "Watering",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const requiredFields = ["plantName", "growthStage", "healthStatus", "reminderDate", "reminderType"];
        const fieldLabels = {
            plantName: "Plant Name",
            growthStage: "Growth Stage",
            healthStatus: "Health Status",
            reminderDate: "Reminder Date",
            reminderType: "Reminder Type",
        };

        for (const field of requiredFields) {
            if (!formData[field]) {
                setError(`${fieldLabels[field]} is required.`);
                return;
            }
        }

        try {
            await addPlantTracking({
                ...formData,
                userId: user?._id,
                reminders: formData.reminderDate ? [formData.reminderDate] : [],
            });

            setFormData({
                plantName: "",
                growthStage: "",
                healthStatus: "",
                observations: "",
                reminderDate: "",
                reminderType: "Watering",
            });
            setSuccessMessage("Plant successfully added!");
        } catch (error) {
            console.error("Error adding plant tracking entry:", error.response?.data || error);
            setError("Failed to add plant. Please check your inputs.");
        }
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <div>
            <Navbar />
            <div className="plant-buttons-container">
                <button className="plant-button" onClick={() => navigate("/plant-tracking-list")}>
                    🌿 Plant List
                </button>
            </div>
            <div className="plant-tracking-container">
                <h2>Plant Tracking</h2>

                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={handleSubmit} className="plant-form" autoComplete="off">
                    <input
                        type="text"
                        name="plantName"
                        placeholder="Plant Name"
                        value={formData.plantName}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                    <input
                        type="text"
                        name="growthStage"
                        placeholder="Growth Stage"
                        value={formData.growthStage}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                    <input
                        type="text"
                        name="healthStatus"
                        placeholder="Health Status"
                        value={formData.healthStatus}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                    <textarea
                        name="observations"
                        placeholder="Observations"
                        value={formData.observations}
                        onChange={handleChange}
                    ></textarea>

                    <label>Reminder:</label>
                    <input
                        type="date"
                        name="reminderDate"
                        value={formData.reminderDate}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                    <select name="reminderType" value={formData.reminderType} onChange={handleChange}>
                        <option value="Watering">Watering</option>
                        <option value="Repotting">Repotting</option>
                        <option value="Pruning">Pruning</option>
                    </select>

                    <button type="submit" className="plant-button">
                        ➕ Add Plant
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default AddPlantTracking;

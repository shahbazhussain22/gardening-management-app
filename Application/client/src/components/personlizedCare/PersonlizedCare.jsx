import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PersonalizedCare.css";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";

const PersonalizedCare = ({ user }) => {
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) return;

        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/recommendations/${user._id}`);
                setRecommendations(response.data.recommendations);
            } catch (err) {
                setError("Failed to load recommendations.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [user]);

    if (loading) return <p>Loading recommendations...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Navbar />
            <div className="care-container">
                <h2>Personalized Plant Care Recommendations</h2>
                <div className="care-grid">
                    <div className="care-card">
                        <h3>📍 Location Advice</h3>
                        <p>{recommendations.generalTips}</p>
                    </div>
                    <div className="care-card">
                        <h3>💧 Watering Schedule</h3>
                        <p>{recommendations.wateringSchedule}</p>
                    </div>
                    <div className="care-card">
                        <h3>🌱 Fertilization Plan</h3>
                        <p>{recommendations.fertilizationPlan}</p>
                    </div>
                    <div className="care-card">
                        <h3>🐛 Pest Control</h3>
                        <p>{recommendations.pestControl}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PersonalizedCare;

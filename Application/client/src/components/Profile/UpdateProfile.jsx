import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api";
import "./Updateprofile.css";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";


const UpdateProfile = ({ user, setUser }) => {
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        userType: user?.userType || "",
        location: user?.location || "",
        climate: user?.climate || "",
        soilType: user?.soilType || ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const response = await updateUser(user._id, formData, token);
            localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
            setUser(response.data.updatedUser);
            alert("Profile updated successfully");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.error || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar/>
        <div className="profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="input-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>User Type:</label>
                    <select name="userType" value={formData.userType} onChange={handleChange} required>
                        <option value="">Select User Type</option>
                        <option value="admin">Admin</option>
                        <option value="gardener">Gardener</option>
                        <option value="homeowner">Home Owner</option>
                        <option value="supervisor">Supervisor</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Location:</label>
                    <select name="location" value={formData.location} onChange={handleChange} required>
                        <option value="">Select Location</option>
                        <option value="desert">Desert</option>
                        <option value="coastal">Coastal</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Climate:</label>
                    <select name="climate" value={formData.climate} onChange={handleChange} required>
                        <option value="">Select Climate</option>
                        <option value="tropical">Tropical</option>
                        <option value="temperate">Temperate</option>
                        <option value="arid">Arid</option>
                        <option value="continental">Continental</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Soil Type:</label>
                    <select name="soilType" value={formData.soilType} onChange={handleChange} required>
                        <option value="">Select Soil Type</option>
                        <option value="sandy">Sandy</option>
                        <option value="clay">Clay</option>
                        <option value="loamy">Loamy</option>
                        <option value="silty">Silty</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
        <Footer/>
        </div>
    );
};

export default UpdateProfile;

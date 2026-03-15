import React, { useState } from "react";
import "./signup.css";
import { registerUser } from "../../api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        userType: "HomeOwner",
        location: "desert", 
        climate: "Tropical",
        soilType: "Loamy"
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            console.log("Signup response:", response);
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="addUser">
            <h3> Sign Up</h3>
            <form className="addUserForm" onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="username" placeholder="Enter Your Name"autoComplete="off" autoCorrect="off"  onChange={handleChange} required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter Your Email" autoComplete="off" autoCorrect="off" onChange={handleChange} required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter Your Password" onChange={handleChange} required />

                    <label htmlFor="userType">You are...</label>
                    <select name="userType" id="userType" onChange={handleChange} value={formData.userType} required>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Gardener">Gardener</option>
                        <option value="HomeOwner">Home Owner</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <label htmlFor="location">Location:</label>
                    <select name="location" id="location" onChange={handleChange} value={formData.location} required>
                        <option value="desert">Desert</option>
                        <option value="coastal">coastal</option>
                    </select>
                

                    <label htmlFor="climate">Climate:</label>
                    <select name="climate" id="climate" onChange={handleChange} value={formData.climate} required>
                        <option value="Tropical">Tropical</option>
                        <option value="Temperate">Temperate</option>
                        <option value="Arid">Arid</option>
                        <option value="Continental">Continental</option>

                    </select>

                    <label htmlFor="soilType">Soil Type:</label>
                    <select name="soilType" id="soilType" onChange={handleChange} value={formData.soilType} required>
                        <option value="Loamy">Loamy</option>
                        <option value="Clay">Clay</option>
                        <option value="Sandy">Sandy</option>
                        <option value="Peaty">Peaty</option>
                    </select>

                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
                <div className="Signup">
                    <p>Already have an account?</p>
                    <Link to="/login" className="btn btn-success">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;

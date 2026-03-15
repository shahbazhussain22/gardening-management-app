import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import "./login.css";

const Login = ({ setUser }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await loginUser(credentials);

            // Safely destructure token and user
            const { token, user } = response.data || {};

            if (!token || !user) {
                throw new Error("Login failed: token or user missing in response.");
            }

            // Store token and user in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("userId", user._id); // Optional: convenience

            setUser(user); // Set user state for app
            navigate("/home"); // Redirect to homepage
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Invalid email or password";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h3>Login</h3>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="login-form">
                <div className="inputGroup">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        autoCorrect="off"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="inputGroup">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p className="Signup">Don't have an account?</p>
            <button className="btn btn-success" onClick={() => navigate("/signup")}>
                Sign Up
            </button>
        </div>
    );
};

export default Login;

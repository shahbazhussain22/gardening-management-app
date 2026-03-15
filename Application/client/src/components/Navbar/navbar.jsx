// components/Navbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) setIsLoggedIn(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        window.location.href = "/"; // force refresh
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container">
                <Link className="navbar-brand" to="/">🌿 Gardening Care</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-login" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-register" to="/signup">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link btn-edit" to="/updateprofile">Edit Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link btn-tools" to="/notifications">Notifications</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-logout" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Navbar />
      {!isLoggedIn && (
        <header className="hero">
          <div className="container text-center">
            <h1>Welcome to Gardening Care</h1>
            <p>Your personalized gardening assistant for a greener tomorrow.</p>
          </div>
        </header>
      )}

      {isLoggedIn && (
        <section className="container text-center my-5 features-section">
          <h2 className="mb-4">Key Features</h2>
          <div className="row">
            <div className="col-md-4">
              <span className="feature-icon">🌱</span>
              <h4>Plant Database</h4>
              <p>
                Explore a comprehensive database of plants with detailed care
                information.
              </p>
              <Link to="/plantSearch" className="btn btn-success">
                Explore
              </Link>
            </div>
            <div className="col-md-4">
              <span className="feature-icon">📊</span>
              <h4>Personalized Care</h4>
              <p>
                Get customized plant care tips based on your location and
                environment.
              </p>
              <Link to="/personalized-care" className="btn btn-success">
                Learn More
              </Link>
            </div>
            <div className="col-md-4">
              <span className="feature-icon">📅</span>
              <h4>Plant Tracking</h4>
              <p>
                Monitor plant growth, set reminders for watering and pruning.
              </p>
              <Link to="/plant-tracking-list" className="btn btn-success">
                Track Now
              </Link>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-4">
              <span className="feature-icon">👥</span>
              <h4>Community</h4>
              <p>Join gardening groups and connect with fellow enthusiasts.</p>
              <Link to="/groups" className="btn btn-success">
                Join Now
              </Link>
            </div>
            <div className="col-md-4">
              <span className="feature-icon">🧰</span>
              <h4>Interactive Tools & Resources</h4>
              <p>
                Access garden planners, plant ID guides, and tutorials for
                smarter gardening.
              </p>
              <Link to="/tools" className="btn btn-success">
                Explore Tools
              </Link>
            </div>
            <div className="col-md-4">
              <span className="feature-icon">🌦️</span>
              <h4>Weather Integration</h4>
              <p>Receive weather-based plant care suggestions and updates.</p>
              <Link to="/weather" className="btn btn-success">
                Check Weather
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;

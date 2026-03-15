import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tools.css";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";

const Tools = () => {
    return (
        <div>
            <Navbar />
            <section className="container my-5 text-center tools-section">
                <h2 className="mb-4">🧰 Available Gardening Tools</h2>
                <div className="row justify-content-center">

                    <div className="col-md-4 mb-4">
                        <div className="card tool-card h-100">
                            <div className="card-body">
                                <div className="tool-icon mb-3">🦠</div>
                                <h5 className="card-title">Disease Diagnosis</h5>
                                <p className="card-text">Identify plant diseases using symptoms.</p>
                                <Link to="/disease-diagnosis" className="btn btn-success">
                                    Use Tool
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card tool-card h-100">
                            <div className="card-body">
                                <div className="tool-icon mb-3">🔍</div>
                                <h5 className="card-title">Plant Identifier</h5>
                                <p className="card-text">Find plant names from images or features.</p>
                                <Link to="/plant-identifier" className="btn btn-success">
                                    Use Tool
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card tool-card h-100">
                            <div className="card-body">
                                <div className="tool-icon mb-3">💧</div>
                                <h5 className="card-title">Watering Scheduler</h5>
                                <p className="card-text">Set reminders to water your plants.</p>
                                <Link to="/watering-scheduler" className="btn btn-success">
                                    Use Tool
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Tools;

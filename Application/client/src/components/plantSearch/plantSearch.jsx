import React, { useState } from "react";
import axios from "axios";
import "./plantSearch.css";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";

const PlantSearch = ({ user }) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [type, setType] = useState("");
    const [growthStage, setGrowthStage] = useState("");
    const [plants, setPlants] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [newPlant, setNewPlant] = useState({
        name: "",
        type: "",
        scientificName: "",
        characteristics: "",
        sunlight: "",
        water: "",
        soilType: "",
        fertilizer: "",
        age: "",
        growthStage: "",
    });

    const handleSearch = async () => {
        setLoading(true);
        setError("");
        setPlants([]);
        setSelectedPlant(null);

        try {
            const response = await axios.get("http://localhost:3000/plants/search", {
                params: { name, age, type, growthStage },
            });

            if (response.data.length === 0) {
                setError("No record found.");
                return;
            }

            setPlants(response.data);
        } catch (err) {
            setError("Search failed. Please try again.");
            console.error("Search failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddPlant = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/plants/add", newPlant);
            alert("Plant added successfully!");
            setNewPlant({
                name: "",
                type: "",
                scientificName: "",
                characteristics: "",
                sunlight: "",
                water: "",
                soilType: "",
                fertilizer: "",
                age: "",
                growthStage: "",
            });
            handleSearch(); // Refresh plant list after adding
        } catch (error) {
            alert("Failed to add plant.");
            console.error("Add plant error:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="search-container">

                {user?.userType === "admin" && (
                    <div className="add-plant-form">
                        <h3>Add New Plant</h3>
                        <form className="form-grid" onSubmit={handleAddPlant}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={newPlant.name}
                                onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
                            />
                            <select
                                value={newPlant.type}
                                onChange={(e) => setNewPlant({ ...newPlant, type: e.target.value })}
                            >
                                <option value="">Select Type</option>
                                <option value="Flower">Flower</option>
                                <option value="Vegetable">Vegetable</option>
                                <option value="Fruit">Fruit</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Scientific Name"
                                value={newPlant.scientificName}
                                onChange={(e) => setNewPlant({ ...newPlant, scientificName: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Characteristics"
                                value={newPlant.characteristics}
                                onChange={(e) => setNewPlant({ ...newPlant, characteristics: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Sunlight"
                                value={newPlant.sunlight}
                                onChange={(e) => setNewPlant({ ...newPlant, sunlight: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Water"
                                value={newPlant.water}
                                onChange={(e) => setNewPlant({ ...newPlant, water: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Soil Type"
                                value={newPlant.soilType}
                                onChange={(e) => setNewPlant({ ...newPlant, soilType: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Fertilizer"
                                value={newPlant.fertilizer}
                                onChange={(e) => setNewPlant({ ...newPlant, fertilizer: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Age (years)"
                                value={newPlant.age}
                                onChange={(e) => setNewPlant({ ...newPlant, age: e.target.value })}
                            />
                            <select
                                value={newPlant.growthStage}
                                onChange={(e) => setNewPlant({ ...newPlant, growthStage: e.target.value })}
                            >
                                <option value="">Select Growth Stage</option>
                                <option value="Seedling">Seedling</option>
                                <option value="Vegetative">Vegetative</option>
                                <option value="Flowering">Flowering</option>
                                <option value="Mature">Mature</option>
                            </select>
                            <button type="submit">Add Plant</button>
                        </form>
                    </div>
                )}

                <h2>Plant Search</h2>

                <div className="search-fields">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Search by Age (years)"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <select value={type} onChange={(e) => setType(e.target.value || "")}>
                        <option value="">All Types</option>
                        <option value="Flower">Flower</option>
                        <option value="Vegetable">Vegetable</option>
                        <option value="Fruit">Fruit</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search by Growth Stage"
                        value={growthStage}
                        onChange={(e) => setGrowthStage(e.target.value)}
                    />
                    <button onClick={handleSearch} disabled={loading}>
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="results-container">
                    {plants.length > 0 ? (
                        <ul>
                            {plants
                                .filter((plant) => type === "" || plant.type?.toLowerCase() === type.toLowerCase())
                                .map((plant) => (
                                    <li
                                        key={plant._id}
                                        onClick={() => setSelectedPlant(plant)}
                                        className="plant-item"
                                    >
                                        <strong>{plant.name}</strong> ({plant.type || "Not Specified"})
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        !error && <p>No plants to display.</p>
                    )}
                </div>

                {selectedPlant && (
                    <div className="modal-overlay" onClick={() => setSelectedPlant(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Plant Details</h3>
                            <p><strong>Name:</strong> {selectedPlant.name}</p>
                            <p><strong>Type:</strong> {selectedPlant.type || "Not Specified"}</p>
                            <p><strong>Scientific Name:</strong> {selectedPlant.scientificName || "N/A"}</p>
                            <p><strong>Characteristics:</strong> {selectedPlant.characteristics || "N/A"}</p>
                            <p><strong>Age:</strong> {selectedPlant.age ? `${selectedPlant.age} years` : "Unknown"}</p>
                            <p><strong>Growth Stage:</strong> {selectedPlant.growthStage || "N/A"}</p>
                            <p><strong>Sunlight:</strong> {selectedPlant.sunlight || "N/A"}</p>
                            <p><strong>Water:</strong> {selectedPlant.water || "N/A"}</p>
                            <p><strong>Soil Type:</strong> {selectedPlant.soilType || "N/A"}</p>
                            <p><strong>Fertilizer:</strong> {selectedPlant.fertilizer || "N/A"}</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PlantSearch;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPlantTracking,
  deletePlantTracking,
  updatePlantTracking
} from "../../api";
import "./PlantTrackingList.css";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";

const PlantTrackingList = ({ userId, user }) => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const navigate = useNavigate();

  // Fetch plants function
  const fetchPlants = useCallback(async () => {
    if (!user) return;
    try {
      const response = await getPlantTracking(user?._id);
      setPlants(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
      setError("");
    }
  }, [user]);

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  // Handle Delete
  const handleDelete = async (id) => {
    setError(null);
    try {
      await deletePlantTracking(id);
      setPlants((prevPlants) => prevPlants.filter((plant) => plant._id !== id));
    } catch (error) {
      console.error("Error deleting plant:", error);
      setError("Failed to delete plant.");
    }
  };

  // Handle Update Submit
  const handleUpdatePlant = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await updatePlantTracking(selectedPlant._id, selectedPlant);
      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant._id === selectedPlant._id ? selectedPlant : plant
        )
      );
      setSelectedPlant(null);
    } catch (error) {
      console.error("Error updating plant:", error);
      setError("Failed to update plant.");
    }
  };


  const handleUpdate = (plant) => {
    setSelectedPlant(plant);
  };

  return (
    <div>
      <Navbar />

      <div className="add-plant-btn-container">
        <button
          className="add-plant-btn"
          onClick={() => navigate("/add-plant-tracking")}
        >
          ➕ Add Plant
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <ul className="plant-list">
        {plants.map((plant) => (
          <li key={plant._id} className="plant-card">
            <h3>{plant.plantName}</h3>
            <p><strong>Growth Stage:</strong> {plant.growthStage}</p>
            <p><strong>Health Status:</strong> {plant.healthStatus}</p>
            <p><strong>Observations:</strong> {plant.observations}</p>
            <p><strong>Reminder:</strong> {plant.reminderType} on {plant.reminderDate}</p>

            <div className="plant-buttons">
              <button className="update-btn" onClick={() => handleUpdate(plant)}>
                ✏️ Update
              </button>
              <button className="delete-btn" onClick={() => handleDelete(plant._id)}>
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Update Form */}
      {selectedPlant && (
        <div className="update-plant-form-container">
          <h2>Update Plant Details</h2>
          <form onSubmit={handleUpdatePlant}>
            <input
              type="text"
              name="plantName"
              placeholder="Plant Name"
              autoComplete="off"
              value={selectedPlant.plantName}
              onChange={(e) => setSelectedPlant({ ...selectedPlant, plantName: e.target.value })}
            />
            <input
              type="text"
              name="growthStage"
              placeholder="Growth Stage"
              autoComplete="off"
              value={selectedPlant.growthStage}
              onChange={(e) => setSelectedPlant({ ...selectedPlant, growthStage: e.target.value })}
            />
            <input
              type="text"
              name="healthStatus"
              placeholder="Health Status"
              autoComplete="off"
              value={selectedPlant.healthStatus}
              onChange={(e) => setSelectedPlant({ ...selectedPlant, healthStatus: e.target.value })}
            />
            <textarea
              name="observations"
              placeholder="Observations"
              value={selectedPlant.observations}
              onChange={(e) => setSelectedPlant({ ...selectedPlant, observations: e.target.value })}
            />
            <input
              type="date"
              name="reminderDate"
              value={selectedPlant.reminderDate?.slice(0, 10)}
              onChange={(e) => setSelectedPlant({ ...selectedPlant, reminderDate: e.target.value })}
            />
            <select
              name="reminderType"
              value={selectedPlant.reminderType}
              onChange={(e) => setSelectedPlant({ ...selectedPlant, reminderType: e.target.value })}
            >
              <option value="Watering">Watering</option>
              <option value="Repotting">Repotting</option>
              <option value="Pruning">Pruning</option>
            </select>

            <button type="submit">Update Plant</button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PlantTrackingList;

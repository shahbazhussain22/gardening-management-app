import React, { useState } from "react";
import axios from "axios";
import "./PlantIdentifier.css";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";

const PlantIdentifier = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      setError("");
      const response = await axios.post("http://localhost:3000/identify", formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to identify the plant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="identifier-container">
        <h2>🌿 Plant Identifier</h2>
        <form onSubmit={handleSubmit} className="identifier-form">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="preview-image" />}
          <button type="submit" disabled={loading}>
            {loading ? "Identifying..." : "Identify Plant"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {result && result.suggestions && result.suggestions.length > 0 && (
          <div className="result-card">
            <h3>🌱 Result:</h3>
            <p><strong>Name:</strong> {result.suggestions[0].plant_name}</p>
            <p><strong>Confidence:</strong> {(result.suggestions[0].probability * 100).toFixed(2)}%</p>
            {result.suggestions[0].plant_details?.common_names?.length > 0 && (
              <p><strong>Common Names:</strong> {result.suggestions[0].plant_details.common_names.join(", ")}</p>
            )}
            <p>
              <strong>Description:</strong>{" "}
              {result.suggestions[0].plant_details?.wiki_description?.value || "No description available."}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PlantIdentifier;

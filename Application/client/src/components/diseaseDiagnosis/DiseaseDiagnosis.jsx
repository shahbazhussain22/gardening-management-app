import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";
import "./DiseaseDiagnosis.css";

const DiseaseDiagnosis = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/disease-diagnosis", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Diagnosis error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="disease-diagnosis-container">
        <h2>Plant Disease Diagnosis</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="submit">Diagnose</button>
        </form>

        {loading && <p>Loading...</p>}

        {result && (
          <div>
            <h3>Diagnosis Result:</h3>
            <p>
              <strong>Is Healthy:</strong> {result.health_assessment?.is_healthy ? "Yes" : "No"}
            </p>
            <p>
              <strong>Confidence:</strong>{" "}
              {(result.health_assessment?.is_healthy_probability * 100).toFixed(2)}%
            </p>
            <h4>Diseases:</h4>
            <ul>
              {result.health_assessment?.diseases?.map((disease, index) => (
                <li key={index}>
                  <strong>{disease.name}</strong> {(disease.probability * 100).toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DiseaseDiagnosis;

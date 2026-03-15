import axios from "axios";

const API_URL = "http://localhost:3000"; 
// Helper: Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

// ============================
// User Authentication APIs
// ============================
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/user/signup`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/user/login`, credentials);
};

export const updateUser = async (userId, updatedData) => {
  return await axios.put(`${API_URL}/user/${userId}`, updatedData, getAuthHeaders());
};

// ============================
// Plant Tracking APIs
// ============================
export const addPlantTracking = async (plantData) => {
  return await axios.post(`${API_URL}/plant-tracking/add-plant-tracking`, {
    userId: plantData.userId,
    plantName: plantData.plantName,
    growthStage: plantData.growthStage,
    healthStatus: plantData.healthStatus,
    observations: plantData.observations || "",
    reminderDate: plantData.reminderDate || "",
    reminderType: plantData.reminderType || "Watering",
  }, getAuthHeaders());
};

export const getPlantTracking = async (userId) => {
  return await axios.get(`${API_URL}/plant-tracking/${userId}`, getAuthHeaders());
};

export const updatePlantTracking = async (id, updatedData) => {
  return await axios.put(`${API_URL}/plant-tracking/${id}`, updatedData, getAuthHeaders());
};

export const deletePlantTracking = async (id) => {
  return await axios.delete(`${API_URL}/plant-tracking/${id}`, getAuthHeaders());
};

// ============================
// 🌊 Watering Scheduler APIs
// ============================
export const upsertWateringSchedule = async (scheduleData) => {
  return await axios.post(`${API_URL}/watering/schedule`, scheduleData, getAuthHeaders());
};

export const getUserWateringSchedules = async () => {
  return await axios.get(`${API_URL}/watering/schedule`, getAuthHeaders());
};

export const deleteWateringSchedule = async (scheduleId) => {
  return await axios.delete(`${API_URL}/watering/schedule/${scheduleId}`, getAuthHeaders());
};


// ============================
// Community Groups APIs
// ============================
export const createGroup = async (groupData) => {
  return await axios.post(`${API_URL}/groups`, groupData, getAuthHeaders());
};

export const getGroups = async () => {
  const headers = getAuthHeaders().headers;
  return await axios.get(`${API_URL}/groups`, {
    headers,
  });
};


export const deleteGroup = async (id) => {
  return await axios.delete(`${API_URL}/groups/${id}`, getAuthHeaders());
};

export const joinGroup = async (groupId) => {
  return await axios.post(`${API_URL}/groups/${groupId}/join`, {}, getAuthHeaders());
};

export const leaveGroup = async (groupId) => {
  return await axios.post(`${API_URL}/groups/${groupId}/leave`, {}, getAuthHeaders());
};



// ============================
// Weather API Integration
// ============================
export const getWeatherForecast = async (latitude, longitude, userId) => {
  return await axios.get(`${API_URL}/weather`, {
    ...getAuthHeaders(),
    params: { latitude, longitude, userId },
  });
};

export const getWeatherForecastNotification = async (latitude, longitude, userId) => {
  return await axios.get(`${API_URL}/weather/notification`, {
    ...getAuthHeaders(),
    params: { latitude, longitude, userId },
  });
};



// ============================
// 🌿 Plant Identification API
// ============================
export const identifyPlant = async (formData) => {
  return await axios.post(`${API_URL}/identify`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// ============================
// 🦠 Disease Diagnosis API
// ============================
export const diagnoseDisease = async (symptoms) => {
  return await axios.post(`${API_URL}/diagnose`, { symptoms }, getAuthHeaders());
};


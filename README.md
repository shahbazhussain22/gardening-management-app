# Gardening Management Application 🌱

A full-stack MERN (MongoDB, Express, React, Node.js) web application designed to help users manage plants and receive intelligent gardening guidance.
The system provides plant information, personalized care recommendations, weather-based advice, and several tools to assist gardening enthusiasts.

---

## Features

### Plant Search

* Search plants by name
* View detailed plant information
* Admins can add new plants to the database

### Plant Tracking

* Users can track plants they own
* Add, update, and delete tracked plants
* Manage plant growth and status

### Weather Integration

* Fetches weather data using a weather API
* Provides gardening tips based on temperature conditions

### Watering Scheduler

* Automatically generate watering schedules
* Schedule stored per user and per plant
* Users can update watering schedules

### Plant Disease Diagnosis

* Tool to help users identify possible plant diseases
* Suggests possible treatment and care advice

### Plant Identifier

* Helps identify plants using an external plant identification API

### Personalized Plant Care

* Provides care recommendations based on:

  * user location
  * climate
  * soil type

### Gardening Community Groups

* Users can create or join gardening groups
* Share knowledge and interact with other gardeners

### User Authentication

* User registration and login
* Secure authentication using JWT

### Notifications

* System notifications for plant care activities and updates

---

## Tech Stack

Frontend

* React.js
* CSS
* Axios

Backend

* Node.js
* Express.js

Database

* MongoDB Atlas

External APIs

* OpenWeather API
* Plant Identification API

---

## Project Structure

Application
│
├── client (React Frontend)
│   ├── components
│   ├── public
│   └── src
│
├── Server (Node + Express Backend)
│   ├── controllers
│   ├── models
│   ├── routes
│   └── middleware
│
└── README.md

---

## Installation and Setup

### 1. Clone the Repository

git clone https://github.com/shahbazhussain22/gardening-management-app.git

### 2. Navigate to the Project Folder

cd gardening-management-app

### 3. Install Backend Dependencies

cd Application/Server
npm install

### 4. Install Frontend Dependencies

cd ../client
npm install

### 5. Configure Environment Variables

Create a `.env` file inside the Server folder and add the required variables such as:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENWEATHER_API_KEY=your_api_key
PLANT_ID_API_KEY=your_api_key

### 6. Run the Backend Server

cd Application/Server
nodemon server.js

### 7. Run the Frontend

cd Application/client
npm start

The application will run on:

http://localhost:3000

---

## Future Improvements

* Mobile responsive UI improvements
* Image upload for plant disease detection
* Push notifications for watering reminders
* Deployment for live access

---

## Author

Shahbaz Hussain
MERN Stack Developer

GitHub: https://github.com/shahbazhussain22

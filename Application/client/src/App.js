import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Component Imports
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Plant from "./components/plantSearch/plantSearch";
import UpdateProfile from "./components/Profile/UpdateProfile";
import PersonalizedCare from "./components/personlizedCare/PersonlizedCare";
import AddPlantTracking from "./components/PlantTracking/AddPlantTracking";
import PlantTrackingList from "./components/PlantTrackingList/PlantTrackingList";
import Tools from "./components/tools/tools";
import Groups from "./components/groups/Groups";
import Notification from "./components/notifications/Notification";
import WeatherForecast from "./components/Weather/WeatherForecast";
import PlantIdentifier from "./components/plantIdentifier/PlantIdentifier";
import DiseaseDiagnosis from "./components/diseaseDiagnosis/DiseaseDiagnosis";
import WateringSchedule from "./components/WateringSchedule/WateringScheduler";


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home user={user} />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />

        {/* Protected Routes */}
        <Route path="/updateProfile" element={user ? <UpdateProfile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/plantsearch" element={user ? <Plant user={user} /> : <Navigate to="/login" />} />
        <Route path="/personalized-care" element={user ? <PersonalizedCare user={user} /> : <Navigate to="/login" />} />
        <Route path="/add-plant-tracking" element={user ? <AddPlantTracking user={user} /> : <Navigate to="/login" />} />
        <Route path="/plant-tracking-list" element={user ? <PlantTrackingList user={user} /> : <Navigate to="/login" />} />
        <Route path="/tools" element={user ? <Tools /> : <Navigate to="/login" />} />
        <Route path="/groups" element={user ? <Groups /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={user ? <Notification userId={user._id} /> : <Navigate to="/login" />} />
        <Route path="/weather" element={user ? <WeatherForecast user={user} /> : <Navigate to="/login" />} />
        <Route path="/plant-identifier" element={user ? <PlantIdentifier user={user} /> : <Navigate to="/login" />} />
        <Route path="/disease-diagnosis" element={user ? <DiseaseDiagnosis user={user} /> : <Navigate to="/login" />} />
        <Route path="/watering-scheduler" element={user ? <WateringSchedule user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

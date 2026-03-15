import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";
import "./WateringScheduler.css";

const WateringScheduler = ({ user }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    plantName: "",
    nextWateringDate: "",
    frequency: "daily",
  });

  const fetchSchedules = async () => {
    try {
      const res = await axios.get("http://localhost:3000/watering/schedule", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSchedules(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchSchedules();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      plantName: form.plantName,
      scheduleDate: form.nextWateringDate,
      frequency: form.frequency,
    };

    try {
      await axios.post("http://localhost:3000/watering/schedule", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Schedule saved");

      setForm({
        plantName: "",
        nextWateringDate: "",
        frequency: "daily",
      });
      setEditing(null);
      fetchSchedules();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleEdit = (schedule) => {
    setForm({
      plantName: schedule.plantName,
      nextWateringDate: schedule.scheduleDate.split("T")[0],
      frequency: schedule.frequency,
    });
    setEditing(schedule._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/watering/schedule/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchSchedules();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="watering-scheduler">
        <h2>Watering Scheduler</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="plantName"
            name="plantName"
            placeholder="Plant Name"
            value={form.plantName}
            onChange={(e) => setForm({ ...form, plantName: e.target.value })}
            required
          />
          <input
            type="date"
            id="nextWateringDate"
            name="nextWateringDate"
            value={form.nextWateringDate || ""}
            onChange={(e) =>
              setForm({ ...form, nextWateringDate: e.target.value })
            }
            required
          />
          <select
            id="frequency"
            name="frequency"
            value={form.frequency}
            onChange={(e) => setForm({ ...form, frequency: e.target.value })}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>

          <button type="submit">{editing ? "Update" : "Add"} Schedule</button>
        </form>

        {loading ? (
          <p>Loading schedules...</p>
        ) : schedules.length === 0 ? (
          <p>No watering schedules found.</p>
        ) : (
          <ul>
            {schedules.map((schedule) => (
              <li key={schedule._id}>
                <strong>{schedule.plantName}</strong> - Next Watering:{" "}
                {schedule.scheduleDate
                  ? new Date(schedule.scheduleDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Invalid Date"}
                <br />
                Frequency: {schedule.frequency}
                <br />
                <button onClick={() => handleEdit(schedule)}>Edit</button>
                <button onClick={() => handleDelete(schedule._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WateringScheduler;

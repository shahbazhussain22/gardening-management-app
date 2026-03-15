import React, { useEffect, useState, useCallback } from 'react';
import './Notification.css';
import Navbar from '../Navbar/navbar';
import Footer from '../footer/footer';
import { getWeatherForecastNotification } from '../../api';

const Notification = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  // Memoized fetchNotifications function
  const fetchNotifications = useCallback(async () => {
    if (!userId) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await getWeatherForecastNotification(latitude, longitude, userId);
          console.log("notification", response);

          const tip = response?.data?.tip;
          const date = new Date().toLocaleString()
          if (tip) {
            setNotifications((prev) => [...prev, {tip, date}]);
          }
        } catch (err) {
          console.error("Failed to fetch weather data.", err);
        }
      },
      () => {
        console.error("Permission to access location was denied.");
      }
    );
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, [userId, fetchNotifications]);
  return (
    <div>
      <Navbar />
      <div className="notification-container">
        <h2>🔔 Notifications</h2>
        {notifications.length === 0 ? (
          <p className="no-notifications">No notifications found.</p>
        ) : (
          <ul className="notification-list">
            {notifications.map((notif, index) => (
              <li
                key={index}
                className={`notification-item weather-alert`}
              >
                <h4>Recommendation Update</h4>
                <p>{notif.tip }</p>
                {notif.type && (
                  <span className="notification-type">Type: {notif.type}</span>
                )}
                <span className="notification-date">
                  Scheduled: {notif?.date}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Notification;

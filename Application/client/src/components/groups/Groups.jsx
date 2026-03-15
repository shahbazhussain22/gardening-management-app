import React, { useEffect, useState } from "react";
import { createGroup, getGroups, deleteGroup } from "../../api";
import "./Groups.css";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    interests: "",
    facebook: "",
    whatsapp: "",
  });

  const userId = localStorage.getItem("userId");

  const fetchGroups = async () => {
    try {
      const res = await getGroups({});
      setGroups(res.data);
    } catch (err) {
      console.error("Failed to load groups", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
      interests: formData.interests.split(","),
      socialLinks: {
        facebook: formData.facebook,
        whatsapp: formData.whatsapp,
      },
    };

    try {
      await createGroup(payload);
      alert("Group created!");
      setFormData({
        name: "",
        description: "",
        interests: "",
        facebook: "",
        whatsapp: "",
      });
      fetchGroups();
    } catch (err) {
      console.error(err);
      alert("Error creating group");
    }
  };

  const handleJoin = (group) => {
    const { socialLinks } = group;
    if (socialLinks?.whatsapp) {
      window.open(socialLinks.whatsapp, "_blank");
    } else if (socialLinks?.facebook) {
      window.open(socialLinks.facebook, "_blank");
    } else {
      alert("No group link available to join.");
    }
  };

  const handleRemove = async (groupId) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      await deleteGroup(groupId);
      fetchGroups();
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="group-container">
      <form onSubmit={handleSubmit} className="group-form">
        <h4>Create Gardening Group</h4>
        <input
          name="name"
          placeholder="Group Name"
          onChange={handleChange}
          value={formData.name}
          required
          autoComplete="off"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
        />
        <input
          name="interests"
          placeholder="Interests (comma separated)"
          onChange={handleChange}
          value={formData.interests}
          autoComplete="off"

        />
        <input
          name="facebook"
          placeholder="Facebook Group Link"
          onChange={handleChange}
          value={formData.facebook}
          autoComplete="off"
        />
        <input
          name="whatsapp"
          placeholder="WhatsApp Group Link"
          onChange={handleChange}
          value={formData.whatsapp}
          autoComplete="off"
        />
        <button type="submit">Create</button>
      </form>

      <div className="group-list">
        <h4>Community Gardening Groups</h4>
        {groups.map((group) => (
          <div className="group-card" key={group._id}>
            <h5>{group.name}</h5>
            <p>{group.description}</p>
            <p>
              <strong>Interests:</strong> {group.interests?.join(", ")}
            </p>
            <div>
              {group.socialLinks?.facebook && (
                <a
                  href={group.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              )}
              {" "}
              {group.socialLinks?.whatsapp && (
                <a
                  href={group.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button className="join-btn" onClick={() => handleJoin(group)}>
                Join Group
              </button>

              {(group.createdBy === userId || group.createdBy?._id === userId) && (
                <button className="remove-btn" onClick={() => handleRemove(group._id)}>
                  Remove Group
                </button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Groups;

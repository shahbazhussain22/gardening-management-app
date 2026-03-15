const Group = require("../models/group");

// Create Group
const createGroup = async (req, res) => {
  try {
    const { name, description, interests, coordinates, socialLinks } = req.body;
    const userId = req.user.userId;

    const group = new Group({
      name,
      description,
      interests,
      location: { coordinates },
      createdBy: userId,
      members: [userId],
      socialLinks,
    });

    await group.save();
    res.status(201).json(group);
  } catch (error) {
    console.error("Error creating group:", error.message);
    res.status(500).json({ message: "Failed to create group", error: error.message });
  }
};


// Get Groups
const findGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("createdBy", "_id");
    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};

// Delete Group
const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete this group" });
    }

    await Group.findByIdAndDelete(req.params.id);
    res.json({ message: "Group deleted successfully" });
  } catch (err) {
    console.error("Error deleting group:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {createGroup , findGroups , deleteGroup};
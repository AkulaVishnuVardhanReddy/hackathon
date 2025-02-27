const express = require("express");
const eventRouter = express.Router();
const { Event } = require("../models/event");
const { adminAuth } = require("../middlewares/auth");

eventRouter.post("/create/event", adminAuth, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an event (Admin only)
eventRouter.delete("/event/:id", adminAuth, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get events with populated user and club details
eventRouter.get("/events", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("conductedBy", "clubName imageUrl")
      .populate("participants", "firstName lastName email")
      .sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
});

module.exports = eventRouter;

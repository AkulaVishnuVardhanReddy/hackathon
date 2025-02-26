const { adminAuth } = require("../middlewares/auth");
const express = require("express");
const { sendAnnouncement } = require("../utils/sendAnnouncement");
const adminRouter = express.Router();

adminRouter.post("/send/announcement", adminAuth, async (req, res) => {
  try {
    // Send announcement code here
    const { title, content, audience } = req.body;
    sendAnnouncement(
      title,
      content,
      audience ? audience : "all",
      req._id,
      "Admin"
    );
    res.send("Announcement sent successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = adminRouter;

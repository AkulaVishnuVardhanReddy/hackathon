const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  aboutEvent: { type: String },
  conductedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Event = mongoose.model("Event", eventSchema);
module.exports = { Event };

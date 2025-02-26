const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  currentCompany: { type: String },
  jobRole: { type: String },
  linkedinProfile: { type: String },
  industry: { type: String },
});

const Alumni = mongoose.model("Alumni", alumniSchema);
module.exports = { Alumni };

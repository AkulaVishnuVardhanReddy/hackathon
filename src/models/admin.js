const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@admin\.in$/, "Invalid Admin Email"], // Ensures @admin.in domain
  },
  password: {
    type: String,
    required: true,
  },
});

// 🔑 Generate JWT Token
adminSchema.methods.getJWT = function () {
  return jwt.sign({ _id: this._id, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// 🔍 Validate Password
adminSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = { Admin };

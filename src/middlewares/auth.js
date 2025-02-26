const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { Faculty } = require("../models/faculty");
require("dotenv").config();

const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const token = cookie.token;
    //validating the token
    if (!token) {
      return res.status(401).send("Unautorized");
    }
    //extracting the payload
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      throw new Error("Invalid token");
    }
    const { _id } = payload;

    //getting the details of the user
    const user = await User.findById({ _id });
    if (!user) {
      throw new Error("Invalid User");
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(400).send("ERROR: " + e.message);
  }
};

const facultyAuth = async (req, res) => {
  try {
    const cookie = req.cookies;
    const token = cookie.token;
    //validating the token
    if (!token) {
      return res.status(401).send("Unautorized");
    }
    //extracting the payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      throw new Error("Invalid token");
    }
    const { _id } = payload;
    const faculty = await Faculty.findById({ _id });
    if (!faculty) {
      throw new Error("Invalid User");
    }
    req.faculty = faculty;
    next();
  } catch (e) {
    return res.status(400).send("ERROR: " + e.message);
  }
};
module.exports = { userAuth, facultyAuth };

const express = require("express");
const { User } = require("../models/user");
const cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");
const {
  validateSignupData,
  validateLoginData,
} = require("../utils/validaation");

const authRouter = express.Router();
authRouter.use(cookieParser());
//create a new user
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    validateLoginData(req);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Credientials");
    }
    const isValidPassword = await user.isValidPassword(password);
    if (isValidPassword) {
      //create a jwt token
      //add token to cookie send the response back to user
      const token = await user.getJWT();

      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      res.send(user);
    } else {
      throw new Error("Invalid Credientials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//logout route
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Successfully Logout");
});
module.exports = authRouter;

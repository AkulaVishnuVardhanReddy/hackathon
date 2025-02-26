const express = require("express");
const bcrypt = require("bcrypt");
const { studentAuth } = require("../middlewares/auth");
const {
  validateProfileEditData,
  validatePasswordChangeData,
} = require("../utils/validaation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", studentAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:  " + err.message);
  }
});

module.exports = profileRouter;

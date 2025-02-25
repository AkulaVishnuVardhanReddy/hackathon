const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter a Valid Name");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("The password is not strong");
  }
};

const validateLoginData = (req) => {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email");
  }
};

module.exports = {
  validateSignupData,
  validateLoginData,
};

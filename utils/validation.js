const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName && !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email Id is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not valid");
  }
};

const validateEditProfile = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "address",
    "profilePicture",
    "phoneNumber",
    "city",
    "about",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => {
    allowedEditFields.includes(field);
  });
  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfile };

const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required"],
      minLength: [3, "Firstname must be atleast 3 characters long"],
      maxLength: [25, "Firstname can't exceed 25 characters"],
    },
    lastName: {
      type: String,
      maxLength: [25, "Lastname can't exceed 25 characters"],
    },
    emailId: {
      type: String,
      required: [true, "Email Id is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email id");
        }
      },
    },
    password: {
      type: String,
      required: [true, "Password is  required"],
      minLength: 6,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password", +value);
        }
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "others", "male", "female", "Others"],
        message: ` {value} is not a valid gender type`,
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phoneNumber: {
      type: Number,
      validate(value) {
        if (!/^\d{10}$/.test(value)) {
          throw new Error("Phone number must be a valid 10-digit number");
        }
      },
    },
    profilePicture: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL");
        }
      },
    },
    address: {
      country: {
        type: String,
        maxLength: 10,
      },
    },
    city: {
      type: String,
      maxLength: 20,
    },
    about: {
      type: String,
      maxLength: 500,
    },
  },

  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: this._id }, "QWERTY@)(*", {
    expiresIn: "1d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

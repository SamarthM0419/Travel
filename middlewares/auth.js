const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Please Login!!" });
    }

    const decodedObj = await jwt.verify(token, "QWERTY@)(*");
    const { _id } = decodedObj;

    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

const adminAuth = async (req, res, next) => {
  try {
    console.log("User role:", req.user?.role);
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth, adminAuth };

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
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await userAuth(req, res, () => {});

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .send("Forbidden: You do not have admin privileges.");
    }
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth, adminAuth };

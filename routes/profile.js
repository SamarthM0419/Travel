const express = require("express");
const profileRouter = express.Router();
const { userAuth, adminAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({ message: "User not found!!" });
    }
    res.status(200).json({
      message: "User profile fetched successfully",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        age: user.age,
        gender: user.gender,
        id: user._id,
        profilePicture: user.profilePicture,
        city: user.city,
        about: user.about,
      },
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile) {
      throw new Error("Invalid Edit request");
    }
    const user = req.user;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));

    await user.save();
    res.json({
      message: `${user.firstName}, your profile was updated successfully`,
      data: {
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          age: user.age,
          gender: user.gender,
          id: user._id,
          profilePicture: user.profilePicture,
          city: user.city,
          about: user.about,
        },
      },
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;

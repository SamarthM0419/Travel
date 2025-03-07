const express = require("express");
const destinationRouter = express.Router();
const { userAuth, adminAuth } = require("../middlewares/auth");
const Destination = require("../models/destination");

destinationRouter.post("/destinations", adminAuth, async (req, res) => {
  try {
    const {
      name,
      description,
      country,
      region,
      imageUrl,
      popularActivities,
      bestTimeToVisit,
      priceRange,
    } = req.body;

    const destination = new Destination({
      name,
      description,
      country,
      region,
      imageUrl,
      popularActivities,
      bestTimeToVisit,
      priceRange,
    });

    const newDestination = await destination.save();
    res.status(201).json(newDestination);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = destinationRouter;

const mongoose = require("mongoose");
const validator = require("validator");
const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount <= 100;
      },
      message: "Description should not be more than 100 words",
    },
  },
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  popularActivities: {
    type: String,
    required: true,
  },
  bestTimeToVisit: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  priceRange: {
    type: String,
    enum: ["budget", "mid-range", "luxury"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;

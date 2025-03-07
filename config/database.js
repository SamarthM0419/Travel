const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://samarth2534:RsSVw9fkcBCIDPWY@travelcluster.kdcwm.mongodb.net/appName=TravelCluster"
  );
};

module.exports = connectDb;

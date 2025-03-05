const express = require("express");
const app = express();
const connectDb = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", profileRouter);

connectDb()
  .then(() => {
    console.log("Database Connection Successful");
    app.listen(5000, () => {
      console.log("Server created successfully on port number 5000");
    });
  })
  .catch((err) => {
    console.error("Database Connection unsuccessful!!!", err.message);
  });

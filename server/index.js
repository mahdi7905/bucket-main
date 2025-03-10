const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/userRoutes");
const { bucketRouter } = require("./routes/bucketRoutes");
const { requireAuth } = require("./middleware/requireAuth");
require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("db connected and server running on port 4000")
    );
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/api/auth", userRouter);
app.use("/api/bucket", requireAuth, bucketRouter);

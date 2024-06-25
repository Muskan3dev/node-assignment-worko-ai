const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
app.use(express.json());
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log("Could not connect to mongodb", err);
  });

app.use("/worko", userRoutes);

const port = process.env.PORT || 3330;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

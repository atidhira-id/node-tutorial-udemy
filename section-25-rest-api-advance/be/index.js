const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/feed", feedRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://atidhiraid68:atidhiraid68@cluster0.it4y23n.mongodb.net/?appName=Cluster0",
    );
    console.log("Connected to MongoDB");

    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectDB();

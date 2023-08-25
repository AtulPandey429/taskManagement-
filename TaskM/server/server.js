const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
connectDB();
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");
const app = express();
app.use(express.json());
-app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("Home page");
});

const PORT = 5000;
mongoose
  .connect(
    "mongodb+srv://atul:CRUD@cluster0.cklyga1.mongodb.net/CRUD?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

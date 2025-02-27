const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const crudRoutes = require("./routes/crudRoutes");
const dontenv=require("dotenv");
dontenv.config();
const app = express();
const DB_URL=process.env.MONGO_URL
let PORT=process.env.PORT ||3000


// 🔹 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 MongoDB Connection
mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/chat",crudRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

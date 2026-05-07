require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const app = express();
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const taskRoutes = require("./routes/taskRoutes");

//connect Database
connectDB();

//Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
//test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//Test route for schema adding
// app.get("/test-user", async (req, res) => {
//   const user = await User.create({
//     name: "Test User",
//     email: "test@example.com",
//     password: "123456",
//   });
//   res.json(user);
// });

//Test Middle ware
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

//start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

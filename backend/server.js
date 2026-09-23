const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollmentRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "CourseHub API is running 🚀"
    });
});

// Server
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 CourseHub server running on http://localhost:${PORT}`);
});
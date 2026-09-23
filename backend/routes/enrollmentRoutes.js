
const express = require("express");

const {
    enrollCourse,
    getMyCourses
} = require("../controllers/enrollmentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Enroll in a course
router.post("/", protect, enrollCourse);


// Get courses of logged-in student
router.get("/mycourses", protect, getMyCourses);


module.exports = router;

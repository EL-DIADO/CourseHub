
const express = require("express");

const {
    getRegisteredStudents,
    getEnrollments
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/students", protect, adminOnly, getRegisteredStudents);
router.get("/enrollments", protect, adminOnly, getEnrollments);

module.exports = router;


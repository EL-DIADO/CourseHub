
const User = require("../models/User");
const Enrollment = require("../models/Enrollment");



// ---------------------- Register ------------//

const getRegisteredStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student" })
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: students.length,
            students
        });

    } catch (error) {
        console.error("Get students error:", error);

        res.status(500).json({
            message: "Server error while fetching students"
        });
    }
};


// ---------------------- Enrolled ------------------------//

const getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate("student", "name email")
            .populate("course", "title instructor price")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: enrollments.length,
            enrollments
        });

    } catch (error) {
        console.error("Get enrollments error:", error);

        res.status(500).json({
            message: "Server error while fetching enrollments"
        });
    }
};

// =====================================================//

module.exports = {
    getRegisteredStudents,
    getEnrollments
};


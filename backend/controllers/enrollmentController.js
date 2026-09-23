
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");


// Enroll in a course
const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({
                message: "Course ID is required"
            });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Check if student is already enrolled
        const existingEnrollment = await Enrollment.findOne({
            student: req.user.userId,
            course: courseId
        });

        if (existingEnrollment) {
            return res.status(400).json({
                message: "You are already enrolled in this course"
            });
        }

        const enrollment = await Enrollment.create({
            student: req.user.userId,
            course: courseId
        });

        res.status(201).json({
            message: "Course enrolled successfully",
            enrollment
        });

    } catch (error) {
        console.error("Enrollment error:", error);

        res.status(500).json({
            message: "Server error during enrollment"
        });
    }
};


// Get courses enrolled by logged-in student
const getMyCourses = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.user.userId
        })
            .populate("course")
            .sort({ createdAt: -1 });

        res.status(200).json({
            courses: enrollments
        });

    } catch (error) {
        console.error("Error fetching my courses:", error);

        res.status(500).json({
            message: "Server error while fetching enrolled courses"
        });
    }
};


module.exports = {
    enrollCourse,
    getMyCourses
};

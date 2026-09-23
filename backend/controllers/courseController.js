const Course = require("../models/Course");

// Get all courses
const getCourses = async (req, res) => {
    try {
        const { search } = req.query;

        let courses;

        if (search) {
            courses = await Course.find({
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                    { category: { $regex: search, $options: "i" } }
                ]
            });
        } else {
            courses = await Course.find();
        }

        res.status(200).json({
            courses
        });

    } catch (error) {
        console.error("Error fetching courses:", error);

        res.status(500).json({
            message: "Server error while fetching courses"
        });
    }
};


const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            course
        });

    } catch (error) {
        console.error("Error fetching course:", error);

        res.status(500).json({
            message: "Server error while fetching course"
        });
    }
};



// ---------------------------------------------------------------------------------//



// Create a new course
const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            instructor,
            duration,
            category,
            price
        } = req.body;

        // Check required fields
        if (!title || !description || !instructor || !duration || !category) {
            return res.status(400).json({
                message: "Please provide all required course details"
            });
        }

        // Create course
        const course = await Course.create({
            title,
            description,
            instructor,
            duration,
            category,
            price
        });

        res.status(201).json({
            message: "Course created successfully",
            course
        });

    } catch (error) {
        console.error("Error creating course:", error);

        res.status(500).json({
            message: "Server error while creating course"
        });
    }
};

// ---------------------------------------------------------------------------------//


// Update a course


const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course updated successfully",
            course: updatedCourse
        });

    } catch (error) {
        console.error("Error updating course:", error);

        res.status(500).json({
            message: "Server error while updating course"
        });
    }
};





// ---------------------------------------------------------------------------------//


// Delete a course
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting course:", error);

        res.status(500).json({
            message: "Server error while deleting course"
        });
    }
};


// ---------------------------------------------------------------------------------//

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};




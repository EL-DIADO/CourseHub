import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    Clock,
    UserRound,
    Tag,
    CheckCircle
} from "lucide-react";

import {
    getCourses,
    enrollCourse
} from "../api/api";


function CourseDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);

    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    // =====================================
    // LOAD COURSE
    // =====================================

    useEffect(() => {

        const loadCourse = async () => {

            try {

                setLoading(true);
                setError("");

                /*
                 * We already know GET /api/courses works.
                 * So we use that endpoint and find the
                 * requested course by its ID.
                 */

                const data = await getCourses();

                const foundCourse = data.courses?.find(
                    (item) => item._id === id
                );

                if (!foundCourse) {
                    throw new Error("Course not found");
                }

                setCourse(foundCourse);

            } catch (error) {

                console.error(
                    "COURSE DETAILS ERROR:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load course"
                );

            } finally {

                setLoading(false);

            }

        };

        loadCourse();

    }, [id]);


    // =====================================
    // ENROLL
    // =====================================

    const handleEnroll = async () => {

        try {

            setEnrolling(true);
            setError("");
            setMessage("");

            const data = await enrollCourse(
                course._id
            );

            console.log(
                "ENROLLMENT SUCCESS:",
                data
            );

            setMessage(
                data.message ||
                "Successfully enrolled!"
            );

        } catch (error) {

            console.error(
                "ENROLLMENT ERROR:",
                error
            );

            setError(
                error.message ||
                "Unable to enroll"
            );

        } finally {

            setEnrolling(false);

        }

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (
            <div className="course-details-page">

                <div className="course-details-loading">
                    Loading course...
                </div>

            </div>
        );

    }


    // =====================================
    // ERROR
    // =====================================

    if (error && !course) {

        return (
            <div className="course-details-page">

                <button
                    className="back-button"
                    onClick={() => navigate("/courses")}
                >
                    <ArrowLeft size={18} />
                    Back to courses
                </button>

                <div className="course-details-loading">
                    {error}
                </div>

            </div>
        );

    }


    return (

        <div className="course-details-page">

            {/* BACK */}

            <button
                className="back-button"
                onClick={() => navigate("/courses")}
            >
                <ArrowLeft size={18} />
                Back to courses
            </button>


            {/* COURSE HEADER */}

            <section className="course-details-hero">

                <div className="course-details-main">

                    <p className="card-label">
                        {course.category}
                    </p>

                    <h1>
                        {course.title}
                    </h1>

                    <p className="course-details-description">
                        {course.description}
                    </p>


                    <div className="course-info-row">

                        <div>
                            <UserRound size={18} />

                            <span>
                                {course.instructor}
                            </span>
                        </div>


                        <div>
                            <Clock size={18} />

                            <span>
                                {course.duration}
                            </span>
                        </div>


                        <div>
                            <Tag size={18} />

                            <span>
                                {course.category}
                            </span>
                        </div>

                    </div>

                </div>


                {/* ENROLL CARD */}

                <div className="enroll-card">

                    <p>
                        COURSE PRICE
                    </p>

                    <h2>
                        ₹{course.price}
                    </h2>


                    {message && (
                        <div className="enroll-success">

                            <CheckCircle size={18} />

                            <span>
                                {message}
                            </span>

                        </div>
                    )}


                    {error && (
                        <div className="enroll-error">
                            {error}
                        </div>
                    )}


                    <button
                        className="enroll-button"
                        onClick={handleEnroll}
                        disabled={enrolling || !!message}
                    >

                        {enrolling
                            ? "Enrolling..."
                            : message
                                ? "Enrolled"
                                : "Enroll Now"
                        }

                    </button>

                </div>

            </section>


            {/* COURSE CONTENT */}

            <section className="course-content-section">

                <p className="card-label">
                    COURSE OVERVIEW
                </p>

                <h2>
                    What you'll learn
                </h2>

                <div className="learning-points">

                    <div>
                        <BookOpen size={18} />
                        <span>
                            Learn {course.title} from fundamentals
                            to advanced concepts.
                        </span>
                    </div>

                    <div>
                        <CheckCircle size={18} />
                        <span>
                            Build practical knowledge through
                            structured learning.
                        </span>
                    </div>

                    <div>
                        <CheckCircle size={18} />
                        <span>
                            Develop skills you can use in real
                            projects.
                        </span>
                    </div>

                </div>

            </section>

        </div>

    );
}

export default CourseDetails;
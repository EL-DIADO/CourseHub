import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Clock,
    UserRound
} from "lucide-react";

import { getMyCourses } from "../api/api";


function MyCourses() {

    const navigate = useNavigate();

    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadMyCourses = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getMyCourses();

                console.log("MY COURSES:", data);

                setMyCourses(data.courses || []);

            } catch (error) {

                console.error(
                    "MY COURSES ERROR:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load your courses"
                );

            } finally {

                setLoading(false);

            }

        };

        loadMyCourses();

    }, []);


    return (

        <div className="page-card">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="page-header">

                <p className="card-label">
                    LEARNING
                </p>

                <h1>
                    My Courses
                </h1>

                <p>
                    Continue learning from the courses you've enrolled in.
                </p>

            </div>


            {/* =========================
                LOADING
            ========================= */}

            {loading && (

                <div className="course-loading">
                    Loading your courses...
                </div>

            )}


            {/* =========================
                ERROR
            ========================= */}

            {!loading && error && (

                <div className="course-loading">
                    {error}
                </div>

            )}


            {/* =========================
                EMPTY
            ========================= */}

            {!loading &&
                !error &&
                myCourses.length === 0 && (

                    <div className="empty-state">

                        <h2>
                            No courses yet
                        </h2>

                        <p>
                            Explore available courses and start learning.
                        </p>

                        <button
                            className="primary-button"
                            onClick={() => navigate("/courses")}
                        >
                            Explore courses
                        </button>

                    </div>

                )}


            {/* =========================
                COURSES
            ========================= */}

            {!loading &&
                !error &&
                myCourses.length > 0 && (

                    <div className="my-course-grid">

                        {myCourses.map((enrollment) => {

                            const course = enrollment.course;

                            if (!course) {
                                return null;
                            }

                            return (

                                <div
                                    className="my-course-card"
                                    key={enrollment._id}
                                >

                                    <div className="my-course-icon">
                                        {course.title?.charAt(0) || "C"}
                                    </div>


                                    <div className="my-course-content">

                                        <p className="card-label">
                                            {course.category}
                                        </p>

                                        <h2>
                                            {course.title}
                                        </h2>

                                        <p>
                                            {course.description}
                                        </p>


                                        <div className="my-course-meta">

                                            <span>
                                                <UserRound size={15} />
                                                {course.instructor}
                                            </span>

                                            <span>
                                                <Clock size={15} />
                                                {course.duration}
                                            </span>

                                        </div>

                                    </div>


                                    <button
                                        className="course-continue-button"
                                        onClick={() =>
                                            navigate(
                                                `/courses/${course._id}`
                                            )
                                        }
                                    >
                                        Continue
                                        <ArrowRight size={16} />
                                    </button>

                                </div>

                            );

                        })}

                    </div>

                )}

        </div>

    );

}

export default MyCourses;
import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Clock, TrendingUp } from "lucide-react";

import { getMyCourses } from "../api/api";

function Progress() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadProgress = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getMyCourses();

                console.log("PROGRESS DATA:", data);

                setCourses(data.courses || []);

            } catch (error) {

                console.error(
                    "PROGRESS ERROR:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load progress"
                );

            } finally {

                setLoading(false);

            }

        };

        loadProgress();

    }, []);


    // =====================================
    // CALCULATE PROGRESS
    // =====================================

    const totalCourses = courses.length;

    const completedCourses = courses.filter(
        (course) => (course.progress || 0) >= 100
    ).length;

    const inProgressCourses = courses.filter(
        (course) =>
            (course.progress || 0) > 0 &&
            (course.progress || 0) < 100
    ).length;

    const overallProgress =
        totalCourses > 0
            ? Math.round(
                courses.reduce(
                    (total, course) =>
                        total + (course.progress || 0),
                    0
                ) / totalCourses
            )
            : 0;


    if (loading) {

        return (
            <div className="page-card">

                <div className="page-header">

                    <p className="card-label">
                        LEARNING
                    </p>

                    <h1>
                        Progress
                    </h1>

                    <p>
                        Track your learning journey.
                    </p>

                </div>

                <div className="course-loading">
                    Loading progress...
                </div>

            </div>
        );

    }


    return (

        <div className="page-card">

            {/* =========================
                HEADER
            ========================= */}

            <div className="page-header">

                <p className="card-label">
                    LEARNING
                </p>

                <h1>
                    Progress
                </h1>

                <p>
                    Track your learning journey and course completion.
                </p>

            </div>


            {/* =========================
                ERROR
            ========================= */}

            {error && (
                <div className="progress-error">
                    {error}
                </div>
            )}


            {/* =========================
                OVERVIEW
            ========================= */}

            <div className="progress-overview">

                <div className="progress-stat-card">

                    <div className="progress-stat-icon">
                        <TrendingUp size={22} />
                    </div>

                    <div>
                        <strong>
                            {overallProgress}%
                        </strong>

                        <span>
                            Overall progress
                        </span>
                    </div>

                </div>


                <div className="progress-stat-card">

                    <div className="progress-stat-icon">
                        <BookOpen size={22} />
                    </div>

                    <div>
                        <strong>
                            {totalCourses}
                        </strong>

                        <span>
                            Active courses
                        </span>
                    </div>

                </div>


                <div className="progress-stat-card">

                    <div className="progress-stat-icon">
                        <Clock size={22} />
                    </div>

                    <div>
                        <strong>
                            {inProgressCourses}
                        </strong>

                        <span>
                            In progress
                        </span>
                    </div>

                </div>


                <div className="progress-stat-card">

                    <div className="progress-stat-icon">
                        <CheckCircle size={22} />
                    </div>

                    <div>
                        <strong>
                            {completedCourses}
                        </strong>

                        <span>
                            Completed
                        </span>
                    </div>

                </div>

            </div>


            {/* =========================
                COURSE PROGRESS
            ========================= */}

            <section className="progress-courses">

                <div className="section-heading">

                    <div>

                        <p className="card-label">
                            YOUR LEARNING
                        </p>

                        <h2>
                            Course progress
                        </h2>

                    </div>

                </div>


                {courses.length === 0 ? (

                    <div className="empty-state">

                        <BookOpen size={34} />

                        <h2>
                            No courses yet
                        </h2>

                        <p>
                            Enroll in a course to start tracking your progress.
                        </p>

                    </div>

                ) : (

                    <div className="progress-course-list">

                        {courses.map((course) => {

                            const progress =
                                course.progress || 0;

                            return (

                                <div
                                    className="progress-course-card"
                                    key={course._id}
                                >

                                    <div className="progress-course-top">

                                        <div>

                                            <p className="card-label">
                                                {course.category}
                                            </p>

                                            <h3>
                                                {course.title}
                                            </h3>

                                            <p>
                                                {course.instructor}
                                            </p>

                                        </div>

                                        <strong>
                                            {progress}%
                                        </strong>

                                    </div>


                                    <div className="progress-bar">

                                        <div
                                            className="progress-bar-fill"
                                            style={{
                                                width: `${progress}%`
                                            }}
                                        />

                                    </div>


                                    <div className="progress-course-bottom">

                                        <span>
                                            {progress >= 100
                                                ? "Completed"
                                                : progress > 0
                                                    ? "In progress"
                                                    : "Not started"
                                            }
                                        </span>

                                        <span>
                                            {progress} / 100
                                        </span>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </section>

        </div>

    );

}

export default Progress;
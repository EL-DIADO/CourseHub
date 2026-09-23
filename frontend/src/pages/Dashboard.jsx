import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  MoreHorizontal,
  Share2,
  CircleCheck,
  Circle,
  Pencil,
  Plus
} from "lucide-react";

import {
  getCourses,
  getMyCourses
} from "../api/api";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(
    localStorage.getItem("coursehub_user")
  );

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [courseError, setCourseError] = useState("");

  const [myCourses, setMyCourses] = useState([]);
  const [loadingMyCourses, setLoadingMyCourses] = useState(true);
  const [myCoursesError, setMyCoursesError] = useState("");

  // =====================================
  // LOAD MY COURSES
  // =====================================

  useEffect(() => {

    const loadMyCourses = async () => {

      try {

        const data = await getMyCourses();

        console.log("MY COURSES RESPONSE:", data);

        setMyCourses(
          data.courses || []
        );

      } catch (error) {

        console.error("MY COURSES ERROR:", error);

        setMyCoursesError(
          error.message || "Unable to load your courses"
        );

      } finally {

        setLoadingMyCourses(false);

      }

    };

    loadMyCourses();

  }, []);


  // =====================================
  // LOAD AVAILABLE COURSES
  // =====================================

  useEffect(() => {

    const loadCourses = async () => {

      try {

        const data = await getCourses();

        console.log("AVAILABLE COURSES:", data);

        setCourses(
          data.courses || []
        );

      } catch (error) {

        console.error("COURSES ERROR:", error);

        setCourseError(
          error.message || "Unable to load courses"
        );

      } finally {

        setLoadingCourses(false);

      }

    };

    loadCourses();

  }, []);


  return (
    <div className="dashboard">

      {/* =========================
          OVERALL INFORMATION
      ========================= */}

      <section className="dashboard-card overview-card">

        <div className="card-top">

          <div>
            <p className="card-label">
              OVERALL INFORMATION
            </p>

            <h2>
              Your learning overview
            </h2>
          </div>

          <div className="card-actions">
            <button>
              <Share2 size={17} />
            </button>

            <button>
              <MoreHorizontal size={18} />
            </button>
          </div>

        </div>


        <div className="overview-main">

          <div className="big-number">
            43
          </div>

          <div className="overview-description">
            learning activities
            <br />
            completed so far
          </div>

        </div>


        <div className="overview-stats">

          <div className="overview-stat">
            <strong>06</strong>
            <span>Courses</span>
          </div>

          <div className="overview-stat">
            <strong>02</strong>
            <span>In Progress</span>
          </div>

          <div className="overview-stat">
            <strong>01</strong>
            <span>Completed</span>
          </div>

        </div>

      </section>


      {/* =========================
          WEEKLY PROGRESS
      ========================= */}

      <section className="dashboard-card weekly-card">

        <div className="card-top">

          <div>
            <p className="card-label">
              WEEKLY PROGRESS
            </p>

            <h2>
              Learning activity
            </h2>
          </div>

          <button className="small-icon-button">
            <MoreHorizontal size={18} />
          </button>

        </div>


        <div className="legend">

          <span>
            <i className="legend-dot black-dot"></i>
            Study
          </span>

          <span>
            <i className="legend-dot gray-dot"></i>
            Practice
          </span>

        </div>


        <div className="chart">

          <div className="chart-line line-one"></div>

          <div className="chart-line line-two"></div>

          <div className="chart-base"></div>

        </div>


        <div className="chart-days">
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span className="today">S</span>
          <span>S</span>
        </div>

      </section>


      {/* =========================
          MONTH PROGRESS
      ========================= */}

      <section className="dashboard-card month-card">

        <div className="card-top">

          <div>
            <p className="card-label">
              MONTH PROGRESS
            </p>

            <h2>
              Course progress
            </h2>
          </div>

          <button className="small-icon-button">
            <MoreHorizontal size={18} />
          </button>

        </div>


        <p className="comparison">
          <strong>+20%</strong> compared to last month
        </p>


        <div className="progress-circle">

          <div className="progress-circle-inner">
            <strong>72%</strong>
            <span>Overall</span>
          </div>

        </div>


        <div className="progress-legend">

          <span>
            <i></i>
            Courses
          </span>

          <span>
            <i></i>
            Practice
          </span>

          <span>
            <i></i>
            Projects
          </span>

        </div>

      </section>


      {/* =========================
          GOALS
      ========================= */}

      <section className="dashboard-card goals-card">

        <div className="card-top">

          <div>
            <p className="card-label">
              MONTH GOALS
            </p>

            <h2>
              Learning goals
            </h2>
          </div>

          <button className="small-icon-button">
            <Pencil size={16} />
          </button>

        </div>


        <div className="goal-list">

          <div className="goal completed">
            <CircleCheck size={18} />
            <span>Register for a course</span>
          </div>

          <div className="goal">
            <Circle size={18} />
            <span>Complete the first lesson</span>
          </div>

          <div className="goal">
            <Circle size={18} />
            <span>Complete one course</span>
          </div>

          <div className="goal">
            <Circle size={18} />
            <span>Build a project</span>
          </div>

        </div>

      </section>


      {/* =========================
          CURRENT COURSES
      ========================= */}

      <section className="dashboard-card current-courses-card">

        <div className="card-top">

          <div>
            <p className="card-label">
              CURRENT COURSES
            </p>

            <h2>
              Continue learning
            </h2>
          </div>

          <button className="small-icon-button">
            <MoreHorizontal size={18} />
          </button>

        </div>


        <div className="course-task-row">

          {loadingMyCourses && (
            <div className="course-loading">
              Loading your courses...
            </div>
          )}


          {myCoursesError && (
            <div className="course-loading">
              {myCoursesError}
            </div>
          )}


          {!loadingMyCourses &&
            !myCoursesError &&
            myCourses.length === 0 && (
              <div className="course-loading">
                You haven't enrolled in any courses yet.
              </div>
            )}


          {!loadingMyCourses &&
            !myCoursesError &&
            myCourses.map((enrollment) => (

              <div
                className="mini-course"
                key={enrollment._id}
              >

                <div className="mini-course-icon blue-icon">
                  {enrollment.course?.title?.charAt(0) || "C"}
                </div>


                <div className="mini-course-info">

                  <h3>
                    {enrollment.course?.title}
                  </h3>

                  <p>
                    {enrollment.course?.instructor}
                  </p>

                </div>


                <span className="course-percent">
                  0%
                </span>

              </div>

            ))}


          <button
            className="add-course-card"
            onClick={() => navigate("/courses")}
          >

            <Plus size={20} />

            <span>
              Add course
            </span>

          </button>

        </div>

      </section>


      {/* =========================
          LAST / AVAILABLE COURSES
      ========================= */}

      <section className="courses-section">

        <div className="section-heading">

          <div>
            <p className="card-label">
              COURSEHUB
            </p>

            <h2>
              Available courses
            </h2>
          </div>

          <button
            className="view-all"
            onClick={() => navigate("/courses")}
          >
            View all
          </button>

        </div>


        <div className="course-grid">

          {loadingCourses && (
            <div className="course-loading">
              Loading courses...
            </div>
          )}

          {courseError && (
            <div className="course-loading">
              {courseError}
            </div>
          )}

          {!loadingCourses && !courseError && courses.length === 0 && (
            <div className="course-loading">
              No courses available.
            </div>
          )}

          {!loadingCourses &&
            !courseError &&
            courses.map((course, index) => (
              <div
                className={`course-card ${index === 0 ? "dark-course" : ""
                  }`}
                key={course._id}
              >

                <div className="course-card-top">

                  <span>
                    {course.category}
                  </span>

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                <h3>
                  {course.title}
                </h3>

                <p>
                  {course.description}
                </p>

                <div className="course-card-bottom">

                  <span>
                    ₹{course.price}
                  </span>

                  <button
                    onClick={() => navigate(`/courses/${course._id}`)}
                  >
                    View course
                  </button>

                </div>

              </div>
            ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;
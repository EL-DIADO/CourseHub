import { useEffect, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getCourses } from "../api/api";

function Courses() {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCourses = async (searchValue = "") => {

    try {

      setLoading(true);
      setError("");

      const data = await getCourses(searchValue);

      setCourses(data.courses || []);

    } catch (error) {

      console.error(error);

      setError(
        error.message || "Unable to load courses"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadCourses();

  }, []);


  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    loadCourses(value);

  };


  return (
    <div className="courses-page">

      {/* HEADER */}

      <div className="courses-header">

        <div>

          <p className="card-label">
            COURSEHUB
          </p>

          <h1>
            Explore courses
          </h1>

          <p>
            Find the right course and continue your learning journey.
          </p>

        </div>


        <div className="courses-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={handleSearch}
          />

        </div>

      </div>


      {/* CONTENT */}

      {loading && (
        <div className="course-loading">
          Loading courses...
        </div>
      )}


      {error && (
        <div className="course-loading">
          {error}
        </div>
      )}


      {!loading && !error && courses.length === 0 && (
        <div className="course-loading">
          No courses found.
        </div>
      )}


      {!loading && !error && courses.length > 0 && (

        <div className="course-grid">

          {courses.map((course, index) => (

            <div
              className={`course-card ${
                index === 0 ? "dark-course" : ""
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


              <div className="course-details-meta">

                <span>
                  {course.instructor}
                </span>

                <span>
                  {course.duration}
                </span>

              </div>


              <div className="course-card-bottom">

                <strong>
                  ₹{course.price}
                </strong>

                <button
                  onClick={() =>
                    navigate(`/courses/${course._id}`)
                  }
                >
                  View course
                  <ArrowRight size={16} />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Courses;
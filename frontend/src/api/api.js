const API_URL = "http://localhost:5000/api";


// =====================================
// GET STORED TOKEN
// =====================================

const getToken = () => {
    return localStorage.getItem("coursehub_token");
};


// =====================================
// LOGIN
// =====================================

export const loginUser = async (email, password) => {

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Login failed"
        );
    }

    return data;
};


// =====================================
// GET COURSES
// =====================================

export const getCourses = async (search = "") => {

    const response = await fetch(
        `${API_URL}/courses${search
            ? `?search=${encodeURIComponent(search)}`
            : ""
        }`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch courses"
        );
    }

    return response.json();
};


// =====================================
// GET MY COURSES
// =====================================

export const getMyCourses = async () => {
    const token = localStorage.getItem("coursehub_token");

    const response = await fetch(
        `${API_URL}/enroll/mycourses`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch your courses"
        );
    }

    return data;
};





// =====================================
// GET PROFILE
// =====================================

export const getProfile = async () => {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/profile`,
        {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch profile"
        );
    }

    return data;
};


// =====================================
// UPDATE PROFILE
// =====================================

export const updateProfile = async (profileData) => {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/profile`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(profileData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update profile"
        );
    }

    return data;
};




// =====================================
// LOGOUT
// =====================================

export const logoutUser = () => {
    localStorage.removeItem("coursehub_token");
};


// =====================================
// ENROLL IN COURSE
// =====================================

export const enrollCourse = async (courseId) => {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/enroll`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                courseId
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to enroll in course"
        );
    }

    return data;
};



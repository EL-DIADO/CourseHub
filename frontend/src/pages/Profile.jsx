import { useEffect, useState } from "react";
import { Save, UserRound, Mail } from "lucide-react";

import { getProfile, updateProfile } from "../api/api";


function Profile() {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        about: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    // =====================================
    // LOAD PROFILE
    // =====================================

    useEffect(() => {

        const loadProfile = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getProfile();

                console.log("PROFILE:", data);

                const user = data.user || data;

                setProfile({
                    name: user.name || "",
                    email: user.email || "",
                    about: user.about || "",
                });

            } catch (error) {

                console.error(
                    "PROFILE ERROR:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load profile"
                );

            } finally {

                setLoading(false);

            }

        };

        loadProfile();

    }, []);


    // =====================================
    // INPUT
    // =====================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setProfile((previous) => ({
            ...previous,
            [name]: value,
        }));

        setMessage("");
        setError("");

    };


    // =====================================
    // SAVE PROFILE
    // =====================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");
            setMessage("");

            const data = await updateProfile({
                name: profile.name,
                about: profile.about,
            });

            console.log(
                "PROFILE UPDATED:",
                data
            );

            const updatedUser =
                data.user || data;

            setProfile({
                name: updatedUser.name || profile.name,
                email: updatedUser.email || profile.email,
                about: updatedUser.about ?? profile.about,
            });


            // Update stored user information

            const storedUser =
                JSON.parse(
                    localStorage.getItem("coursehub_user")
                ) || {};

            localStorage.setItem(
                "coursehub_user",
                JSON.stringify({
                    ...storedUser,
                    ...updatedUser,
                })
            );


            setMessage(
                data.message ||
                "Profile updated successfully"
            );

        } catch (error) {

            console.error(
                "PROFILE UPDATE ERROR:",
                error
            );

            setError(
                error.message ||
                "Unable to update profile"
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (
            <div className="profile-page">

                <div className="profile-page-header">

                    <p className="card-label">
                        PROFILE
                    </p>

                    <div className="profile-header-line">
                        <span>01</span>
                    </div>

                </div>

                <div className="course-loading">
                    Loading profile...
                </div>

            </div>
        );

    }


    return (

        <div className="profile-page">

            {/* =================================
                PROFILE HEADER
            ================================= */}

            <div className="profile-page-header">

                <div className="profile-header-line">

                    <p className="card-label">
                        PROFILE
                    </p>

                    <span>
                        01
                    </span>

                </div>

            </div>


            {/* =================================
                PROFILE MAIN
            ================================= */}

            <section className="profile-main">


                {/* ===============================
                    LEFT SIDE
                =============================== */}

                <div className="profile-left">


                    {/* PROFILE IMAGE BOX */}

                    <div className="profile-image-box">

                        <UserRound size={72} strokeWidth={1.5} />

                    </div>


                    {/* ACCOUNT INFORMATION */}

                    <div className="profile-info">

                        <div className="active-account">

                            <span className="active-dot"></span>

                            <span>
                                ACTIVE ACCOUNT
                            </span>

                        </div>


                        <h1>
                            {profile.name}
                        </h1>


                        <p className="profile-role">
                            STUDENT
                        </p>


                        <div className="profile-email">

                            <Mail size={19} />

                            <span>
                                {profile.email}
                            </span>

                            <span className="email-arrow">
                                ↗
                            </span>

                        </div>

                    </div>


                    {/* =================================
                        EDIT PROFILE
                    ================================= */}

                    <div className="profile-edit-section">

                        <div className="profile-edit-header">

                            <p className="card-label">
                                ACCOUNT DETAILS
                            </p>

                            <h2>
                                Update your information
                            </h2>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="profile-field">

                                <label htmlFor="name">
                                    Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={profile.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="profile-field">

                                <label htmlFor="email">
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={profile.email}
                                    disabled
                                />

                                <small>
                                    Email cannot be changed here.
                                </small>

                            </div>


                            {error && (
                                <div className="profile-error">
                                    {error}
                                </div>
                            )}


                            {message && (
                                <div className="profile-success">
                                    {message}
                                </div>
                            )}


                            <button
                                type="submit"
                                className="profile-save-button"
                                disabled={saving}
                            >

                                <Save size={17} />

                                {saving
                                    ? "Saving..."
                                    : "Save changes"
                                }

                            </button>

                        </form>

                    </div>

                </div>


                {/* ===============================
                    RIGHT SIDE
                =============================== */}

                <div className="profile-stat">

                    <div className="profile-stat-number">
                        01
                    </div>

                    <div className="profile-stat-label">
                        ACTIVE COURSES
                    </div>

                </div>

            </section>


            {/* =================================
                ABOUT
            ================================= */}

            <section className="profile-about">

                <div className="profile-about-header">

                    <p className="card-label">
                        ABOUT
                    </p>

                    <p>
                        Tell us a little about yourself.
                    </p>

                </div>

                <textarea
                    name="about"
                    value={profile.about}
                    onChange={handleChange}
                    placeholder="Write something about yourself..."
                    rows={5}
                />

            </section>

            <div className="profile-field">

                <label htmlFor="about">
                    About
                </label>

                <textarea
                    id="about"
                    name="about"
                    value={profile.about}
                    onChange={handleChange}
                    placeholder="Write something about yourself..."
                    rows={5}
                />

            </div>

        </div>

    );

}

export default Profile;
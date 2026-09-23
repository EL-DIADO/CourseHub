import { useState } from "react";
import { Save, Settings as SettingsIcon, Bell, Lock } from "lucide-react";


function Settings() {

    const [notifications, setNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(true);
    const [message, setMessage] = useState("");


    const handleSave = () => {

        localStorage.setItem(
            "coursehub_settings",
            JSON.stringify({
                notifications,
                emailUpdates
            })
        );

        setMessage("Settings saved successfully.");

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };


    return (

        <div className="page-card">

            {/* =================================
                HEADER
            ================================= */}

            <div className="page-header">

                <p className="card-label">
                    SYSTEM
                </p>

                <h1>
                    Settings
                </h1>

                <p>
                    Manage your CourseHub preferences.
                </p>

            </div>


            {/* =================================
                SETTINGS CARD
            ================================= */}

            <div className="settings-card">


                {/* ACCOUNT */}

                <div className="settings-section">

                    <div className="settings-section-icon">
                        <SettingsIcon size={20} />
                    </div>

                    <div className="settings-section-content">

                        <h2>
                            General
                        </h2>

                        <p>
                            Manage your general CourseHub preferences.
                        </p>

                    </div>

                </div>


                {/* NOTIFICATIONS */}

                <div className="settings-row">

                    <div className="settings-row-info">

                        <div className="settings-row-icon">
                            <Bell size={18} />
                        </div>

                        <div>

                            <h3>
                                Notifications
                            </h3>

                            <p>
                                Receive notifications about your courses.
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className={`settings-toggle ${
                            notifications
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setNotifications(
                                !notifications
                            )
                        }
                    >

                        <span />

                    </button>

                </div>


                {/* EMAIL */}

                <div className="settings-row">

                    <div className="settings-row-info">

                        <div className="settings-row-icon">
                            <Bell size={18} />
                        </div>

                        <div>

                            <h3>
                                Email updates
                            </h3>

                            <p>
                                Receive important course updates by email.
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className={`settings-toggle ${
                            emailUpdates
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            setEmailUpdates(
                                !emailUpdates
                            )
                        }
                    >

                        <span />

                    </button>

                </div>


                {/* SECURITY */}

                <div className="settings-row">

                    <div className="settings-row-info">

                        <div className="settings-row-icon">
                            <Lock size={18} />
                        </div>

                        <div>

                            <h3>
                                Account security
                            </h3>

                            <p>
                                Your account is protected with secure authentication.
                            </p>

                        </div>

                    </div>

                </div>


                {/* SAVE */}

                <div className="settings-footer">

                    {message && (
                        <span className="settings-success">
                            {message}
                        </span>
                    )}

                    <button
                        type="button"
                        className="settings-save-button"
                        onClick={handleSave}
                    >

                        <Save size={17} />

                        Save settings

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Settings;
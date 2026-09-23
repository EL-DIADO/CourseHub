import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await loginUser(email, password);

            // Save authentication information
            localStorage.setItem(
                "coursehub_token",
                data.token
            );

            localStorage.setItem(
                "coursehub_user",
                JSON.stringify(data.user)
            );

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    C
                </div>

                <p className="auth-label">
                    COURSEHUB
                </p>

                <h1>
                    Welcome back
                </h1>

                <p className="auth-subtitle">
                    Sign in to continue your learning journey.
                </p>


                <form onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="student@coursehub.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>


                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}


                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign in"}
                    </button>

                </form>


                <p className="auth-footer">
                    Don't have an account?
                    <span
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Login;
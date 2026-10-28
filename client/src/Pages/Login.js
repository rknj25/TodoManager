
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://todomanager-thgb.onrender.com/api/users/login",
                {
                    email: email,
                    password: password
                }
            );

            // Check whether login was successful
            if (response.data.extEml) {

                // Save user details in localStorage
                localStorage.setItem(
                    "userId",
                    response.data.extEml._id
                );

                localStorage.setItem(
                    "userName",
                    response.data.extEml.name
                );

                localStorage.setItem(
                    "userEmail",
                    response.data.extEml.email
                );

                // Go to Dashboard
                navigate("/dashboard");

            } else {
                alert(response.data.message);
            }

        } catch (error) {
            console.error("Login Error:", error);
            alert("Login failed. Please check your server connection.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Login
                        </h2>

                        <form onSubmit={handleLogin}>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Login
                            </button>

                        </form>

                        <p className="text-center mt-3 mb-0">
                            Don't have an account?{" "}
                            <Link to="/register">
                                Register Here
                            </Link>
                        </p>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;

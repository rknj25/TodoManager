
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "https://todomanager-thgb.onrender.com/api/users/register",
                user
            );

            alert(res.data.message);

            if (res.data.message === "Registration successfull..") {
                navigate("/");
            }
        } catch (error) {
            alert("Registration Failed");
            console.log(error);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

                        {/* Heading */}
                        <div className="text-center mb-4">
                            <div
                                className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center shadow"
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    fontSize: "32px"
                                }}
                            >
                                +
                            </div>

                            <h2 className="fw-bold mt-3">
                                Create Account
                            </h2>

                            <p className="text-secondary">
                                Register to start managing your tasks
                            </p>
                        </div>

                        {/* Registration Card */}
                        <div className="card border-0 shadow-lg rounded-4">
                            <div className="card-body p-4 p-md-5">

                                <h4 className="text-center fw-bold mb-4">
                                    Sign Up
                                </h4>

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control form-control-lg"
                                            placeholder="Enter your name"
                                            value={user.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            placeholder="Enter your email"
                                            value={user.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control form-control-lg"
                                            placeholder="Create a password"
                                            value={user.password}
                                            onChange={handleChange}
                                            required
                                            minLength={6}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg w-100 fw-semibold"
                                    >
                                        Create Account
                                    </button>

                                </form>

                                <hr className="my-4" />

                                <p className="text-center text-secondary mb-0">
                                    Already have an account?{" "}
                                    <Link
                                        to="/"
                                        className="text-success fw-semibold text-decoration-none"
                                    >
                                        Login
                                    </Link>
                                </p>

                            </div>
                        </div>

                        <p className="text-center text-secondary small mt-4">
                            © Task Manager | Organize your day
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

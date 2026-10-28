
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const API = "https://todomanager-thgb.onrender.com/api/todos";

    const userId = localStorage.getItem("userId");

    const savedName = localStorage.getItem("userName");

    const [userName, setUserName] = useState(
        savedName &&
        savedName !== "undefined" &&
        savedName !== "null"
            ? savedName
            : "User"
    );

    const [todos, setTodos] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [editId, setEditId] = useState(null);

    // Get all todos for the logged-in user
    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${API}/${userId}`);

            setTodos(response.data.data || []);
        } catch (error) {
            console.log("Error fetching todos:", error);
            alert("Unable to load todos.");
        }
    };

    useEffect(() => {
        if (!userId) {
            navigate("/");
            return;
        }

        // Read the latest saved name
        const name = localStorage.getItem("userName");

        if (name && name !== "undefined" && name !== "null") {
            setUserName(name);
        }

        fetchTodos();
    }, [userId]);

    // Add or update todo
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter a todo title.");
            return;
        }

        try {
            if (editId) {
                await axios.put(`${API}/update/${editId}`, {
                    title,
                    description,
                    status:
                        todos.find((todo) => todo._id === editId)?.status ||
                        "Pending"
                });

                alert("Todo updated successfully.");
            } else {
                await axios.post(`${API}/add`, {
                    title,
                    description,
                    userId
                });

                alert("Todo added successfully.");
            }

            setTitle("");
            setDescription("");
            setEditId(null);

            fetchTodos();
        } catch (error) {
            console.log("Error saving todo:", error);
            alert("Unable to save todo.");
        }
    };

    // Load todo details into the form
    const handleEdit = (todo) => {
        setEditId(todo._id);
        setTitle(todo.title);
        setDescription(todo.description);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Change todo status
    const changeStatus = async (todo) => {
        const newStatus =
            todo.status === "Completed" ? "Pending" : "Completed";

        try {
            await axios.put(`${API}/update/${todo._id}`, {
                title: todo.title,
                description: todo.description,
                status: newStatus
            });

            fetchTodos();
        } catch (error) {
            console.log("Error updating status:", error);
            alert("Unable to update status.");
        }
    };

    // Delete todo
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this todo?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(`${API}/delete/${id}`);

            alert("Todo deleted successfully.");

            fetchTodos();
        } catch (error) {
            console.log("Error deleting todo:", error);
            alert("Unable to delete todo.");
        }
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditId(null);
        setTitle("");
        setDescription("");
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");

        navigate("/");
    };

    // Todo counts
    const totalTodos = todos.length;

    const completedTodos = todos.filter(
        (todo) => todo.status === "Completed"
    ).length;

    const pendingTodos = todos.filter(
        (todo) => todo.status !== "Completed"
    ).length;

    return (
        <div className="bg-light min-vh-100">

            {/* Navbar */}
            <nav className="navbar navbar-dark bg-primary shadow-sm">
                <div className="container flex-wrap gap-3">

                    <span className="navbar-brand fw-bold fs-4 mb-0">
                        ✓ Task Manager
                    </span>

                    <div className="d-flex align-items-center gap-3">
                        <span className="text-white">
                            Welcome, <strong>{userName}</strong>
                        </span>

                        <button
                            className="btn btn-outline-light"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </nav>

            <div className="container py-4">

                {/* Summary Cards */}
                <div className="row g-3 mb-4">

                    <div className="col-md-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h6 className="text-muted">
                                    Total Todos
                                </h6>
                                <h2 className="text-primary">
                                    {totalTodos}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h6 className="text-muted">
                                    Pending Todos
                                </h6>
                                <h2 className="text-warning">
                                    {pendingTodos}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h6 className="text-muted">
                                    Completed Todos
                                </h6>
                                <h2 className="text-success">
                                    {completedTodos}
                                </h2>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Add / Update Form */}
                <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body p-4">

                        <h4 className="mb-3">
                            {editId ? "Update Todo" : "Add New Todo"}
                        </h4>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">
                                    Todo Title
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter todo title"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary me-2"
                            >
                                {editId ? "Update Todo" : "Add Todo"}
                            </button>

                            {editId && (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={cancelEdit}
                                >
                                    Cancel
                                </button>
                            )}

                        </form>

                    </div>
                </div>

                {/* Todo List */}
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">

                        <h4 className="mb-3">My Todos</h4>

                        {todos.length === 0 ? (
                            <p className="text-muted mb-0">
                                No todos found. Add your first todo!
                            </p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">

                                    <thead className="table-primary">
                                        <tr>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {todos.map((todo) => (
                                            <tr key={todo._id}>

                                                <td className="fw-semibold">
                                                    {todo.title}
                                                </td>

                                                <td>
                                                    {todo.description || "-"}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`badge ${
                                                            todo.status === "Completed"
                                                                ? "bg-success"
                                                                : "bg-warning text-dark"
                                                        }`}
                                                    >
                                                        {todo.status}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="d-flex flex-wrap gap-2">

                                                        <button
                                                            className="btn btn-sm btn-outline-success"
                                                            onClick={() =>
                                                                changeStatus(todo)
                                                            }
                                                        >
                                                            {todo.status === "Completed"
                                                                ? "Pending"
                                                                : "Complete"}
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() =>
                                                                handleEdit(todo)
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() =>
                                                                handleDelete(todo._id)
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;

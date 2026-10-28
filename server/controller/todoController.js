
import todo from "../models/todo.js";

// Add Todo
export const addTodo = async (req, res) => {
    try {
        const { title, description, userId } = req.body;

        await todo.create({
            title,
            description,
            userId
        });

        return res.json({
            message: "Task Added"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error in adding task"
        });
    }
};

// Get Todo
export const getTodo = async (req, res) => {
    try {
        const { userId } = req.params;

        const todoList = await todo.find({ userId });

        return res.json({
            message: "Todo list found",
            data: todoList
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Data not found"
        });
    }
};

// Update Todo
export const updTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const updatedTodo = await todo.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.json({
            message: "Todo Updated",
            data: updatedTodo
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating task"
        });
    }
};

// Delete Todo
export const dltTodo = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTodo = await todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.json({
            message: "Task Deleted"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Task Not Deleted"
        });
    }
};

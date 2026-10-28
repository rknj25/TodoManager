
import todo from "../models/todo.js";
import user from "../models/user.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const extUsr = await user.findOne({ email });

        if (extUsr) {
            return res.json({
                message: "User already Used"
            });
        }

        const hashpass = await bcrypt.hash(password, 10);

        await user.create({
            name,
            email,
            password: hashpass
        });

        return res.json({
            message: "Registration successfull.."
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error in Registeration."
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user using email
        const extEml = await user.findOne({ email });

        if (!extEml) {
            return res.json({
                message: "Email not found"
            });
        }

        // Check password
        const pass = await bcrypt.compare(
            password,
            extEml.password
        );

        if (!pass) {
            return res.json({
                message: "Password not Matched.."
            });
        }

        // Login successful: return user details without password
        return res.json({
            message: "Login Successfully..",
            extEml: {
                _id: extEml._id,
                name: extEml.name,
                email: extEml.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Login Failed.."
        });
    }
};

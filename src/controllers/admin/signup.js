import { User } from "../../models/index.js";
import bcrypt from "bcrypt";

const signUp = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        if (!firstName || !lastName || !username || !email || !password) {
            throw new Error("All fields are required.");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstName,
            lastName,
            username,
            email,
            password: hashPassword
        });
        return res.status(201).json({
            status: 201,
            data: "User create."
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            name: "ValidationError",
            message: error.message
        })
    }
}
export default signUp;
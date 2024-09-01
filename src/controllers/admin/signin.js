import { User } from "../../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signIn = async (req, res, next) => {
    const secret = "Opps, I'm your secret.";
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            throw new Error("Fields are required.");
        };
        const user = await User.findOne({email: email}).lean();
        if(!user) {
            throw new Error("Unauthorizd access. Please check your login credentials.");
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword) {
            throw new Error("Incorrect email or password.");
        };
        const token = jwt.sign({userid: user._id, type: "signIn"}, secret, {expiresIn: '7d'});
        user.token = token;
        return res.status(200).json({
            status: 200,
            data: user,
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
}
export default signIn;


// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
  
//     if (email === 'admin@mydashboard.com' && password === 'admin@123') {
//       const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '2h' });
//       res.json({ token });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   });
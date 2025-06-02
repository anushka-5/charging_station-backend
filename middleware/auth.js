import JWT from "jsonwebtoken";
import User from "../models/user_model.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id); // ✅ Await this

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // ✅ Now a real user object
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

export default authMiddleware;

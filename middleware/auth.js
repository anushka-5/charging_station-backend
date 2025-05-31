import JWT from "jsonwebtoken";
import User from "../models/user_model.js";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);


        // user varification
        const user = User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

export default authMiddleware;

import jwt from "jsonwebtoken";
import  User  from "../Models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            res.status(401).json({ message: "unauthorised request" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Assuming you have defined the Sequelize model 'User' to have a 'token' column
        const user = await User.findOne({ where: { id: decodedToken?._id }, attributes: { exclude: ["password", "refreshToken"] } });

        if (!user) {
            res.status(401).json({ message: "Invalid access token" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid access token" });
    }
};

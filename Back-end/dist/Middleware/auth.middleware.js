"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_js_1 = __importDefault(require("../Models/user.model.js"));
const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            res.status(401).json({ message: "unauthorised request" });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // Assuming you have defined the Sequelize model 'User' to have a 'token' column
        const user = await user_model_js_1.default.findOne({ where: { id: decodedToken?._id }, attributes: { exclude: ["password", "refreshToken"] } });
        if (!user) {
            res.status(401).json({ message: "Invalid access token" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid access token" });
    }
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=auth.middleware.js.map
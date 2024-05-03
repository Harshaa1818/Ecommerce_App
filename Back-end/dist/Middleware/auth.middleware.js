"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const ApiError_js_1 = require("../utils/ApiError.js");
const asyncHandler_js_1 = require("../utils/asyncHandler.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_js_1 = __importDefault(require("../Models/user.model.js"));
exports.verifyJWT = (0, asyncHandler_js_1.asyncHandler)(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError_js_1.ApiError(401, "Unauthorized request");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // Assuming you have defined the Sequelize model 'User' to have a 'token' column
        const user = await user_model_js_1.default.findOne({ where: { id: decodedToken?._id }, attributes: { exclude: ["password", "refreshToken"] } });
        if (!user) {
            throw new ApiError_js_1.ApiError(401, "Invalid Access Token");
        }
        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiError_js_1.ApiError(401, error?.message || "Invalid access token");
    }
});
//# sourceMappingURL=auth.middleware.js.map
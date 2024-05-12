"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartItems = exports.registerController = exports.loginController = exports.RemoveFromCart = exports.addItemsToCart = exports.ViewCartItems = exports.ViewItems = exports.landingPage = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_js_1 = __importDefault(require("../Models/user.model.js"));
const grocery_items_js_1 = __importDefault(require("../Models/grocery.items.js"));
const cart_model_js_1 = __importDefault(require("../Models/cart.model.js"));
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        // Retrieve user from the database
        const user = await user_model_js_1.default.findByPk(userId);
        // Check if user exists
        if (!user) {
            return { message: "User not found" };
        }
        // Generate access token
        const accessToken = user.generateAccessToken(user);
        // Generate refresh token
        const refreshToken = user.generateRefreshToken(user);
        // Update refresh token in the database
        await user.update({ token: String(refreshToken) });
        return { accessToken, refreshToken };
    }
    catch (error) {
        return { message: "Internal server error" };
    }
};
const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }
    try {
        // Decode the refresh token
        const decodedToken = jsonwebtoken_1.default.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        // Query the database to find the user associated with the refresh token
        const user = await user_model_js_1.default.findOne({ where: { token: incomingRefreshToken } });
        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        // Check if the incoming refresh token matches the one stored in the database
        if (incomingRefreshToken !== user.token) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        const { accessToken } = await generateAccessAndRefreshTokens(user.id);
        const options = {
            httpOnly: true,
            secure: true
        };
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json({
            message: "Access token refreshed successfully",
            accessToken
        });
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }
};
const landingPage = () => {
};
exports.landingPage = landingPage;
const ViewItems = async (req, res) => {
    try {
        const items = await grocery_items_js_1.default.findAll();
        return res.status(200).json({ items });
    }
    catch (error) {
        console.error("Error viewing items:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.ViewItems = ViewItems;
const ViewCartItems = async (req, res) => {
    try {
        const { username } = req.body;
        console.log("username:", username);
        const userId = await user_model_js_1.default.findOne({ where: { username } });
        console.log("userId:", userId);
        const items = await cart_model_js_1.default.findAll({ where: { userId: userId.dataValues.id } });
        return res.status(200).json({ items });
    }
    catch (error) {
        console.error("Error viewing items:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.ViewCartItems = ViewCartItems;
const addItemsToCart = async (req, res) => {
    const { username, groceryItemId, quantity } = req.body;
    console.log();
    try {
        // Find the user by username
        const user = await user_model_js_1.default.findOne({ where: { username } });
        console.log(user.id);
        // If user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const existingItem = await grocery_items_js_1.default.findOne({ where: { id: groceryItemId } });
        if (!existingItem) {
            return res.status(404).json({ msg: "Grocery Items Not Found" });
        }
        // Find the existing cart item for the user
        const existingCartItem = await cart_model_js_1.default.findOne({ where: { userid: user.id, groceryItemId } });
        console.log(existingCartItem);
        if (existingCartItem) {
            const newQuantity = existingCartItem.dataValues.quantity + quantity;
            const updatedRows = await cart_model_js_1.default.update({ quantity: newQuantity }, { where: { userId: user.dataValues.id, groceryItemId: groceryItemId } });
            return res.status(200).json({ msg: "Product quantity updated successfully", cartItem: updatedRows, });
        }
        else {
            const newCartItem = await cart_model_js_1.default.create({ userid: user.id, groceryItemId, quantity });
            // If the item does not exist, create a new cart item
            return res.status(200).json({ msg: "Product added to cart successfully", cartItem: newCartItem });
        }
    }
    catch (err) {
        // Handle database errors
        return res.status(500).json({ msg: err.message });
    }
};
exports.addItemsToCart = addItemsToCart;
const RemoveFromCart = async (req, res) => {
    const { id } = req.body;
    try {
        cart_model_js_1.default.destroy({ where: { id } });
        return res.status(200).json({ msg: "Product removed successfully" });
    }
    catch (error) {
        return res.status(500).json({ msg: error });
    }
};
exports.RemoveFromCart = RemoveFromCart;
const loginController = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user with the provided email
        const user = await user_model_js_1.default.findOne({ where: { username } });
        console.log("user:", user.dataValues.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await user.isPasswordCorrect(password);
        const accessToken = user.generateAccessToken(user);
        const refreshToken = user.generateRefreshToken(user);
        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);
        const loggedInUser = await user_model_js_1.default.findByPk(user.id, { attributes: { exclude: ['password', 'refreshToken'] } });
        const options = {
            httpOnly: true,
        };
        res.cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .status(200)
            .json({
            user: loggedInUser,
            accessToken,
            refreshToken,
            message: "User logged in successfully"
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.loginController = loginController;
const registerController = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the user already exists
        const user = await user_model_js_1.default.findOne({ where: { username } });
        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        }
        // Create a new user
        const newUser = await user_model_js_1.default.create({ username, password, role: 'USER' });
        return res.status(201).json({ message: 'User created successfully', newUser });
    }
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.registerController = registerController;
const updateCartItems = async (req, res) => {
    const { id, quantity } = req.body;
    try {
        const cartItem = await cart_model_js_1.default.findOne({ where: { id } });
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        const updatedCartItem = await cart_model_js_1.default.update({ quantity }, { where: { id } });
        return res.status(200).json({ message: "Cart item updated successfully", updatedCartItem });
    }
    catch (error) {
        console.error("Error updating cart item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateCartItems = updateCartItems;
//# sourceMappingURL=usercontroller.js.map
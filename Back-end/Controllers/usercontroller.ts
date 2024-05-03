import { promises } from "dns"
import {sequelize, testConnection} from "../DB/Connect"
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import exp from "constants";
import  User  from '../Models/user.model.js'; 
import GroceryItem from '../Models/grocery.items.js';
import  Cart from '../Models/cart.model.js'; 

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        // Retrieve user from the database
        const user = await User.findByPk(userId);

        // Check if user exists
        if (!user) {
            return { message: "User not found" };
        }

        // Generate access token
        const accessToken =user.generateAccessToken(user);

        // Generate refresh token
        const refreshToken = user.generateRefreshToken(user);

        // Update refresh token in the database
        await user.update({token: String(refreshToken)});

        return { accessToken, refreshToken };
    } 
    catch (error) 
    {
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
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // Query the database to find the user associated with the refresh token
        const user = await User.findOne({ where: { token: incomingRefreshToken } });

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
    } catch (error) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }
};



export const landingPage=()=>{

}

export const ViewItems=async(req: Request, res: Response)=>{
    try{
        const items = await GroceryItem.findAll();
        return res.status(200).json({ items });
    }
    catch(error){
        console.error("Error viewing items:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    

}
export const ViewCartItems=async(req: Request, res: Response)=>{
    try{
        const {username} = req.body;
        console.log("username:",username);
        const userId = await User.findOne({ where: { username } });
        console.log("userId:",userId);
        const items = await Cart.findAll({where:{userId:userId.dataValues.id}});
        return res.status(200).json({ items });
    }
    catch(error){
        console.error("Error viewing items:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    

}

export const addItemsToCart = async (req: Request, res: Response) => {
    const { username, groceryItemId, quantity } = req.body;
    console.log();
    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        console.log(user.id);
        // If user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const existingItem = await GroceryItem.findOne({where :{id:groceryItemId}});
        if(!existingItem)
        {
            return res.status(404).json({msg:"Grocery Items Not Found"})
        }

        // Find the existing cart item for the user
        const existingCartItem = await Cart.findOne({ where: { userid: user.id, groceryItemId } });

        console.log(existingCartItem);
        if (existingCartItem) {
           const newQuantity = existingCartItem.dataValues.quantity + quantity;
           const updatedRows = await Cart.update(
            { quantity: newQuantity },
            { where: { userId: user.dataValues.id, groceryItemId: groceryItemId } }
          );
            return res.status(200).json({ msg: "Product quantity updated successfully", cartItem: updatedRows, });
        } else {
            const newCartItem = await Cart.create({ userid: user.id, groceryItemId, quantity });
            // If the item does not exist, create a new cart item
            return res.status(200).json({ msg: "Product added to cart successfully", cartItem: newCartItem });
        }
    } catch (err) {
        // Handle database errors
        return res.status(500).json({ msg: err.message });
    }
}
export const RemoveFromCart = async (req: Request, res: Response) => {
const {id} = req.body;
try {
    Cart.destroy({where:{id}});
    return res.status(200).json({msg:"Product removed successfully"});
} catch (error) {
    return res.status(500).json({msg:error});
}

}
export const loginController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Find the user with the provided email
        const user = await User.findOne({ where: { username } });
        console.log("user:",user.dataValues.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await user.isPasswordCorrect(password);
        
        
         const accessToken = user.generateAccessToken(user);
         const refreshToken = user.generateRefreshToken(user); 
         console.log("accessToken:",accessToken);
         console.log("refreshToken:",refreshToken);
        
         const loggedInUser = await User.findByPk(user.id, { attributes: { exclude: ['password', 'refreshToken'] } });
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


export const registerController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const user = await User.findOne({ where: { username } });

        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = await User.create({ username, password, role: 'USER'});

        return res.status(201).json({ message: 'User created successfully', newUser });
            
    } 
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUser = async (req: Request, res: Response) => {


}



export const registerUser = async (req: Request, res: Response): Promise<void> => {
}

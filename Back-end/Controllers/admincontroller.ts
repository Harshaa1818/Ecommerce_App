
import { Request, Response } from "express";

import { sequelize } from "../DB/Connect"
export const ViewItems=async(req:Request,res:Response)=>{
    try{
        const items = await GroceryItem.findAll();
        return res.status(200).json({ items });
    }
    catch(error){
        console.error("Error viewing items:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
       

}

import  GroceryItem  from "../Models/grocery.items.js";


export const AddProductInStore=async(req:Request,res:Response)=>{
    const {name,price,quantity,image}=req.body;
    try{
        const Product = await GroceryItem.create({ name, price, quantity,image});
        return res.status(200).json({msg:"Product added successfully",Product})
    
    }
    catch(err){
        return res.status(404).json({msg:err})
    }
}



// }

export const removeProductFromstore=async(req,res)=>{
    const {id}=req.body;
    try{
        const Product = await GroceryItem.destroy({where:{id}});
        return res.status(200).json({msg:"Product removed successfully",Product})
    
    }
    catch(err){
        return res.status(404).json({msg:err})
    }

}



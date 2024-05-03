import { sequelize } from "../DB/Connect.js";
import { DataTypes, Model } from "sequelize";

class GroceryItem extends Model {}

GroceryItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        
      }
    
      
  },
  {
    sequelize,
    modelName: "GroceryItem"
  }
);


export default GroceryItem;





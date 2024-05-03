// In the Cart model file

import { sequelize } from "../DB/Connect.js";
import { DataTypes, Model } from "sequelize";

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique:false
    },
    groceryItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique:false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique:false
    }
  },
  {
    sequelize,
    modelName: "Cart"
  }
);

export default Cart;

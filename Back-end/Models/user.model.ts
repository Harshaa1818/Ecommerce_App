
import { sequelize } from "../DB/Connect.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const User = sequelize.define(
  'UserTable', // Rename the table to UserTable
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING, // Add a column for JWT token
      allowNull: true // Allow null for now, it will be populated later
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    
  },
  {
    timestamps: true,
    hooks: {
        beforeCreate: async (user: typeof User) => { // Add type declaration for 'user'
            if (user.changed("password")) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
  }
);





User.prototype.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};



User.prototype.generateAccessToken = function() {
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          username: this.username,
          fullName: this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  );
};


User.prototype.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

export default User;
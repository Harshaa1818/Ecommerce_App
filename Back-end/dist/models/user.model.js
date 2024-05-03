"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Connect_js_1 = require("../DB/Connect.js");
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User = Connect_js_1.sequelize.define('UserTable', // Rename the table to UserTable
{
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: sequelize_1.DataTypes.STRING, // Add a column for JWT token
        allowNull: true // Allow null for now, it will be populated later
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.changed("password")) {
                user.password = await bcrypt_1.default.hash(user.password, 10);
            }
        }
    }
});
User.prototype.isPasswordCorrect = async function (password) {
    return await bcrypt_1.default.compare(password, this.password);
};
User.prototype.generateAccessToken = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};
User.prototype.generateRefreshToken = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
};
exports.default = User;
//# sourceMappingURL=user.model.js.map
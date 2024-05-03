"use strict";
// In the Cart model file
Object.defineProperty(exports, "__esModule", { value: true });
const Connect_js_1 = require("../DB/Connect.js");
const sequelize_1 = require("sequelize");
class Cart extends sequelize_1.Model {
}
Cart.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    groceryItemId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: false
    }
}, {
    sequelize: Connect_js_1.sequelize,
    modelName: "Cart"
});
exports.default = Cart;
//# sourceMappingURL=cart.model.js.map
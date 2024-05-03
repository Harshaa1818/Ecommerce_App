"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connect_js_1 = require("../DB/Connect.js");
const sequelize_1 = require("sequelize");
class GroceryItem extends sequelize_1.Model {
}
GroceryItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: Connect_js_1.sequelize,
    modelName: "GroceryItem"
});
exports.default = GroceryItem;
//# sourceMappingURL=grocery.items.js.map
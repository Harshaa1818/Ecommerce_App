"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductInStore = exports.removeProductFromstore = exports.AddProductInStore = exports.ViewItems = void 0;
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
const grocery_items_js_1 = __importDefault(require("../Models/grocery.items.js"));
const AddProductInStore = async (req, res) => {
    const { name, price, quantity, image } = req.body;
    try {
        const Product = await grocery_items_js_1.default.create({ name, price, quantity, image });
        return res.status(200).json({ msg: "Product added successfully", Product });
    }
    catch (err) {
        return res.status(404).json({ msg: err });
    }
};
exports.AddProductInStore = AddProductInStore;
// }
const removeProductFromstore = async (req, res) => {
    const { id } = req.body;
    try {
        const Product = await grocery_items_js_1.default.destroy({ where: { id } });
        return res.status(200).json({ msg: "Product removed successfully", Product });
    }
    catch (err) {
        return res.status(404).json({ msg: err });
    }
};
exports.removeProductFromstore = removeProductFromstore;
const updateProductInStore = async (req, res) => {
    try {
        const { id, price, quantity } = req.body;
        const item = await grocery_items_js_1.default.findOne({ where: { id } });
        console.log(item);
        if (!item) {
            return res.status(404).json({ msg: "Product not found" });
        }
        let newQuantity = item.dataValues.quantity;
        if (quantity !== undefined) {
            newQuantity += quantity;
            if (newQuantity < 0) {
                return res.status(400).json({ msg: "Quantity can't be negative" });
            }
        }
        const result = await item.update({ price, quantity: newQuantity });
        console.log(result);
        return res.status(200).json({ msg: "Product updated successfully", result });
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
exports.updateProductInStore = updateProductInStore;
//# sourceMappingURL=admincontroller.js.map
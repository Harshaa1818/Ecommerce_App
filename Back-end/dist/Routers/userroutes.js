"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_js_1 = require("../Controllers/usercontroller.js");
const userrouter = (0, express_1.Router)();
userrouter.route("/").get(usercontroller_js_1.landingPage);
userrouter.route("/viewitems").get(usercontroller_js_1.ViewItems);
userrouter.route("/additems").post(usercontroller_js_1.addItemsToCart);
userrouter.route("/ViewCartItems").post(usercontroller_js_1.ViewCartItems);
userrouter.route("/DeleteCartItems").post(usercontroller_js_1.RemoveFromCart);
userrouter.route("/updateCartItemss").post(usercontroller_js_1.updateCartItems);
exports.default = userrouter;
//# sourceMappingURL=userroutes.js.map
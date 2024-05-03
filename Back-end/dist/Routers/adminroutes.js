"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admincontroller_js_1 = require("../Controllers/admincontroller.js");
const express_1 = require("express");
const adminrouter = (0, express_1.Router)();
//adminrouter.route("/viewitems").get(ViewItems)
//adminrouter.route("/viewcart").get(ViewItems)
adminrouter.route("/additems").post(admincontroller_js_1.AddProductInStore);
//adminrouter.route("/updatedetails").post(UpdateDetails)
adminrouter.route("/deleteitems").post(admincontroller_js_1.removeProductFromstore);
exports.default = adminrouter;
//# sourceMappingURL=adminroutes.js.map
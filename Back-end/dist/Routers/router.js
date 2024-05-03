"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const basicRouter = express_1.default.Router();
const usercontroller_js_1 = require("../Controllers/usercontroller.js");
// Login route
basicRouter.post('/login', usercontroller_js_1.loginController);
// Register route
basicRouter.post('/register', usercontroller_js_1.registerController);
exports.default = basicRouter;
//# sourceMappingURL=router.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.static("public"));
//router declaration
const userroutes_js_1 = __importDefault(require("../Routers/userroutes.js"));
const adminroutes_js_1 = __importDefault(require("../Routers/adminroutes.js"));
const router_js_1 = __importDefault(require("../Routers/router.js"));
app.use("/api/v1/user", userroutes_js_1.default);
app.use("/api/v1/admin", adminroutes_js_1.default);
app.use("/api/v1", router_js_1.default);
//# sourceMappingURL=App.js.map
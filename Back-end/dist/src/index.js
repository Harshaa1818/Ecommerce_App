"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Sequelize instance and app from other modules
const Connect_js_1 = require("../DB/Connect.js");
const App_js_1 = require("./App.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: './.env'
});
// Sync the models with the database
Connect_js_1.sequelize.sync().then(() => {
    console.log('All models were synchronized successfully.');
    // Start the server
    const PORT = process.env.PORT || 8000;
    App_js_1.app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Unable to synchronize models:', error);
});
//# sourceMappingURL=index.js.map
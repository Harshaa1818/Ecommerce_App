"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('u975951085_lets', 'u975951085_project', 'Nikhil$2002', {
    dialect: 'mariadb',
    host: 'srv1334.hstgr.io',
});
exports.sequelize = sequelize;
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
exports.testConnection = testConnection;
//# sourceMappingURL=Connect.js.map
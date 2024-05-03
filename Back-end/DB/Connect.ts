
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('u975951085_lets', 'u975951085_project', 'Nikhil$2002', {
  dialect: 'mariadb',
  host: 'srv1334.hstgr.io', 
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { sequelize, testConnection };



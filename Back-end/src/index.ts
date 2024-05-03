// Import Sequelize instance and app from other modules
import { sequelize } from '../DB/Connect.js';
import { app } from './App.js';
import dotenv from 'dotenv';
dotenv.config({
  path: './.env'
})

// Sync the models with the database
sequelize.sync().then(() => {
  console.log('All models were synchronized successfully.');

  // Start the server
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to synchronize models:', error);
});

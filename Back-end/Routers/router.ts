import express from 'express';

const basicRouter = express.Router();
import {loginController,registerController} from '../Controllers/usercontroller.js';

// Login route
basicRouter.post('/login',loginController );

// Register route
basicRouter.post('/register',registerController);




export default basicRouter;
import {Router} from 'express'
import {landingPage,ViewItems,addItemsToCart,ViewCartItems,RemoveFromCart,updateCartItems} from '../Controllers/usercontroller.js';
import {verifyJWT} from '../Middleware/auth.middleware.js'

const userrouter=Router();

userrouter.route("/").get(landingPage)
userrouter.route("/viewitems").get(verifyJWT,ViewItems)
userrouter.route("/additems").post(verifyJWT,addItemsToCart)
userrouter.route("/ViewCartItems").post(verifyJWT,ViewCartItems)
userrouter.route("/DeleteCartItems").post(verifyJWT,RemoveFromCart)
userrouter.route("/updateCartItemss").post(verifyJWT,updateCartItems)


export default userrouter;

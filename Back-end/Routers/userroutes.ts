import {Router} from 'express'
import {landingPage,ViewItems,addItemsToCart,ViewCartItems,RemoveFromCart,updateCartItems} from '../Controllers/usercontroller.js';
import {verifyJWT} from '../Middleware/auth.middleware.js'

const userrouter=Router();

userrouter.route("/").get(landingPage)
userrouter.route("/viewitems").get(ViewItems)
userrouter.route("/additems").post(addItemsToCart)
userrouter.route("/ViewCartItems").post(ViewCartItems)
userrouter.route("/DeleteCartItems").post(RemoveFromCart)
userrouter.route("/updateCartItemss").post(updateCartItems)


export default userrouter;

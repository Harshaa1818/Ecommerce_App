
import {AddProductInStore,removeProductFromstore} from '../Controllers/admincontroller.js';
import {Router} from 'express';

const adminrouter=Router();


//adminrouter.route("/viewitems").get(ViewItems)
//adminrouter.route("/viewcart").get(ViewItems)
adminrouter.route("/additems").post(AddProductInStore)
//adminrouter.route("/updatedetails").post(UpdateDetails)
adminrouter.route("/deleteitems").post(removeProductFromstore)

export default adminrouter;  
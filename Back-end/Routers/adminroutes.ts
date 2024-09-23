
import {AddProductInStore,removeProductFromstore, updateProductInStore} from '../Controllers/admincontroller.js';
import {Router} from 'express';

const adminrouter=Router();


//adminrouter.route("/viewitems").get(ViewItems)
//adminrouter.route("/viewcart").get(ViewItems)
//adminrouter.route("/updatedetails").post(UpdateDetails)
adminrouter.route("/additems").post(AddProductInStore)
adminrouter.route("/deleteitems").post(removeProductFromstore)
adminrouter.route("/updateitems").post(updateProductInStore)


export default adminrouter;  
import express from "express";
const Router = express.Router();

import purchaseController from "../../controllers/purchase.controller";
import token from "../../middlewares/token";

Router.post('/', purchaseController.createUserReceipt)
Router.get('/', purchaseController.findUserGuestReceipts);
Router.get('/:orderId', purchaseController.findUserById);


export default Router;
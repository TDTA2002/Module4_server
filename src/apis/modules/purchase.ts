import express from "express";
const Router = express.Router();

import purchaseController from "../../controllers/purchase.controller";
import token from "../../middlewares/token";

Router.patch('/:orderId', token.validateToken, purchaseController.update);
Router.get('/', purchaseController.findManyGuestReceipts);
Router.post('/order-history', purchaseController.findGuestReceipt)
Router.post('/', purchaseController.createGuestReceipt)
Router.get('/:orderId', purchaseController.findById);

export default Router;
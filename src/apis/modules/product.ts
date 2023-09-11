import express from "express";
const Router = express.Router();

import productController from "../../controllers/product.controller";
import multer from 'multer'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now() * Math.random()}.${file.mimetype.split('/')[1]}`)
    }
})

const upload = multer({ storage: storage })
Router.post('/', upload.array('imgs'), productController.create)
Router.get('/', productController.getAllProducts)
Router.get("/findName", productController.findProductByName);
Router.get('/manyproduct', productController.findMany)
Router.get('/:productId', productController.findById)
Router.patch("/:productId", upload.single('avatar'), productController.update);


export default Router;
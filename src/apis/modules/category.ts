import express from 'express';
const router = express.Router();
import categoryController from '../../controllers/category.controller';
import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now() * Math.random()}.${file.mimetype.split('/')[1]}`)
    }
})

router.post('/', categoryController.create);
router.get('/', categoryController.findMany);

export default router;
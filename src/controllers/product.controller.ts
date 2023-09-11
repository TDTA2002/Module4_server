import productModel from "../models/product.model";
import { Request, Response } from "express";
import { uploadFileToStorage } from '../firebase'
import fs from 'fs'
export default {
    create: async function (req: Request, res: Response) {
        let data = JSON.parse(req.body.product);
        console.log("data", data)
        data.price = Number(data.price)
        let newProduct = {
            ...data,
            avatar: "abc.jpg"
        }

        if (req.files) {
            let avatarUrl = await uploadFileToStorage((req.files as any)[0], "md4", fs.readFileSync((req.files as any)[0].path))
            fs.unlink((req.files as any)[0].path, (err) => {

            })
            newProduct.avatar = avatarUrl
        }
        let productPictures = [];
        for (let i = 1; Number(i) < Number(req.files?.length); i++) {
            let path = await uploadFileToStorage((req.files as any)[i], "md4", fs.readFileSync((req.files as any)[i].path))
            fs.unlink((req.files as any)[i].path, (err) => {

            })
            productPictures.push({
                path
            })
        }
        try {
            let modelRes = await productModel.create(newProduct, productPictures);
            console.log("modelRes", modelRes)
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    getAllProducts: async function (req: Request, res: Response) {
        try {
            const products = await productModel.findAllProduct();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Không thể lấy danh sách sản phẩm' });
        }
    },
    /* phan trang */
    findMany: async function (req: Request, res: Response) {
        try {
            let maxItemPage = Number(req.query.maxItemPage);
            let skipItem = Number(req.query.skipItem);
            let modelRes = await productModel.findMany(maxItemPage, skipItem)

            return res.status(modelRes.status ? 200 : 221).json(modelRes)
        } catch (err) {

            return res.status(500).json({
                message: "Lỗi không xác định findMany!"
            })
        }
    },
    findById: async function (req: Request, res: Response) {
        try {
            let modelRes = await productModel.findById(String(req.params.productId));
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    findByCategory: async function (req: Request, res: Response) {
        try {
            let modelRes = await productModel.findByCategory(req.params.categoryId);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    findProductByName: async function (req: any, res: Response) {
        try {
            let modelRes = await productModel.findProductByName(req.query.search)
            return res.status(modelRes.status ? 200 : 213).json(modelRes)
        } catch (err) {
            return res.status(500).json({
                message: "findProductByName in controller failed"
            })
        }
    },
    update: async (req: Request, res: Response) => {

        req.body = JSON.parse(req.body.product_infor);
        console.log("req.body", req.body.avatar);

        if (req.file != undefined) {

            let url = await uploadFileToStorage(req.file, "md4", fs.readFileSync(req.file.path));
            fs.unlink(req.file.path, (err) => {

            })
            req.body.avatar = url;
        } else {
            console.log("đã vào else")
        }

        try {
            let result = await productModel.updateProduct(req.params.productId, req.body);
            console.log("result", result)
            return res.status(result.status ? 200 : 214).json(result)
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi xử lý!"
            })
        }
    }
}

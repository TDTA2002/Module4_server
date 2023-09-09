import categoryModel from "../models/category.model";
import { Request, Response } from "express";

export default {
    findMany: async function (req: Request, res: Response) {
        try {
            let modelRes = await categoryModel.findMany();
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    create: async function (req: Request, res: Response) {
        // let data = JSON.parse(req.body.category);
        let newCategory = {
            ...req.body
        }
        console.log("newCategory", newCategory)
        try {
            let modelRes = await categoryModel.create(newCategory);
            console.log("modelRes", modelRes)
            modelRes.message = "Add thành công";
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
}
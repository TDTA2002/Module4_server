import userModel from "../models/user.model";
import { Request, Response } from "express";

export default {
    getAllUser: async (req: Request, res: Response) => {
        try {
            let modelRes = await userModel.getUsers();
            const status = modelRes.length > 0 ? 200 : 214;
            return res.status(status).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Bad request!"
            });
        }
    }
}

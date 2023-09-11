import userModel, { NewUser } from "../models/user.model";
import { Request, Response } from "express";
import Text from '../language'
import mail, { templates } from "../services/mail";
import jwt from "../services/jwt";
import bcrypt from 'bcrypt'
export default {
    register: async function (req: Request, res: Response) {
        try {
            /* Hash Password */
            req.body.password = await bcrypt.hash(req.body.password, 10);
            let newUser: NewUser = {
                ...req.body,
                createAt: new Date(Date.now()),
                updateAt: new Date(Date.now())
            }
            let modelRes = await userModel.register(newUser);
            modelRes.message = (Text(String(req.headers.language)) as any)[modelRes.message];

            /* Mail */
            if (modelRes.status) {
                mail.sendMail({
                    to: `${modelRes.data?.email}`,
                    subject: "Xác thực email",
                    html: templates.emailConfirm({
                        confirmLink: `${process.env.SERVER_URL}auth/email-confirm/${jwt.createToken(modelRes.data, "300000")}`,
                        language: String(req.headers.language),
                        productName: "Shoe Store",
                        productWebUrl: 'http://localhost:5173/',
                        receiverName: modelRes.data?.firstName + '' + modelRes.data?.lastName
                    })
                })
            }

            return res.status(modelRes.status ? 200 : 213).json(modelRes)
        } catch (err) {

            return res.status(500).json({
                message: 'Internal Server Error',

            })
        }
    },
    login: async function (req: Request, res: Response) {
        try {
            let modelRes = await userModel.inforByUserName(req.body.userName);
            if (modelRes.status) {
                if (!modelRes.data?.isActive) {
                    return res.status(213).json({
                        message: (Text(String(req.headers.language)) as any).error001
                    });
                }
                let checkPassword = await bcrypt.compare(req.body.password, modelRes.data.password);
                if (!checkPassword) {
                    return res.status(213).json({
                        message: (Text(String(req.headers.language)) as any).error002
                    });
                }
                return res.status(200).json({
                    message: (Text(String(req.headers.language)) as any).success001,
                    token: jwt.createToken(modelRes.data, "1d")
                });
            }
            return res.status(modelRes.status ? 200 : 213).json({
                message: (Text(String(req.headers.language)) as any).error003
            });
        } catch (err) {
            return res.status(500).json({
                messsage: "Lỗi xử lý"
            })
        }
    },
    findUser: async function (req: Request, res: Response) {
        try {
            let modelRes = await userModel.findMany();
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    // updateUserStatus: async function (userId: string, newStatus: boolean): Promise<void> {
    //     try {
    //         const updatedUser = await userModel.updateUserStatus(userId, newStatus);
    //         if (updatedUser !== null) {
    //             console.log('Thông tin người dùng sau khi cập nhật:', updatedUser);
    //         } else {
    //             console.log('Không tìm thấy người dùng hoặc không cập nhật.');
    //         }
    //     } catch (error) {
    //         console.error('Lỗi:', error);
    //     }
    // }
}

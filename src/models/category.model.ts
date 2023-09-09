import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
interface PrismaErr {
    code?: string,
    meta?: {
        target: string
    },
    clientVersion?: string
}


export default {
    findMany: async function () {
        try {
            let categories = await prisma.categories.findMany();

            return {
                status: true,
                message: "Get categories ok!",
                data: categories
            }

        } catch (err) {
            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    },
    create: async function (newCategory: any) {
        try {
            let category = await prisma.categories.create({
                data: {
                    ...newCategory,
                },
            });
            return {
                status: true,
                message: "addCategorySuccess",
                data: category
            }
        } catch (err) {
            console.log("err", err)
            let message: string = "modelError"
            // type casting (as)
            switch ((err as PrismaErr).meta?.target) {
                case "categories_title_key":
                    message = "titleDuplicate"
                    break
                default:
            }
            return {
                status: false,
                message,
                data: null
            }
        }
    },
}

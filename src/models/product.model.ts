import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    create: async function (newProduct: any, productPictures: any) {
        try {
            let product = await prisma.products.create({
                data: {
                    ...newProduct,
                    productPictures: {
                        createMany: {
                            data: [
                                ...productPictures
                            ]
                        }
                    }
                },
                include: {
                    productPictures: true
                }
            });

            return {
                status: true,
                message: "Create product ok!",
                data: product
            }
        } catch (err) {
            console.log("lỗi model", err)
            return {
                status: false,
                message: "Lỗi model1",
                data: null
            }
        }
    },
    findAllProduct: async function () {
        try {
            let products = await prisma.products.findMany({

            })
            return {
                status: true,
                message: "Get products ok!",
                data: products
            }

        } catch (err) {
            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    },
    /* phan trang */
    findMany: async function (maxItemPage: number, skipItem: number) {
        try {
            let products = await prisma.products.findMany({
                skip: skipItem,
                take: maxItemPage,
            });
            let countItem = (await prisma.products.findMany()).length;
            let maxPage = Math.ceil(countItem / maxItemPage);
            return {
                status: true,
                message: "san pham duoc tim thay!",
                maxPage,
                data: products,
                help: countItem
            }
        } catch (err) {
            return {
                status: false,
                message: "lỗi model!"
            }
        }
    },
    findById: async function (productId: string) {
        try {
            let product = await prisma.products.findUnique({
                where: {
                    id: productId
                },
                include: {
                    productPictures: true
                }
            });

            return {
                status: true,
                message: "Get product detail ok!",
                data: product
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi model3",
                data: null
            }
        }
    },
    findByCategory: async function (categoryId: string) {
        try {
            let products = await prisma.products.findMany({
                where: {
                    categoryId: categoryId
                }
            });
            return {
                status: true,
                message: "get products successfully",
                data: products
            }
        } catch (err) {
            console.log("conlorr", err);

            return {
                status: false,
                message: "modelErr",
                data: null
            }
        }
    },
    findProductByName: async function (nameString: any) {
        console.log("name string", String(nameString));

        try {
            const result = await prisma.products.findMany({
                where: {
                    name: {

                        contains: nameString,
                    }
                },
                include: {
                    productPictures: true
                }
            })
            console.log("result", result);

            return {
                status: true,
                message: "findProductByName successfull ! ",
                data: result
            }

        } catch (err) {
            return {
                status: false,
                message: "search product that bai "
            }
        }
    },
    updateProduct: async function (productId: string, updatedData: any) {
        try {
            const updatedProduct = await prisma.products.update({
                where: {
                    id: productId
                },
                data: {
                    ...updatedData,
                },

            });

            if (updatedProduct) {
                return {
                    status: true,
                    message: "Cập nhật sản phẩm thành công!",
                    data: updatedProduct
                };
            } else {
                return {
                    status: false,
                    message: "Không tìm thấy sản phẩm để cập nhật.",
                    data: null
                };
            }
        } catch (err) {
            console.error("Lỗi model:", err);
            return {
                status: false,
                message: "Cập nhật sản phẩm thất bại.",
                data: null
            };
        }
    }

}
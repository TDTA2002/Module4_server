import { PrismaClient, ReceiptPayMode, ReceiptState } from '@prisma/client'
const prisma = new PrismaClient()

interface NewGuestReceiptDetail {
    productId: string;
    quantity: number;
}

interface GuestReceiptDetail extends NewGuestReceiptDetail {
    id: string;
    guestReceiptId: string;
}


interface NewGuestReceipt {
    email: string;
    phoneNumber: string;
    total: number;
    payMode: ReceiptPayMode;
    paid?: boolean;
}

interface GuestReceipt extends NewGuestReceipt {
    id: string;
    state?: ReceiptState;
    createAt: Date;
    acceptTime?: Date;
    shippingTime?: Date;
    doneTime?: Date;
    guestReceiptDetail: GuestReceiptDetail[];
}
export default {
    createGuestReceipt: async function (newGuestReceipt: NewGuestReceipt, guestReceiptDetailList: NewGuestReceiptDetail[]) {
        try {
            let receipt = await prisma.guestReceipts.create({
                data: {
                    ...newGuestReceipt,
                    guestReceiptDetail: {
                        createMany: {
                            data: guestReceiptDetailList
                        }
                    }
                },
                include: {
                    guestReceiptDetail: true
                }
            })
            return {
                status: true,
                message: "Order thành công!",
                data: receipt
            }
        } catch (err) {
            console.log("err", err);

            return {
                status: false,
                message: "Lỗi model!",
                data: null
            }
        }
    },
    findGuestReceipt: async function (guestEmail: string) {
        try {
            let receipts = await prisma.guestReceipts.findMany({
                where: {
                    email: guestEmail
                },
                include: {
                    guestReceiptDetail: true
                }
            })
            return {
                status: true,
                message: "Lấy danh sách order thành công! ",
                data: receipts
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi model!",
                data: null
            }
        }
    },
    findManyGuestReceipts: async function (maxItemPage: number, skipItem: number) {
        try {
            let orders = await prisma.guestReceipts.findMany({
                skip: skipItem,
                take: maxItemPage,
                include: {
                    guestReceiptDetail: true
                }
            });
            let countItem = (await prisma.guestReceipts.findMany()).length;
            let maxPage = Math.ceil(countItem / maxItemPage);
            return {
                status: true,
                message: "Lấy danh sách hoá đơn thành công",
                maxPage,
                data: orders,
            }
        } catch (err) {
            console.log("err", err);

            return {
                status: false,
                message: "modelErr",
            }
        }
    },
    findById: async function (orderId: string) {
        try {
            let order = await prisma.guestReceipts.findUnique({
                where: {
                    id: orderId
                },
                include: {
                    guestReceiptDetail: true
                }
            })
            return {
                status: true,
                message: "get Guest Receipt by Id successfully",
                data: order
            }
        } catch (err) {
            console.log("err", err);
            
            return {
                status: false,
                message: "modelErr",
                data: null
            }
        }
    },
}
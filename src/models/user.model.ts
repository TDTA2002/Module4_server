// import { myDataSource } from "../typeoms/app-data-source";
// import Products from "../typeoms/entities/product.entity";
// import users from "../typeoms/entities/user.entity";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type User = {
    id: number;
    name: string;
    email: string;
    numberphone: number;
}

const userss: User[] = [
    {
        id: 1,
        name: 'It me kiên',
        email: "buihaikien@gmail.com",
        numberphone: 9876543210
    },
    {
        id: 2,
        name: 'Em đi xa quá',
        email: "emdixaqua@gmail.com",
        numberphone: 1234567800
    },
    {
        id: 3,
        name: 'Anh vẫn đứng đợi',
        email: "anhvandungdoi@gmail.com",
        numberphone: 32765432100
    }

]

export default {
    getUsers(): Promise<User[]> {
        return new Promise((resolve) => resolve(userss));
    },
    // create: async function () {
    // let user = await myDataSource
    // .createQueryBuilder()
    // .insert()
    // .into(Users)
    // .values([
    //     { firstName: "kien", lastName: 'cothuadeptrai' },

    // ])
    // .execute()

    //     .getRepository(Users)
    //     .create({firstName: "kiennonack", lastName:"nomember"})
    //     const results = await myDataSource.getRepository(Users).save(user)

    // console.log("user", results);


    // const queryRunner = myDataSource.createQueryRunner();
    // await queryRunner.connect()
    // await queryRunner.startTransaction()
    // try {
    //     let product = queryRunner.manager
    //         .getRepository(Products)
    //         .create({ name: "Sản Phẩm 2" })
    //     const results2 = await queryRunner.manager.getRepository(Products).save(product)


    //     let user = queryRunner.manager
    //         .getRepository(Users)
    //         .create({ firstName: "Timber 12", lastName: "Phước" })
    //     const results1 = await queryRunner.manager.getRepository(Users).save(user)

    //     // commit transaction now:
    //     await queryRunner.commitTransaction()
    // } catch (err) {
    //     await queryRunner.rollbackTransaction()
    // }

    // }


    // confirm: async (data) => {
    //     try {
    //         let user = await prisma.users.update({
    //             where: {
    //                 email: data.email
    //             },
    //             data: {
    //                 email_confirm: true
    //             }
    //         })

    //         return {
    //             status: true,
    //             message: "Confirm email thành công!",
    //             data: user
    //         }
    //     } catch (err) {
    //         return {
    //             status: false,
    //             message: "Đang"
    //         }
    //     }
    // },
    // login: async (loginData) => {
    //     try {
    //         let user = await prisma.users.findUnique({
    //             // 1: user_name, 0: email
    //             where: loginData.type ? { user_name: loginData.user_name } : { email: loginData.user_name, email_confirm: true }
    //         })
    //         if (!user) {
    //             return {
    //                 status: false,
    //                 message: "Không tìm thấy người dùng!",
    //             }
    //         }
    //         return {
    //             status: true,
    //             message: "Thông tin người dùng!",
    //             data: user
    //         }
    //     } catch (err) {
    //         return {
    //             status: false,
    //             message: "Không tìm thấy người dùng!"
    //         }
    //     }
    // },
    // update: async (data) => {
    //     try {
    //         let user = await prisma.users.update({
    //             where: {
    //                 user_name: data.user_name
    //             },
    //             data: {
    //                 password: data.password
    //             }
    //         })

    //         return {
    //             status: true,
    //             message: "Update thành công!"
    //         }
    //     } catch (err) {
    //         return {
    //             status: false,
    //             message: "Lỗi gì đó!"
    //         }
    //     }
    // },
}









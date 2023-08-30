/*  Load file .env */
import dotenv from 'dotenv'
dotenv.config();

import express from 'express'

/* Tạo ra đối tượng server */
const server = express();
server.use(express.json());

server.use('/test', (req, res) => {
    return res.send("OK nhe1!")
})

/* Setup TypeORMS */
// import { myDataSource } from './typeoms/app-data-source'

// try {
//     myDataSource
//         .initialize()
//         .then(() => {
//             console.log("TypeORMS thành công!")
//         })
//         .catch((err) => {
//             console.error("TypeORMS thất bại!")
//         })
// } catch (err) {
//     console.log("Lỗi cú pháp!")
// }

/* Config Cors */
import cors from 'cors'
server.use(cors())

import bodyParser from 'body-parser';
server.use(bodyParser.json())

import axios from 'axios'
server.use("/authen-google", async (req, res) => {
    let result = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup=${process.env.FB_API_KEY}`, {
        idToken: req.body.token
    })
    console.log("result", result);
    
})

/* Version api setup */
import apiConfig from './apis'
server.use('/apis', apiConfig)


/* Đẩy server ra port trên mấy */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`server on link: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);

})
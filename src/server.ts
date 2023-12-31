/*  Load file .env */
import dotenv from 'dotenv'
dotenv.config();

import express from 'express'


/* Tạo ra đối tượng server */
const server = express();
server.use(express.json());

// import MailServer, { templates } from './services/mail'

// server.use("/test", async (req, res) => {
//     console.log("req.headers.language", req.headers.language);

//     let resuslt = await MailServer.sendMail({
//         to: "tranduytuananh203@gmail.com",
//         subject: "Thử Template",
//         html: templates.emailConfirm({
//             productName: 'Shoe Store',
//             productWebUrl: 'https://www.nike.com/',
//             receiverName: 'Người Dùng Mới',
//             confirmLink: 'abc.xyz',
//             language: String(req.headers.language)
//         })
//     })

//     console.log("resuslt", resuslt)
// })

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



import routeApi from './apis'
import guard from './middlewares/guard';
server.use('/apis', guard.ipAuthen, routeApi)


/* Version api setup */
// import apiConfig from './apis'
// server.use('/apis', apiConfig)


/* Đẩy server ra port trên mấy */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`server on link: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);

})
/*  Load file .env */
import dotenv from 'dotenv'
dotenv.config();

import express from 'express'

/* Tạo ra đối tượng server */
const server = express();
server.use(express.json());

server.use('/test', (req, res) =>{
    return res.send("OK nhe1!")
})

import apiConfig from './apis'
server.use('/apis', apiConfig)


/* Đẩy server ra port trên mấy */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`server on link: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);

})
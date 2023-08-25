import express from 'express'
const router = express.Router()

import userControll from '../../controllers/user.controll'

router.get('/', userControll.getAllUser)

export default router;

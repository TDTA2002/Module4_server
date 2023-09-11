import express from 'express'
const router = express.Router()

import userControll from '../../controllers/user.controll'

router.post('/login', userControll.login)
router.post('/', userControll.register)
router.get('/', userControll.findUser)
// router.patch('/:userId', userControll.updateUserStatus)



export default router;

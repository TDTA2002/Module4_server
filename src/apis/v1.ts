// import express from 'express'
// const router = express.Router()

// export default router;

import express from 'express'
const router = express.Router()

import user from './modules/user'
router.use('/users', user)

import authenApi from './modules/auth'
router.use('/auth', authenApi)


import cateApi from './modules/category'
router.use('/categories', cateApi)

import productApi from './modules/product'
router.use('/products', productApi)


import purchaseApi from './modules/purchase'
router.use('/purchase', purchaseApi)


import connectionApi from './modules/connection'
router.use('/connection', connectionApi)

import userchaseApi from './modules/userpurchase'
router.use('/userpurchase', userchaseApi)

export default router;

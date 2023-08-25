// import express from 'express'
// const router = express.Router()

// export default router;

import express from 'express'
const router = express.Router()

import user from './modules/user'
router.use('/users', user)

export default router;

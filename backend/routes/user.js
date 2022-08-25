const { createUser, verifyEmail } = require('../controllers/user');
const { userValidtor, validate } = require('../middlewares/validator');

const router =require('express').Router()


router.post('/create',userValidtor,validate,createUser)
router.post('/verify-email',verifyEmail)

module.exports= router;
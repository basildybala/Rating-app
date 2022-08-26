const { createUser, verifyEmail, resendEmailVerificationToken } = require('../controllers/user');
const { userValidtor, validate } = require('../middlewares/validator');

const router =require('express').Router()


router.post('/create',userValidtor,validate,createUser)
router.post('/verify-email',verifyEmail)
router.post("/resend-email-verification-token", resendEmailVerificationToken);

module.exports= router;
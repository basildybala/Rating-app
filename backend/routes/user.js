const { createUser } = require('../controllers/user');

const router =require('express').Router()


router.get('/',createUser)


module.exports= router;
const { createUser } = require('../controllers/user');

const router =require('express').Router()


router.get('/create',createUser)


module.exports= router;
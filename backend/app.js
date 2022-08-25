const express = require('express');
const app=express()
require('./db')
const userRoutes=require('./routes/user')
require('dotenv').config()
app.use(express.json());
app.use(express.urlencoded({extended:true}))





app.use('/api/user',userRoutes)




app.listen(process.env.PORT,()=>{
    console.log(`Server running ${process.env.PORT}`)
})
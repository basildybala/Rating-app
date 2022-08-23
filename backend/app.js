const express = require('express');
const app=express()

const userRoutes=require('./routes/user')













app.use('/user',userRoutes)




app.listen(8000,()=>{
    console.log("Server running 8000")
})
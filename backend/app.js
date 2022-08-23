const express = require('express');
const app=express()
require('./db')
const userRoutes=require('./routes/user')

app.use(express.json());
app.use(express.urlencoded({extended:true}))





app.use('/api/user',userRoutes)




app.listen(8000,()=>{
    console.log("Server running 8000")
})
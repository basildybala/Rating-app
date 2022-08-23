const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/review_app')
.then(()=>{
    console.log("mongoDb SucessFully Running ")
}).catch((err)=>{
    console.log("MongoDb Err",err)
})
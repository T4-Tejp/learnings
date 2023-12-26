const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.get('/',(req,res)=>{
    res.status(200).json({
        status:"success",
        message:"server started",
        data:{}
    })
})

app.get('/users',(req,res)=>{
    let users = [
        {id:1,name:"ram",age:12},
        {id:2,name:"raja",age:12},
        {id:3,name:"mohan",age:12},
        {id:4,name:"rai",age:12}
    ]
    res.status(200).json({
        status:"success",
        message:"server started",
        data:users
    })
})


app.listen(8888,()=>{
    console.log("server started");
})


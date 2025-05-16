const express =require('express');
const aiRoutes=require('./Routes/ai.routes')
const app= express();
const cors =require('cors')

app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send('hello world')
})


app.use("/ai",aiRoutes)
module.exports=app;
const express =require('express');
const aiRoutes=require('./Routes/ai.routes')
const app= express();
const cors =require('cors')

const allowedOrigins = ['https://code-reviewer-1-ydz8.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send('hello world')
})


app.use("/ai",aiRoutes)
module.exports=app;
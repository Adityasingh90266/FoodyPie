const express=require('express');
const app=express();
app.use(express.json());
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.listen(3000,()=>{
    console.log("server is listening on port 3000");
});

const authRouter = require('./Router/authRouter');
const userRouter = require('./Router/userRouter');
const planRouter = require('./Router/planRouter');
const reviewRouter = require('./Router/reviewRouter');

app.use('/user',userRouter);
app.use('/auth',authRouter); 
app.use('/plans',planRouter); 
app.use('/review',reviewRouter);




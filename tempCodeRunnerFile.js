const express=require('express');
const app=express();
app.use(express.json());
app.listen(3000);

let users={};

let userRouter = express.Router();
let authRouter = express.Router();

app.use('/user',userRouter);
app.use('/auth',authRouter);

userRouter
.route('/')
.get(getRouter())
.post(postRouter())
.path(patchRouter())
.delete(deleteRouter())

authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp)

function getRouter(req,res){
   res.send(users);
// console.log({users});
}

function postRouter (req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received successfully",
    });
};

function patchRouter (req,res){
    let datatobeupdated=req.body;
    for(key in datatobeupdated){
        users[key]=datatobeupdated[key];
    }
    res.json({
        message:"Data updated sucessfully"
    })
}

function deleteRouter (req,res){
    users={};
    res.json({
        message:"data deleted sucesfully"   
    })
    
}

function getSignUp(req,res){
    res.sendFile('C:\Users\adity\OneDrive\Desktop\Backend\index.html')
}

function postSignUp(req,res){
    let obj=req.body;
    res.json({
        message:"user signed up",
        data:obj
    });
}
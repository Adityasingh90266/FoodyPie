const express=require('express');
const authRouter = express.Router();
const path = require('path');
const crypto = require('crypto');
const userModel = require('../models/userModels');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../secrets');
const res = require('express/lib/response');
const { sendMail } = require('../utility/nodemailer');

module.exports.signup =async function signup(req,res){
    try{
    let obj=req.body;
    let user =await userModel.create(obj);
    sendMail("signup",user);
    if(user){
    return res.json({
        message:"user signed up",
        data:user
    });
    }
    else{
        return res.json(err)({
        message:"error while signing up"
        });
    }
    }
catch(err){
    return res.status(500).json({
        message:err.message
    });
}
}

module.exports.login = async function loginUser(req,res){
    try{
    let data=req.body;
    let user=await userModel.findOne({email:data.email});
    if(user){
        console.log(user.password);
        console.log(data.password);
    if(user.password==data.password){
        console.log('hello');
        let uid=user['_id'];
        let token=jwt.sign({payload:uid},JWT_KEY);
        res.cookie('login',token,{httpOnly:true});
        return res.json({
            message:'User has Logged in',
            userDetails:user
        });
    }
    else{
        return res.json({
            message:'wrong credetials'
        })
    }
    }
    else{
        return res.json({
            message:'User not found'
        })
    }
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
}

module.exports.isAuthorised = function isAuthorised(roles){
    // let role=['admin'];
    return function(req,res,next){
        // console.log(role);
        // console.log(roles);
        if(roles.includes(req.role)==true){
            next();
        }
        else{
            res.status(401).json({
                message:"operation not allowed"
            })
        }
    }
}

module.exports.protectRoute = async function protectRoute(req,res,next){
    try{
    let token;
    if(req.cookies.login){
        // console.log(req.cookies);
        token=req.cookies.login;
        let payload = jwt.verify(token,JWT_KEY);
        // console.log(payload);
        if(payload){
        const user = await userModel.findById(payload.payload);
        req.role=user.role;
        req.id=user.id;
        next();
         }
        else{
            return res.json({
                message:'user not verified'
            })
        }
    }
    else{
        res.json({
                  message:"Please login",
        })
        return('/login');
    }
}
    catch{
        return res.json({
            message:'user not verified'
        });
    }
}

module.exports.forgetpassword = async function forgetpassword(req,res){
    let{email}=req.body;
    try{
        const user=await userModel.findOne({email:email});
        if(user){
            const resetToken=user.createResetToken();
            let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`

            let obj={
                resetPasswordLink:resetPasswordLink,
                email:email
            }
            sendMail("resetPassword",obj);
        }
        else{
            return res.json({
                message:"please signup"
            });
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.resetpassword = async function resetpassword(req,res){
    try{
        if(user){
            const token=req.params.token;
            let {password,confirmPassword}=req.body;
            const user=await user.findOne({resetToken:token});
            user.resetpasswordHandler(password,confirmPassword)
            await user.save();    
            res.json({
                message:"password changed sucessfully please login again"
            })
        }
        else{
            res.json({
                message:"user not found"
            });
        }
    }
    catch(err){
        res.json({
             message:"user not found"
        })
    }
}

module.exports.logout = function logout(req,res){
    res.cookie('login',' ',{maxAge:1});
    res.json({
        message:"user logged out sucessfully"
    });
}
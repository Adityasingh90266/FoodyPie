const { lutimes } = require('fs');
const userModel = require('../models/userModels');
const { error } = require('console');

module.exports.getUser = async function getUser(req, res) {
    let id=req.params.id;
    console.log(id);
    let user=await userModel.findById(id);
    if(user){
        res.send(user);
    }
    else{
        return(
            res.json({
                message:'user not found'
            })
        )
    }
}

// module.exports.postUser = function postUser (req,res){
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         message:"data received successfully",
//     });
// };

module.exports.updateUser = async function updateUser(req,res){
    try{
    let id=req.params.id;
    let user=await userModel.findById(id);
    let datatobeupdated=req.body;
    if(user){
        const keys=[];
        for(let key in datatobeupdated){
            keys.push(key);
        }

        for(let i=0;i<keys.length;i++){
            user[keys[i]]=datatobeupdated[keys[i]];
        }

        const updatedData = await user.save();

        res.json({
            message:"data updated sucessfully",
            data:user
        });
    }
    else{
        res.json({
            message:"user not found"
        })
    }
}
catch(err){
    res.json({
        message:err.message
    });
}
}

module.exports.deleteUser = async function deleteUser(req,res){
    // users={};
    try{
    let id=req.params.id;
    let user =await userModel.findByIdAndDelete(id);
    if(!user){
        res.json({
            message:'user not found'
        })
    }
    res.json({
        message:"data deleted sucesfully"   
    })
}
catch(err){
    res.json({
        message:err.message
    })
}
}

module.exports.getAllUsers= async function getAllUsers(req,res){
    console.log('welcome');
    let users = await userModel.find();
    if(users){
        res.json({
            message:'user retrieved',
            data:users
        });
    }
    else{
        res.json({
            message:'user doest not exist'
        })
    }
}


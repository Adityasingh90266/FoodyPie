const planModel = require('../models/planModels');

module.exports.getAllPlans = async function getAllPlan(req,res){
    try{
    let plans=await planModel.find();
    if(plans){
        return res.json({
            message:'all plans retrieved',
            data:plans
        })
    }
    else{
        return res.json({
            message:'plans not found'
        })
    }
}
catch(err){
    res.status(500).json({
        message:err.message,
    });
}
}

module.exports.getPlan = async function getPlan(req,res){
    try{
    let id=req.params.id;
    let plans=await planModel.findById(id);
    if(plans){
        return res.json({
            message:'plans retrieved',
            data:plans
        })
    }
    else{
        return res.json({
            message:'plans not found'
        })
    }
}
catch(err){
    res.status(500).json({
        message:err.message,
    });
}
}

module.exports.createPlan = async function createPlan(req,res){
    try{
    let planData = req.body;
    let createdPlan=await planModel.create(planData);
    return res.json({
        message:'plan created sucessfully',
        data:createdPlan
    })
}
catch(err){
    res.status(500).json({
        message:err.message,
    });
}
}

module.exports.deletePlan = async function deletePlan(req,res){
    try{
    let id=req.params.id;
    let deletedPlan=await planModel.findByIdAndDelete(id);
    return res.json({
        message:'plan deleted sucessfully',
        data:deletedPlan
    })
}
catch(err){
    res.status(500).json({
        message:err.message,
    });
}
}

module.exports.updatePlan =async function updatePlan(req,res){
    console.log("hey");
    try{ 
        let id=req.params.id;
        // console.log(id);
        let dataToBeUpdated=req.body;
        let keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        let plan=await planModel.findById(id);
        for(let i=0;i<keys.length;i++){
            plan[keys[i]]=dataToBeUpdated[keys[i]];
        }
        
        await plan.save();
        return res.json({
            message:'plan updated sucessfully',
            data:plan
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

//get top 3 plans

module.exports.top3Plans = async function top3Plans(req,res){
    try{
        const plans=await planModel.find().sort({
            ratingAverage:-1
        }).limit(3);
        return res.json({
            message:'top3 plans',
            data:plans
        })

    }
    catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
}
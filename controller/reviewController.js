const planModel = require('../models/planModels');
const reviewModel = require('../models/reviewModel');

module.exports.getAllReviews = async function getAllReviews(req,res){
    try{
        const reviews=await reviewModel.find();
        if(reviews){
            return res.json({
                message:"review retrieved",
                data:reviews
            })
        }
        else{
            return res.json({
                message:"review not found"
            })
        }
    }
    catch(err){
        return res.json({
            message:"review not found"
        })
    }
}

module.exports.top3reviews = async function top3reviews(req,res){
    try{
        const reviews=(await reviewModel.find()).sort({
            rating:-1
        }).limit(3);
        if(reviews){
            return res.json({
                message:"review retrieved",
                data:reviews
            })
        }   
        else{
            return res.json({
                message:"review not found"
            })
        }
    }
    catch(err){
        return res.json({
            message:"review not found"
        })
    }
}

module.exports.getPlanReviews = async function top3reviews(req,res){
    try{
        const Planid=req.params.id;
        const reviews=await reviewModel.find();
        reviews.filter(review=> review.plan._id==Planid);
        return res.json({
            message:'review retrieved for a particular plan is sucessfully recieved',
            data:reviews
        })
    }
    catch(err){
        return res.json({
            message:"review not found"
        })
    }
}

module.exports.createReview =async function createReview(req,res){
    try{
    let id=req.params.id;
    let plan=planModel.findById(id);
    let review=await reviewModel.create(req.body);
    plan.ratingAverage=(plan.ratingAverage+req.body.rating)/2;
    // console.log(plan);
    // await plan.save(); this not working
    res.json({
        message:'review created',
        data:plan
    })
  
}
catch(err){
    return res.json({
        message:"review not created"
    })
}
}

module.exports.updateReview = async function updateReview(req,res){
    let planid=req.params.id;
    let id=req.body.id;
    let dataToBeUpdated=req.body;
    let keys=[];
    for(let key in dataToBeUpdated){
        keys.push(key);
    }
    let review=await reviewModel.findById(id);
    for(let i=0;i<keys.length;i++){
        review[keys[i]]=dataToBeUpdated[keys[i]];
    }
    
    await review.save();
    return res.json({
        message:'review updated sucessfully',
        data:plan
    });

}

module.exports.deleteReview =async function createReview(req,res){
    try{
    let planid=req.params.id;
    let id=req.body.id;
    let review=await reviewModel.findByIdAndDelete(id);

    res.json({
        message:"review deleted",
        data:review
    })
}
catch(err){
    return res.json({
        message:"review not created"
    })
}
}
const db_link =
  "mongodb+srv://adityalp2510:h7CQYCJhe12PYy6S@cluster0.9i1osyn.mongodb.net/foodApp";
const mongoose = require("mongoose");
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("plan db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

  const planSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20,'plan name should not exceed more than 20 characters']
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true,'price not entered']
    },
    ratingAverage:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        validate:function(){
            return this.discount<100
        }
    }
  });

  
  const planModel=mongoose.model('planModel',planSchema)

  // (async function createPlan(){
  //   let planObj={
  //       name:'superfoor',
  //       duration:30,
  //       price:10000,
  //       ratingAverage:5,
  //       discount:20
  //   }

  // let data = await planModel.create(planObj);

  //   // const doc=new planSchema(planObj);
  //   // await doc.save();
  //   console.log(data);
  // })();


  module.exports = planModel;
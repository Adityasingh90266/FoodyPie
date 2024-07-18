const db_link =
  "mongodb+srv://adityalp2510:h7CQYCJhe12PYy6S@cluster0.9i1osyn.mongodb.net/foodApp";
const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    min:8,
  },
  confirmPassword: {
    type: String,
    // required: true,
    min:8,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "restaurantowner", "deliveryboy"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "img/users.default.jpeg",
  },
  resetToken:String,
});

userSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});

// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashedString = await bcrypt.hash(this.password, salt);
//   this.password = hashedString;
//   // console.log(hashedString);
// });

userSchema.methods.createResetToken=function(){
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken=resetToken;
  return resetToken;
}

userSchema.methods.resetPaswwordHandler=function(password,confirmPassword){
  this.password=password;
  this.confirmPassword=confirmPassword;
  this.resetToken=undefined;
} 
const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;

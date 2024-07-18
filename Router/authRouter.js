const express = require("express");
const authRouter = express.Router();
const path = require("path");
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../secrets");

authRouter.route("/signup").get(getSignUp).post(postSignUp);

authRouter.route("/login").post(loginUser);

function getSignUp(req, res) {
  let obj = userModel.res.sendFile(path.join(__dirname, "index.html"));
}

async function postSignUp(req, res) {
  let obj = req.body;
  let user = await userModel.create(obj);
  console.log("backend", user);
  res.json({
    message: "user signed up",
    data: user,
  });
}

async function loginUser(req, res) {
  try {
    let data = req.body;
    let user = await userModel.findOne({ email: data.email });
    if (user) {
      if (user.password == data.password) {
        let uid = user["_id"];
        let token = jwt.sign({ payload: uid }, JWT_KEY);
        res.cookie("login", token, { httpOnly: true });
        return res.json({
          message: "User has Logged in",
          userDetails: user,
        });
      } else {
        return res.json({
          message: "wrong credetials",
        });
      }
    } else {
      return res.json({
        message: "User not found",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
}

module.exports = authRouter;

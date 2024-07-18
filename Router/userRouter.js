const express=require('express');
const userRouter = express.Router();
const{signup,login,isAuthorised,protectRoute,resetpassword,forgetpassword,logout}=require('../controller/authController');
const{updateUser,deleteUser,getUser,getAllUsers}=require('../controller/userController');

userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login);

userRouter
.route('/forgetpassword')
.post(forgetpassword);

userRouter
.route('/restepassword/:token')
.post(resetpassword);

userRouter
.route('/logout')
.get(logout);

userRouter.use(protectRoute);

userRouter
.route('/userProfile')
.get(getUser)

userRouter.use(isAuthorised(['admin']));

userRouter
.route('')
.get(getAllUsers);

module.exports = userRouter;
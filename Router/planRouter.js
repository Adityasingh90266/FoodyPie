const express = require('express');
const planRouter = express.Router();
const{protectRoute, isAuthorised}=require('../controller/authController')
const {getPlan,getAllPlans,createPlan,updatePlan,deletePlan, top3Plans}=require('../controller/planController')

planRouter
.route('/allPlans')
.get(getAllPlans)

planRouter.use(protectRoute);

planRouter
.route('/plan/:id')
.get(getPlan)

// planRouter.use(isAuthorised['admin','restaurantowner']);


planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.post(createPlan)
.delete(deletePlan)

planRouter
.route('/top3')
.get(top3Plans);

module.exports = planRouter;

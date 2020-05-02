//var express= require('express');
//var router = express.Router();

// retrieving data from database
module.exports = app => {
  
const customers = require("../controller/customer.controller.js");
const menu= require("../controller/menu.controller.js");
const order= require("../controller/order.controller.js");

  // Create a new Customer (Sign Up)
  app.post("/signup", customers.create);

  // Login using email and password(Sign In)
  app.post("/login", customers.validateLogin);

  //Default setting: Retrieve all Indian Menu after logging in with email and password(Sign In)
  app.get("/getMenu", menu.getAll);

  //Retrieve customer's most favored menu - Suggestions Tab
  app.get("/getSuggestions", menu.findFavorite);

  //Place order
  app.post("/order", order.saveTransaction);
  
};

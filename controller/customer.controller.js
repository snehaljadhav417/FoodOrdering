const Customer = require("../model/customer.model.js");

// Create and Save a new Customer
 exports.create = (req, res) => {
     if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
      
    });
  }
  const customer = new Customer({
    email_id: req.body.email,
    password: req.body.password,
    //active: req.body.active
  });

  // Save Customer in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};      

// Check if valid customer or not
exports.validateLogin = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
      
    });
  }
  const customer = new Customer({
    email_id: req.body.email,
    password: req.body.password,
    //active: req.body.active
  });
  Customer.validateLogin(customer, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer"
          });
        }
      } else res.send(data);
    }); 
}; 






/*







/*
// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.customerId
            });
          }
        } else res.send(data);
      }); 
}; */

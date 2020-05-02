const Menu = require("../model/menu.model.js");

// Display all menu with default menu: Indian
exports.getAll = (req, res) => {
  Menu.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving menu."
        });
      else res.send(data);
    });
};

exports.findFavorite = (req, res) => {
  Menu.findFavorite(req.query.cust_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer details with id ${req.query.cust_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Menu of type " + req.query.cust_id
          });
        }
      } else res.send(data);
    }); 
}; 




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


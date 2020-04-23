
const Order = require("../model/order.model.js");

// Save transaction details
 exports.saveTransaction = (req, res) => {
     if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!"
      
    });
  }
  const order  = new Order({
    customer_id: req.body.cust_id,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    phone_no: req.body.phoneNumber,
    address: req.body.address,
    // ***To be inserted into orders table */
    // menu_id: req.body.menu_id,
    cart: req.body.cart,
    total: req.body.totalPrice,
    //**To be inserted into payment table */
    card: req.body.card
  });

  // Save Order and transaction details
  Order.saveTransaction(order, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
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

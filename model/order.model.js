const sql = require("./db.js");

// constructor

const Order= function(order) {
  this.customer_id= order.customer_id;
  this.first_name= order.first_name;
  this.last_name= order.last_name;
  this.phone_no= order.phone_no;
  this.state= order.state;
  this.city= order.city;
  this.pincode= order.pincode;
  this.address= order.address;
  //**Orders table */
  this.cart = order.cart;
  this.total= order.total;
  //**Payment table */
  this.card = order.card
  };

Order.saveTransaction = (order, result) => {
  //Insertion into customer table
  sql.query(
    `INSERT IGNORE INTO customer SET customer_id = ?, first_name = ?, last_name = ?,
phone_no = ?, state = ?, city = ?, pincode = ?, address_first_line = ?, Email_id = ?`,
    [order.customer_id, order.first_name, order.last_name, order.phone_no,
      order.address.state, order.address.city, order.address.zip, order.address.street, order.email],(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
     console.log("created customer details: ", { id: res.insertId, ...order });
  });

  //Insertion into Order table for each item in cart array
  sql.query(
      "INSERT INTO orders SET customer_id = ?, total = ?, state = ?, city = ?, pincode = ?, address_first_line = ?",
      [order.customer_id, order.total, order.address.state, order.address.city,
          order.address.zip, order.address.street], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        let orderInsertID = res.insertId;
        console.log("created order details: ", {id: orderInsertID, ...order});
        console.log(res);
        //result(null, { id: res.insertId, ...order });


        //Insertion into payments table
        sql.query(`INSERT INTO payment SET customer_id = ?, card_number = ?,
card_holder_name = ?, order_id = ${orderInsertID}, exp_year = ?, exp_month = ?, cvv = ? `,
            [order.customer_id, order.card.cardNumber, order.card.cardName,
              order.card.expYear, order.card.expMonth, order.card.cvv],(err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
              console.log("created Payment details: ", { id: res.insertId, ...order });
              // result(null, { id: res.insertId, ...order });
            });

        // Insert into order details for each item in cart
        for (const item of order.cart) {
          sql.query(`INSERT INTO order_details SET menu_id = ?, order_id = ${orderInsertID}, quantity = ?,
dish_name = (select name from menu where menu.id = ?) `,
              [item.productId, item.quantity, item.productId],(err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }
                console.log("created order details: ", { id: res.insertId, ...order });
                // result(null, { id: res.insertId, ...order });
              });
        }
        result(null, {id: res.insertId, ...order});
      });

};

module.exports = Order;

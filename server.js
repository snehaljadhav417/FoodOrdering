//importing modules
var express= require('express');
var bodyparser= require('body-parser');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var USERS_COLLECTION = "users";
var MENU_COLLECTION = "menu";
var ORDERS_COLLECTION = "orders";
var PAYMENT_COLLECTION = "payment";
var ORDER_DETAILS_COLLECTION = "order_details";
var CUSTOMER_COLLECTION = "customer";

const app=express();

//adding middleware
app.use(bodyparser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", { useUnifiedTopology: true }, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.post("/signup", function(req, res) {
  var newUser = req.body;

  if (!req.body.email || !req.body.password) {
    handleError(res, "Invalid user input", "Must provide a email and password", 400);
  } else {
    db.collection(USERS_COLLECTION).insertOne(newUser, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new user.");
      } else {
        const returnData = {
          id: -1, ...doc.ops[0]
        };
        res.status(201).json(returnData);
      }
    });
  }
});

app.post("/order", function(req, res) {
  if (!req.body) {
    handleError(res, "Invalid user input", "Must provide all fields", 400);
  } else {
    const cust_data  = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      phone_no: req.body.phoneNumber,
      state: req.body.address.state,
      city: req.body.address.city,
      pincode: req.body.address.zip,
      address_first_line: req.body.address.street,
      Email_id: req.body.email
    };
    const order_data = {
      customer_id: new ObjectID(req.body.cust_id),
      total: req.body.totalPrice,
      address_first_line: req.body.address.street,
      state: req.body.address.state,
      city: req.body.address.city,
      pincode: req.body.address.zip
    };
    db.collection(CUSTOMER_COLLECTION).insertOne(cust_data, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to insert into customers.");
      }
    });
    db.collection(ORDERS_COLLECTION).insertOne(order_data, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to insert into orders.");
      } else if (!doc) {
        handleError(res, err.message, "Failed to insert into orders.");
      }
      const orderInsertID = doc.ops[0]['_id'];
      const payment_data = {
        customer_id: new ObjectID(req.body.cust_id),
        order_id: new ObjectID(orderInsertID),
        card_number: req.body.card.cardNumber,
        card_holder_name: req.body.card.cardName,
        exp_year: req.body.card.expYear,
        cvv: req.body.card.cvv,
        exp_month: req.body.card.expMonth
      };
      db.collection(PAYMENT_COLLECTION).insertOne(payment_data, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to insert into payment.");
        }
      });

      for (const item of req.body.cart) {
        db.collection(MENU_COLLECTION).findOne(
          {_id: new ObjectID(item.productId)}, function (err, doc) {
          if (err) {
            handleError(res, err.message, "Failed to find dishname for product id +",
              item.productId);
          } else if (!doc) {
            handleError(res, "no dish name found", "Failed to find dishname for product id +",
              item.productId);
          }

          const dish_name = doc['name'];

          const order_details_data = {
            order_id: new ObjectID(orderInsertID),
            menu_id: new ObjectID(item.productId),
            quantity: item.quantity,
            dish_name
          };

          db.collection(ORDER_DETAILS_COLLECTION).insertOne(order_details_data, function(err, doc) {
            if (err) {
              handleError(res, err.message, "Failed to insert into order details.");
            }
          });
        });
      }

      res.status(200).json({"msg": "order successfully placed"});
    });
  }
});

app.post("/login", function(req, res) {
  const existingUser = req.body;
  if (!req.body.email || !req.body.password) {
    handleError(res, "Invalid user input", "Must provide a email and password", 400);
  } else {
    db.collection(USERS_COLLECTION).findOne(existingUser, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get user.");
      } else if (!doc) {
        handleError(res, "LOGIN: No match found.",
          "No match found.", 400)
      }
      else {
        const returnData = {
          id: doc['_id']
        };
        res.status(200).json(returnData);
      }
    });
  }
});

app.get("/getMenu", function(req, res) {
  db.collection(MENU_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get menu.");
    } else {
      const resultData = {};
      resultData['indian'] = docs.filter(element => element.dish_type === 'Indian');
      resultData['italian'] = docs.filter(element => element.dish_type === 'Italian');
      resultData['american'] = docs.filter(element => element.dish_type === 'American');
      resultData['mexican'] = docs.filter(element => element.dish_type === 'Mexican');
      res.status(200).json(resultData);
    }
  });
});

app.get("/getSuggestions", function(req, res) {
  if (!req.query.cust_id) {
    handleError(res, "Invalid customer id", "Must provide a customer id", 400);
  } else {
    db.collection(ORDERS_COLLECTION).find({customer_id: new ObjectID(req.query.cust_id)}).
    toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get order id for given customer id.");
      } else {
        let orderIds = docs.map(item => item._id);

        db.collection(ORDER_DETAILS_COLLECTION).aggregate([
          { $match: { order_id: { $in: orderIds} } },
          {
            $group: {
              _id: "$menu_id",
              frequency: { $sum: "$quantity" }
            }
          },
          { $sort: { frequency: -1}},
          { $limit: 9}
        ]).toArray(function (err, docs) {
          if (err) {
            handleError(res, err.message, "Failed to get order details for given order ids.");
          }

          let menuIds = docs.map(item => item._id);
          db.collection(MENU_COLLECTION).aggregate([
            { $match: { _id: { $in: menuIds} } }
          ]).toArray(function (err, docs) {
            if (err) {
              handleError(res, err.message, "Failed to retrieve suggestions.");
            } else {
              res.status(200).json({items: docs});
            }
          });
        });
      }
    });
  }
});

app.all('*', function (req, res) {
  res.sendFile('index.html', { root: distDir });
});





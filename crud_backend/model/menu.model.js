const sql = require("./db.js");

// constructor
const Menu = function(menu) {
  this.customer_id = menu.customer_id;
};


Menu.getAll = result => {
  sql.query(`SELECT * FROM menu`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("menu: ", res);
    const resultData = {};
    resultData['indian'] = res.filter(element => element.dish_type === 'Indian');
    resultData['italian'] = res.filter(element => element.dish_type === 'Italian');
    resultData['american'] = res.filter(element => element.dish_type === 'American');
    resultData['mexican'] = res.filter(element => element.dish_type === 'Mexican');
    result(null, resultData);
  });
};

Menu.findFavorite = (customer_id, result) => {
  console.log(customer_id);
  sql.query(`create or replace view v1 as select order_id from orders where customer_id=${customer_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("menu: ", res);

    sql.query(`create or replace view v2 as select menu_id, sum(quantity) as frequency 
from order_details where order_id in (select * from v1) group by menu_id order by frequency DESC`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("menu: ", res);

      sql.query(`select * from menu as v3 inner join (select menu_id from v2 limit 9) as v4 on v3.id = v4.menu_id`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("menu: ", res);


        result(null, {items: res});
      });
     // result(null, {items: res});
    });

  //  result(null, {items: res});
  });
};

/*
Customer.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
}; */


module.exports = Menu;

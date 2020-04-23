//importing modules
 var express= require('express');
 var bodyparser= require('body-parser');
 var cors= require('cors');

const app=express();
const port= 3000;
//const route= require('./route/routes');

//adding middleware
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));
//app.use('/cust', route);
//app.use(express.static('public'));
require("./route/routes.js")(app);

app.get('/',(req,res)=>{
    res.send('Hi');
});

app.listen(port,()=>{
  console.log('Server has been started at'+ port);
  });




    
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require("./router");
const morgan = require('morgan');

const port2 = process.env.PORT || 3003;
const app2 = express();

app2.use(cors());
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded( {extended : true}));
app2.use(morgan('tiny'));

app2.use('/api/reviews/', router);



app2.listen(port2, () => {
  console.log(`listening on port ${port2}`);
});

module.exports = app2;


/*
  CRUD API ROUTES
  Create
  -Create new restauturant
    -app2.post(/api/restaurants/?name=name)
  -create new user
    -app2.post(/api/user/?user=name)
  -create new review
    -app2.post(/api/restaurants/:restaurant_id/reviews/?review=review)
   Read
   -all reviews from 1 restaurant
    -app2.get('/api/restaurants/:restaurant_id/reviews)
  -all reviews from 1 user
    -app2.get('/api/user/:user_id)
  -one review 
    -app2.get(/api/restaurants/:restaurant_id/reviews/:id)
  Update
  -1 review
    -app2.put(/api/restaurants/:restaurant_id/reviews/:id/?review=review)
  -User name
    -app2.put(/api/user/:user_id/?username=name)
  -Restaurant name
    -app2.put(/api/restaurants/:restaurant_id/?restaurant_name=restaurant_name)
  
  Delete
  -1 review 
    -app2.delete(/api/restaurants/:restaurant_id/reviews/:id/)
  -Restaurant
    -app2.delete(/api/restaurants/:restaurant_id)
  -User
    -app2.delete(/api/user/:user_id)
*/
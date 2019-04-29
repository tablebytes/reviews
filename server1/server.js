const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const path = require('path');
const router = require("./router");
const morgan = require('morgan');

const port1 = process.env.PORT || 3002;
const app1 = express();

// app1.use('/restaurants/:restaurant_id', express.static(path.join(__dirname, '/../client/dist')));

app1.use(cors());
app1.use(bodyParser.json());
app1.use(bodyParser.urlencoded( {extended : true}));
app1.use(morgan('tiny'));


app1.use('/api/reviews/', router);

app1.listen(port1, () => {
  console.log(`listening on port ${port1}`);
});

module.exports = app1;


/*
  CRUD API ROUTES
  Create
  -Create new restauturant
    -app1.post(/api/restaurants/?name=name)
  -create new user
    -app1.post(/api/user/?user=name)
  -create new review
    -app1.post(/api/restaurants/:restaurant_id/reviews/?review=review)
   Read
   -all reviews from 1 restaurant
    -app1.get('/api/restaurants/:restaurant_id/reviews)
  -all reviews from 1 user
    -app1.get('/api/user/:user_id)
  -one review 
    -app1.get(/api/restaurants/:restaurant_id/reviews/:id)
  Update
  -1 review
    -app1.put(/api/restaurants/:restaurant_id/reviews/:id/?review=review)
  -User name
    -app1.put(/api/user/:user_id/?username=name)
  -Restaurant name
    -app1.put(/api/restaurants/:restaurant_id/?restaurant_name=restaurant_name)
  
  Delete
  -1 review 
    -app1.delete(/api/restaurants/:restaurant_id/reviews/:id/)
  -Restaurant
    -app1.delete(/api/restaurants/:restaurant_id)
  -User
    -app1.delete(/api/user/:user_id)
*/
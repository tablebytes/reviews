const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const router = require("./router");

const db = require('../database/index');

db.sql.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection error: ' + err));

const port = 3001;
const app = express();

app.use('/restaurants/:restaurant_id', express.static(path.join(__dirname, '/../client/dist')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended : true}));
app.use(morgan('tiny'));


app.use('/api/', router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;


/*

  CRUD API ROUTES

  Create
  -Create new restauturant
    -app.post(/api/restaurants/?name=name)
  -create new user
    -app.post(/api/user/?user=name)
  -create new review
    -app.post(/api/restaurants/:restaurant_id/reviews/?review=review)

   Read
   -all reviews from 1 restaurant
    -app.get('/api/restaurants/:restaurant_id/reviews)
  -all reviews from 1 user
    -app.get('/api/user/:user_id)
  -one review 
    -app.get(/api/restaurants/:restaurant_id/reviews/:id)

  Update
  -1 review
    -app.put(/api/restaurants/:restaurant_id/reviews/:id/?review=review)
  -User name
    -app.put(/api/user/:user_id/?username=name)
  -Restaurant name
    -app.put(/api/restaurants/:restaurant_id/?restaurant_name=restaurant_name)
  
  Delete
  -1 review 
    -app.delete(/api/restaurants/:restaurant_id/reviews/:id/)
  -Restaurant
    -app.delete(/api/restaurants/:restaurant_id)
  -User
    -app.delete(/api/user/:user_id)
*/
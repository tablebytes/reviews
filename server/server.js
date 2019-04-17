const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const Models = require('../database/Models');

const db = require('../database/index');

db.sql.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection error: ' + err));

const port = 3001;
const app = express();

app.use('/restaurants/:restaurant_id', express.static(path.join(__dirname, '/../client/dist')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan('tiny'));

app.get('/api/restaurants/:restaurant_id/reviews', (req, res) => {
  const { restaurant_id } = req.params;
  Models.Review.findAll({ where: { restaurant_id: restaurant_id }, include: [Models.User] })
    .then((data) => {
      res.send(data);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

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
    -app.post(/api/restaurants/:id/reviews/?review=review)

   Read
   -all reviews from 1 restaurant
    -app.get('/api/restaurants/:id/reviews)
  -all reviews from 1 user
    -app.get('/api/user/:id)
  -one review 
    -app.get(/api/restaurants/:restaurant_id/reviews/::id)

*/
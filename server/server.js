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

app.use('/restaurants/:id', express.static(path.join(__dirname, '/../client/dist')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan('tiny'));

app.get('/api/restaurants/:id/reviews', (req, res) => {
  const { id } = req.params;
  Models.Review.findAll({ where: { restaurant_id: id }, include: [Models.User] })
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

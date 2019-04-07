const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql');
const path = require('path');

const db = require('../database/index');

db.sql.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection error: ' + err));

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(morgan('tiny'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist'));
});
app.use('/api/restaurants', require('./routes'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;

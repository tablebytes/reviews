const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql');
const path = require('path');

// Connect to database
const db = require('../database/index');

// Test db connection
db.sql.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Database connection error: ' + err));

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(morgan('tiny'));

// const sql = 'INSERT INTO Test (v1, v2, v3) VALUES ?';
// const values = [[]]; // bring in seeded data here
// connection.query(sql, [values], (err) => {
//   if (err) throw err;
//   connection.end();
// });

// Gig routes
app.use('/api/restaurants', require('./routes'));

app.get('/api/users', (req, res) => {
  db.getUsers()
    .then(user => res.send(user));
});

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;

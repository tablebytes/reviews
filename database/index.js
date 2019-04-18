const mysql = require('mysql');
const Sequelize = require('sequelize');
const Promise = require('promise');
// Create database with mysql

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: `root`,
  password: ``,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

// Connect to the database by creating a Sequelize instance
let sql = new Sequelize('', 'root', '', {
  dialect: 'mysql',
});

sql.query('CREATE DATABASE IF NOT EXISTS`opentable_reviews`;').then(() => {});

sql = new Sequelize('opentable_reviews', 'root', '', {
  dialect: 'mysql',
});

const User = sql.define('User', {
  username: {
    type: Sequelize.STRING,
  },
  review_count: {
    type: Sequelize.INTEGER,
  },
  location: {
    type: Sequelize.STRING,
  },
  VIP: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports.connection = connection;
module.exports.sql = sql;
module.exports.User = User;

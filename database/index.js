// const mysql = require('mysql');
const mysql = require('mysql');
const Sequelize = require('sequelize');
const Promise = require('promise');

// Create database with mysql
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to mysql database: '.concat(err.message));
  }
  console.log('Connected to the MySQL server.');
});

// Connect to the database by creating a Sequelize instance
let db = new Sequelize('', 'root', '', {
  dialect: 'mysql',
});

db.query('CREATE DATABASE IF NOT EXISTS`opentable_reviews`;').then(() => {
});

db = new Sequelize('opentable_reviews', 'root', '', {
  dialect: 'mysql',
});

const Restaurant = db.define('Restaurant', {
  restaurant_name: {
    type: Sequelize.STRING,
  },
});

const User = db.define('User', {
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

const Review = db.define('Review', {
  overall_score: {
    type: Sequelize.INTEGER,
  },
  food_score: {
    type: Sequelize.INTEGER,
    isIn: [[1, 2, 3, 4, 5]],
  },
  service_score: {
    type: Sequelize.INTEGER,
    isIn: [[1, 2, 3, 4, 5]],
  },
  ambience_score: {
    type: Sequelize.INTEGER,
    isIn: [[1, 2, 3, 4, 5]],
  },
  review: {
    type: Sequelize.STRING(1234),
  },
  user_recommended: {
    type: Sequelize.BOOLEAN,
  },
});

User.hasMany(Review);
Review.belongsTo(Restaurant);
Restaurant.hasMany(Review);
Review.belongsTo(User);

db.sync();

// query w promises
// Restaurant.findOne().then(restaurant => {
//   console.log(restaurant.get('restaurant_name'));
// });

module.exports.connection = connection;
module.exports.db = db;
module.exports.Restaurant = Restaurant;
module.exports.User = User;
module.exports.Review = Review;

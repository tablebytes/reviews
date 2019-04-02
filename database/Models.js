const Sequelize = require('sequelize');
const db = require('../database/index');

const Restaurant = db.sql.define('Restaurant', {
  restaurant_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

const User = db.sql.define('User', {
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
}, {
  timestamps: false,
});

const Review = db.sql.define('Review', {
  restaurant_id: {
    type: Sequelize.INTEGER,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
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
  value_score: {
    type: Sequelize.INTEGER,
    isIn: [[1, 2, 3, 4, 5]],
  },
  date_dined: {
    type: Sequelize.DATE,
  },
  review: {
    type: Sequelize.STRING(1234),
  },
  user_recommended: {
    type: Sequelize.BOOLEAN,
  },
}, {
  timestamps: false,
});

// User.hasMany(Review);
// Review.belongsTo(Restaurant);
// Restaurant.hasMany(Review);
// Review.belongsTo(User);

db.sql.sync();

const getUsers = () => User.findAll({});

module.exports.Restaurant = Restaurant;
module.exports.User = User;
module.exports.Review = Review;
module.exports.getUsers = getUsers;

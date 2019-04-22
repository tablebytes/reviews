// const mysql = require('mysql');
const faker = require('faker');
// const Reviews = require('./Reviews');
// const database = require('./index.js');
// const Models = require('./Models');

// const seedRestaurants = function seedRestaurants() {
//   for (let i = 0; i < 100; i += 1) {
//     const restaurant_name = faker.lorem.word();
//     Models.Restaurant.create({ restaurant_name })
//       .then(() => {
//       });
//   }
// };

const seedUsernames = function seedUsernames() {
  const users = [];
  for (let i = 0; i < 1000000; i += 1) {
    const username = faker.name.firstName();
    const review_count = faker.random.number({
      min: 10,
      max: 40,
    });
    const location = 'San Francisco';
    // const location = faker.address.city().concat(', ', faker.address.stateAbbr());
    const vip = faker.random.boolean();
    // Models.User.create({
    //   username, review_count, location, VIP: vip,
    // })
    //   .then(() => {
    //   });
    users.push({
      username, review_count, location, VIP: vip,
    });
  }
  return users;
  console.timeEnd('seedUsernames');
};

const seedReviews = function seedReviews() {
  const users = seedUsernames();
  for (let i = 0; i < 300; i += 1) {
    const restaurant_id = faker.random.number({
      min: 1,
      max: 100,
    });
    const user_id = faker.random.number({
      min: 1,
      max: 100,
    });
    const overall_score = faker.random.number({
      min: 1,
      max: 5,
    });
    const food_score = faker.random.number({
      min: 1,
      max: 5,
    });
    const service_score = faker.random.number({
      min: 1,
      max: 5,
    });
    const ambience_score = faker.random.number({
      min: 1,
      max: 5,
    });
    const value_score = faker.random.number({
      min: 1,
      max: 5,
    });

    const date_dined = faker.date.between('2015-01-01', '2019-03-31');
    const review = faker.lorem.sentence();
    const user_recommended = faker.random.boolean();
    const userIndex = Math.floor(Math.random() * users.length);
    const user = users[userIndex];
  //   Models.Review.create({
  //     restaurant_id,
  //     user_id,
  //     overall_score,
  //     food_score,
  //     service_score,
  //     ambience_score,
  //     value_score,
  //     date_dined,
  //     review,
  //     user_recommended,
  //   })
  //     .then(() => {
  //     });
  }
};
console.time('seedUsernames');
// database.sql.sync({ force: true }).then(function() {
//   // seedRestaurants();
//   seedUsernames();
//   // seedReviews();
// });

// database.connection.end();

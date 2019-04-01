const mysql = require('mysql');
const faker = require('faker');
const Reviews = require('./Reviews');
const database = require('./index.js');

for (let i = 0; i < 5; i += 1) {
  const restaurantName = faker.lorem.word();
  database.Restaurant.create({ restaurant_name: restaurantName })
    .then(() => {
      console.log('row added to restaurant table');
    });
}

for (let i = 0; i < 5; i += 1) {
  const username = faker.internet.userName();
  const review_count = faker.random.number({
    min: 10,
    max: 40,
  });
  const location = faker.address.city().concat(', ', faker.address.stateAbbr());
  const vip = faker.random.boolean();
  database.User.create({ username: username, review_count: review_count, location: location, VIP: vip })
    .then(() => {
      console.log('row added to user table');
    });
}

for (let i = 0; i < 5; i += 1) {
  const username = faker.internet.userName();
  const review_count = faker.random.number({
    min: 10,
    max: 40,
  });
  const location = faker.address.city().concat(', ', faker.address.stateAbbr());
  const vip = faker.random.boolean();
  database.User.create({ username: username, review_count: review_count, location: location, VIP: vip })
    .then(() => {
      console.log('row added to user table');
    });
}

database.connection.end();

// const insertSampleBlogs = function() {
//   Blog.create(samplePosts)
//     .then(() => db.disconnect());
// };

// insertSampleBlogs();

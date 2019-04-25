// const mysql = require('mysql');
const faker = require('faker');
const Promise = require("bluebird");
const fs = require("fs");
const zlib = require("zlib");
const readline = require("linebyline");
Promise.promisifyAll(fs);
// const Reviews = require('./Reviews');
const database = require('./index.js');
const Models = require('./Models');



const createUsernames = async function createUsernames(seedCount, rowCount, database) {
  for (let i = 0; i < seedCount; i += 1) {
    var rows=[];
    for(var q=0; q < rowCount; q++){
      const username = faker.name.firstName();
      const review_count = faker.random.number({
        min: 10,
        max: 40,
      });
      const location = 'San Francisco';
      const vip = faker.random.boolean();
      rows.push({username, review_count, location, VIP: vip})
    }
    await new Promise( (res, rej) => {
      async function endbulkLoad() {
        await database.bulkCreate(rows)
        .then(() => {
          res();
        });
      }
      endbulkLoad();
    })
  }
};
const createRestaurants = async function createRestaurants(seedCount, rowCount, database) {
  for(var i =0; i < seedCount ; i++){
    var rows=[];
    for(var q=0; q< rowCount ; q++){
      const restaurant_name = faker.lorem.word();
      rows.push({restaurant_name});
    }
    await new Promise( (res, rej) => {
      async function endbulkLoad() {
        await database.bulkCreate(rows)
        .then(() => {
          res();
        });
      }
      endbulkLoad();
    })
  }
};
const createReviews = async function createReviews(seedCount, rowCount, database, max) {
  for(let q= 0; q< seedCount; q++){
    var rows=[];
    for (let i = 0; i < rowCount; i += 1) {
      const restaurant_id = faker.random.number({
        min: 1,
        max: max,
      });
      const user_id = faker.random.number({
        min: 1,
        max: max,
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
      rows.push({restaurant_id,user_id,overall_score,food_score,service_score,ambience_score,value_score,date_dined,review,user_recommended});
    }
    if(rows[0].restaurant_id > 1000000){
      console.log("True");
    }
    await new Promise( (res, rej) => {
      async function endbulkLoad() {
        await database.bulkCreate(rows)
        .then(() => {
          res();
        });
      }
      endbulkLoad();
    })
  }
};

Promise.promisify(createUsernames);
database.postgres.sync({force: true}).then(async function() {
  var seedCount =100;
  var rowCount=10000;
  async function userLoop() {
    var database= Models.User;
    count=[0,1,2,3,4,5,6,7,8,9]

    console.log("Hello");
    for(const item of count){
      await createUsernames(seedCount, rowCount, database);
      console.log(item);
    }
  };
  await userLoop();
  async function restaurantLoop() {
    var database= Models.Restaurant;
    count=[0,1,2,3,4,5,6,7,8,9]

    console.log("Starting Restaurant Seed");
    for(const item of count){
      await createRestaurants(seedCount, rowCount, database);
      console.log(item);
    }
  };
  await restaurantLoop();
  async function reviewLoop() {
    max=(seedCount*rowCount*10)-1;//make index of restaurant_id
    seedCount=seedCount*5;
    var database= Models.Review;
    
    count=[0,1,2,3,4,5,6,7,8,9]
    console.log("Starting Review Seed");
    for(const item of count){
      await createReviews(seedCount, rowCount, database, max);
      console.log(item);
    }
  };
  await reviewLoop();

});


/*********************
 * Pre Seed
 * -Turn off associations between tables in Models.js
 * 
 * POST SEED Organization 
 * 
 *  ALTER TABLE "Reviews" ADD CONSTRAINT restaurant_key FOREIGN KEY (restaurant_id) REFERENCES "Restaurants" (id) MATCH FULL ON DELETE CASCADE;
 * ALTER TABLE "Reviews" ADD CONSTRAINT user_key FOREIGN KEY (user_id) REFERENCES "Users" (id)  MATCH FULL ON DELETE CASCADE;
 * CREATE INDEX idx_user ON "Reviews"(user_id);
 * CREATE INDEX idx_rest ON "Reviews"(restaurant_id);
 * 
 * 
 */
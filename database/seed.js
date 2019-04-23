const faker = require('faker');
const moment = require("moment");
const Promise = require("bluebird");
const expressCassandra = require("express-cassandra");
// const zlib = require('zlib');
const createCSVWriter = require("csv-writer").createObjectCsvWriter;
const db = require('./index.js');
// const fs = require("fs");
const csvWriter = createCSVWriter({
  path: "./reviewData.csv",
  header: [
    {id: 'restaurant_id', title: "Restaurant_id"},
    {id: 'user_id', title: "User_id"},
    {id: 'ambience_score', title: "Ambience_score"},
    {id: 'date_dined', title: "Date_dined"},
    {id: 'food_score', title: "Food_score"},
    {id: 'overall_score', title: "Overall_score"},
    {id: 'restaurant_name', title: "Restaurant_name"},
    {id: 'review', title: "Review"},
    {id: 'review_id', title: "Review_id"},
    {id: 'service_score', title: "Service_score"},
    {id: 'user_location', title: "User_location"},
    {id: 'user_name', title: "User_name"},
    {id: 'user_recommended', title: "User_recommended"},
    {id: 'user_review_count', title: "User_review_count"},
    {id: 'user_vip', title: "User_vip"},
    {id: 'value_score', title: "Value_score"}
  ]
})


// const seedRestaurants = function seedRestaurants() {
//   for (let i = 0; i < 100; i += 1) {
//     const restaurant_name = faker.lorem.word();
//     Models.Restaurant.create({ restaurant_name })
//       .then(() => {
//       });
//   }
// };

const seedUsernames = function seedUsernames(millions) {
  const users = [];
  //makes a batch of 10000 millions users
  for (let i = 0; i < 1000000; i += 1) {
    const user_id = i + millions;
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
      user_id: user_id,
      username: username,
      review_count: review_count,
      location: location,
      vip: vip
    });
  }
  return users;
};

const seedReviews = async function seedReviews(restaCount, rowCount, millions) {
  var max = restaCount * rowCount;
  const users = seedUsernames(millions);
  var restaurant_id = millions;
  //Every 1 million new batch of users
  for(var res=0 ; res <= restaCount; res++){
    var rows=[];
    //size of each row pushed into databbase with bulk laod
    for(var q = 1 ; q <= rowCount; q++){
      //review count
      var reviewCount=Math.floor(Math.random()*6)+1;
      var restaurant_name =faker.lorem.word();
      for(var i=0;i<reviewCount;i++){
        var user = users[Math.floor(Math.random() * users.length)];
        review = {
          review_id : expressCassandra.timeuuid(),
          restaurant_id  : `${restaurant_id}`,
          restaurant_name : restaurant_name,
          overall_score : faker.random.number({
            min: 1,
            max: 5,
          }),
          food_score : faker.random.number({
            min: 1,
            max: 5,
          }),
          service_score : faker.random.number({
            min: 1,
            max: 5,
          }),
          ambience_score : faker.random.number({
            min: 1,
            max: 5,
          }),
          value_score : faker.random.number({
            min: 1,
            max: 5,
          }),
          date_dined : moment().format("YYYY-MM-DD"),
          review : faker.lorem.sentence(),
          user_recommended : faker.random.boolean(),
          user_id : user.user_id,
          user_name : user.username,
          user_review_count : user.review_count,
          user_location : user.location,
          user_vip : user.vip
        }
        rows.push(review);
      }
      restaurant_id++;
    }
    await new Promise( (res, rej) => {
      csvWriter.writeRecords(rows)
      .then(()=>{
        res();
      })
      .catch((err)=>{
        console.log("Err", err);
      })
    })
  }
};
db.reviewModel.syncDB( (err,schemaChange)=>{
  if(err){
    throw(err);
  } else {
    console.log("Schema created = ", schemaChange)
    const seedCassandra = async function(){
      const restaCount=1000;
      const rowCount=1000;
      async function seedLoop(){
        //Millions of entries
        count=[0,1,2,3,4,5,6,7,8,9];
        for(const milCounter of count){
          const millions=milCounter*1000000;
          await seedReviews(restaCount, rowCount, millions);
          console.log("Mil Count",milCounter);
          if(milCounter === 9){
            db.model.close((err)=>{
              if(err){
                throw err;
              }
            })
          }
        }
      }
      seedLoop();
    }
    seedCassandra();
  }
})



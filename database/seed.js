const faker = require('faker');
const moment = require("moment");
const Promise = require("bluebird");
const db = require('./index.js');

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

const seedReviews = async function seedReviews(restaCount, rowCount, millions, callback) {
  var max = restaCount * rowCount;
  const users = seedUsernames(millions);
  var restaurant_id = millions;
  //Every 1 million new batch of users
  for(var res=0 ; res <= restaCount; res++){
    var queryBatch=[];
    //size of each row pushed into databbase with bulk laod
    for(var q = 1 ; q <= rowCount; q++){
      //review count
      console.log(restaurant_id);
      var reviewCount=Math.floor(Math.random()*6)+1;
      for(var i=0;i<reviewCount;i++){
        var user = users[Math.floor(Math.random() * users.length)];
        review = {
          restaurant_id  : restaurant_id,
          restaurant_name : faker.lorem.word(),
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
        let reviewRecord = new db.model.instance.review(review);
        let reviewInsert = reviewRecord.save({return_query : true});
        queryBatch.push(reviewInsert);
      }
      restaurant_id++;
      await new Promise((res,rej)=>{
        async function loadCass (){
          await db.model.doBatch(queryBatch,(err, success)=>{
            if(err){
              throw err;
            } else {
              console.log("Saved")
              res();
            }
          })
        }
        loadCass();
      })
    }
  }
    
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
          const millions=milCounter*1000000
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



// database.connection.end();

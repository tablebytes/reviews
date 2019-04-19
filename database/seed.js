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

const seedRestaurants = function seedRestaurants() {
  for (let i = 0; i < 100; i += 1) {
    const restaurant_name = faker.lorem.word();
    Models.Restaurant.create({ restaurant_name })
      .then(() => {
      });
  }
};

const createUsernames = async function createUsernames() {
  var seedCount= 5000;
  for (let i = 0; i <= seedCount; i += 1) {
    var rows=[];
    for(var q=0; q< 250; q++){
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
      
      zlib.gzip(JSON.stringify(rows)+'\n', (err, gzip)=>{
        if(err){
          console.log(err);
        } else {
            fs.appendFile("./sampleData.gz",gzip, (err, data)=>{
              if(err){
                console.log(err)
              } else {
                res(data);
              }
            })
        }
      })
    })
  }
};

const seedUsers = function seedUsers(){ 
  var readStream= fs.createReadStream("./sampleData.gz");
  var gunzip=zlib.createGunzip();
  var lineRaw='';
  var lines=[];
  readStream.pipe(gunzip).on("data",(chuck)=>{
    lineRaw=lineRaw+chuck.toString();
    // lines=lines.concat(chuck.toString().split("\n"));
    // console.log(lines[lines.length-1]);
    // line=lines[lines.length]
  })
  .on('drain', ()=>{
    lines= lineRaw.split("\n");
    lineRaw=lines[lines.length-1];
    lines.pop();
    async function bulkLoad() {
      for(const line in lines){
        await Models.User.bulkCreate(JSON.parse(lines[line]))
        .then(() => {
          console.log("Saved")
        });
      }
    }
    bulkLoad();
  })
  .on("end",()=>{
    console.log("End");
  })
}




const seedReviews = function seedReviews() {
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
    Models.Review.create({
      restaurant_id,
      user_id,
      overall_score,
      food_score,
      service_score,
      ambience_score,
      value_score,
      date_dined,
      review,
      user_recommended,
    })
      .then(() => {
      });
  }
};

const seedReviewsHigher = function seedReviewsHigher() {
  for (let i = 0; i < 1000; i += 1) {
    const restaurant_id = faker.random.number({
      min: 1,
      max: 100,
    });
    const user_id = faker.random.number({
      min: 101,
      max: 400,
    });
    const overall_score = faker.random.number({
      min: 3,
      max: 5,
    });
    const food_score = faker.random.number({
      min: 3,
      max: 5,
    });
    const service_score = faker.random.number({
      min: 3,
      max: 5,
    });
    const ambience_score = faker.random.number({
      min: 3,
      max: 5,
    });
    const value_score = faker.random.number({
      min: 3,
      max: 5,
    });
    const date_dined = faker.date.between('2015-01-01', '2019-03-31');
    const review = faker.lorem.sentences();
    const user_recommended = faker.random.boolean();
    Models.Review.create({
      restaurant_id,
      user_id,
      overall_score,
      food_score,
      service_score,
      ambience_score,
      value_score,
      date_dined,
      review,
      user_recommended,
    })
      .then(() => {
      });
  }
};
Promise.promisify(createUsernames);
database.postgres.sync().then(function() {
  // seedRestaurants();
  async function loop() {
    fs.writeFile("./sampleData.gz","")
    count=[0,1,2,3,4,5,6,7,8,9]

    console.log("Hello");
    for(const item of count){
      await createUsernames();
      console.log(item);
    }
    console.log('Goodbye');
    seedUsers();
  };
  loop();
  // seedReviews();
  // seedReviewsHigher();
  // database.postgres.close();
});


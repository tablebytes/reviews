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



const createUsernames = async function createUsernames(gzipFilePath, seedCount, rowCount) {
  for (let i = 0; i <= seedCount; i += 1) {
    var rows=[];
    for(var q=0; q< rowCount; q++){
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
            fs.appendFile(gzipFilePath,gzip, (err, data)=>{
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
const createRestaurants = async function createRestaurants(gzipFilePath, seedCount, rowCount) {
  for(var i =0; i < seedCount ; i++){
    var rows=[];
    for(var q=0; q< rowCount ; q++){
      const restaurant_name = faker.lorem.word();
      rows.push({restaurant_name});
    }
    await new Promise ((res,rej)=>{
      zlib.gzip(JSON.stringify(rows)+'\n', (err, gzip)=>{
        if(err){
          console.log(err);
        } else {
            fs.appendFile(gzipFilePath,gzip, (err, data)=>{
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
// const seedUsers = function seedUsers(){ 
//   var readStream= fs.createReadStream("./sampleData.gz");
//   var gunzip=zlib.createGunzip();
//   var lineRaw='';
//   var lines=[];
//   readStream.pipe(gunzip).on("data",(chuck)=>{
//     lineRaw=lineRaw+chuck.toString();
//     // lines=lines.concat(chuck.toString().split("\n"));
//     // console.log(lines[lines.length-1]);
//     // line=lines[lines.length]
//   })
//   .on('drain', ()=>{
//     lines= lineRaw.split("\n");
//     lineRaw=lines[lines.length-1];
//     lines.pop();
//     async function bulkLoad() {
//       for(const line in lines){
//         await Models.User.bulkCreate(JSON.parse(lines[line]))
//         .then(() => {
//           console.log("Saved")
//         });
//       }
//     }
//     bulkLoad();
//   })
//   .on("end",()=>{
//     console.log("End");
//   })
// }




const createReviews = async function createReviews(gzipFilePath, seedCount, rowCount) {
  for(let q= 0; q< seedCount; q++){
    console.log(q)
    max=0.8*seedCount*rowCount;
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
    await new Promise( (res,rej)=>{
      zlib.gzip(JSON.stringify(rows)+'\n', (err, gzip)=>{
        if(err){
          console.log(err);
        } else {
            fs.appendFile(gzipFilePath,gzip, (err, data)=>{
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

const seed = function seed(file,database){ 
  var readStream= fs.createReadStream(file);
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
        if(lines[line]){
          await database.bulkCreate(JSON.parse(lines[line]))
          .then(() => {
            console.log("Saved")
          });
        }
        
      }
    }
    bulkLoad();
  })
  .on("end",()=>{
    lines= lineRaw.split("\n");
    async function endbulkLoad() {
      for(const line in lines){
        if(lines[line]){
          await database.bulkCreate(JSON.parse(lines[line]))
          .then(() => {
            console.log("EndSaved")
          });
        }
        
      }
    }
    endbulkLoad();
    console.log("End");
  })
}

Promise.promisify(createUsernames);
database.postgres.sync({force: true}).then(async function() {
  var seedCount =500;
  var rowCount=2000;
  async function userLoop() {
    var gzipFilePath="./userData.gz";
    var database= Models.User;
    fs.writeFile(gzipFilePath,"")
    count=[0,1,2,3,4,5,6,7,8,9]

    console.log("Hello");
    for(const item of count){
      await createUsernames(gzipFilePath, seedCount, rowCount);
      console.log(item);
    }
    seed(gzipFilePath,database);
  };
  await userLoop();
  async function restaurantLoop() {
    var gzipFilePath="./restaurantData.gz";
    var database= Models.Restaurant;
    fs.writeFile(gzipFilePath,"")
    count=[0,1,2,3,4,5,6,7,8,9]

    console.log("Starting Restaurant Seed");
    for(const item of count){
      await createRestaurants(gzipFilePath, seedCount, rowCount);
      console.log(item);
    }
    seed(gzipFilePath,database);
  };
  await restaurantLoop();
  async function reviewLoop() {
    // seedCount=seedCount*10;
    var gzipFilePath="./reviewData.gz";
    var database= Models.Review;
    fs.writeFile(gzipFilePath,"")
    count=[0,1,2,3,4,5,6,7,8,9]

    console.log("Starting Review Seed");
    for(const item of count){
      await createReviews(gzipFilePath, seedCount, rowCount);
      console.log(item);
    }
    seed(gzipFilePath,database);
  };
  await reviewLoop();

});

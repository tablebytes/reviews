const redis = require('redis');
const Models = require('../Models');
//createClient(port, url)
const redisClient = redis.createClient('6379', '127.0.0.1');
const redisinfo = require('../../pguserData')

redisClient.auth(redisinfo.redispswd);
const writeToRedis = async function(restaurant_id){
  await Models.Review.findAll({ where: { restaurant_id: restaurant_id }, include: [Models.User] })
  .then(async (data) => {
    await redisClient.set(restaurant_id, JSON.stringify(data));
    return;
  })
  .catch(err =>{ 
    console.log(err);
    return;
  });
}


const warmRedis = async function(){
  var warmingSize=[]
  for(var i= 0; i < 1000000 ; i++){
    warmingSize.push(i);
  }
  for(const item in warmingSize){
    await writeToRedis(item);
  }
  console.log("DB Warmed");
}


redisClient.on('connect', async()=>{
  // await warmRedis();
  console.log("Redis Connected");
});

redisClient.on('err', (err)=>{
  console.log("Redis err", err)
});





module.exports=redisClient;
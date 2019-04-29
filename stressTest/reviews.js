const faker = require("faker");
'use strict';

function randomReview(userContext, events, done){
  const user_id = faker.random.number({
    min: 1,
    max: 9999999,
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
  var userReview={
    user_id : user_id,
    date_dined : date_dined,
    review : {
      overall_score : overall_score,
      food_score : food_score,
      service_score : service_score,
      ambience_score : ambience_score,
      value_score : value_score,
      review : review,
      user_recommended :user_recommended,
    }
  }
  userContext.vars.userReview= userReview;
  var random = Math.floor(Math.random()*10000000);
  userContext.vars.random = random;
  return done();
}


module.exports = {randomReview};
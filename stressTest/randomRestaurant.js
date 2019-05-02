'use strict';

function randomRestaurant(userContext, events, done){
  var random = Math.floor(Math.random()*2000000);
  userContext.vars.random = random;
  return done();
}


module.exports = {randomRestaurant};
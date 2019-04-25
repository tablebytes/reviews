
function randomRestaurant(context, events, done){
  context.vars['random']= Math.floor(Math.random()*10000000);
  return done();
}


module.exports = randomRestaurant;
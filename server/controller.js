const Promise = require("bluebird");
const db = require('../database/index');
Promise.promisifyAll(db);


module.exports = {
  restaurant: {
    readAll: (req, res) => {
      const restaurant_id  = JSON.parse(req.params.restaurant_id);
      db.reviewModel.find({ restaurant_id : restaurant_id }, (err, reviews)=>{
        if(err){
          res.send(err);
        } else {
          res.send(reviews);
        }
      })
    },
    readOne: (req, res) => {
      const restaurant_id  = JSON.parse(req.params.restaurant_id);
      const review_id  = JSON.parse(req.params.review_id);
      db.reviewModel.find({ restaurant_id: restaurant_id, review_id :review_id }, (err, reviews)=>{
        if(err){
          res.send(err);
        } else {
          res.send(reviews);
        }
      })
    },
    // //Possible?
    // newRestaurant: (req, res) => {
    //   const restaurant = {
    //     restaurant_name: req.body.name,
    //   };
    //   Models.Restaurant.create(restaurant)
    //     .then((result) => {
    //       res.send(JSON.stringify(result.id));
    //       res.sendStatus(200);
    //     })
    //     .catch(err => console.log(err));
    // },
    newReview: (req, res) => {
      const review = {
        restaurant_id: req.params.restaurant_id,
        user_id: req.body.user_id,
        overall_score: req.body.review.overall_score,
        food_score: req.body.review.food_score,
        service_score: req.body.review.service_score,
        ambience_score: req.body.review.ambience_score,
        value_score: req.body.review.value_score,
        date_dined: req.body.date_dined,
        review: req.body.review.review,
        user_recommended: req.body.review.user_recommended,

      };
      Models.Review.create(review)
        .then((result) => {
          res.send(JSON.stringify(result.id));
          res.sendStatus(200);
        })
        .catch(err => console.log(err));
    },
    //Possible?
    updateName: (req, res) => {
      const { restaurant_id } = req.params;
      Models.Restaurant.update({ restaurant_name: req.body.restaurant_name },
        { where: { id: restaurant_id } })
        .then(() => {
          res.send('Restaurant Name updated');
          res.sendStatus(200);
        })
        .catch(err => console.log(err));
    },
    updateReview: (req, res) => {
      const { restaurant_id, id } = req.params;
      const change = req.body;
      Models.Review.update(change,
        { where: { restaurant_id, id } })
        .then(() => {
          res.send('Review updated');
          res.sendStatus(200);
        })
        .catch(err => console.log(err));
    },
    deleteReview: (req, res) => {
      const { restaurant_id, id } = req.params;
      Models.Review.destroy({ where: { restaurant_id, id } })
        .then(() => {
          res.send('Review deleted');
          res.sendStatus(200);
        })
        .catch(err => console.log(err));
    },
    deleteRestaurant: (req, res) => {
      const { restaurant_id } = req.params;
      Models.Review.destroy({ where: { restaurant_id } })
        .then(() => {
          Models.Restaurant.destroy({ where: { id: restaurant_id } })
            .then(() => {
              res.send('Restaurant deleted');
              res.sendStatus(200);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
  },
  user: {
    // Gets all reviews from 1 user and adds user information on end
    read: (req, res) => {
      const user_id = JSON.parse(req.params.user_id);
      db.reviewModel.find({ user_id : user_id }, (err, userReviews)=>{
        if(err){
          res.send(err);
        } else {
          res.send(userReviews);
        }
      })
    },
    update: (req, res) => {
      const user_id = JSON.parse(req.params.user_id);
      db.reviewModel.find({ user_id : user_id }, (err, userReviews)=>{
        if(err){
          res.send(err);
        } else {
          async function updateAll(){
            for(var i = 0; i < userReviews.length;i++){
              await db.reviewModel.update(
                { user_id : user_id, restaurant_id : JSON.parse(userReviews[i].restaurant_id) }, { user_name : req.body.username }, (err, updated)=>{
                  if(err){
                    console.log(err);
                    res.send(err);
                  } else {
                    return;
                  }
                }
              )
            }
            res.send("Updated")
          }
         updateAll();
        }
      }) 
    },
    delete: (req, res) => {
      const user_id = JSON.parse(req.params.user_id);
      db.reviewModel.find({ user_id : user_id }, (err, userReviews)=>{
        if(err){
          res.send(err);
        } else {
          async function deleteAll(){
            for(var i = 0; i < userReviews.length;i++){
              await db.reviewModel.delete(
                { user_id : user_id, restaurant_id : JSON.parse(userReviews[i].restaurant_id) }, { user_name : req.body.username }, (err, updated)=>{
                  if(err){
                    console.log(err);
                    res.send(err);
                  } else {
                    return;
                  }
                }
              )
            }
            res.send("User's Revews Deleted");
          }
         deleteAll();
        }
      }) 
    },
  },
};

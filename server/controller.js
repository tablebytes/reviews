const Promise = require("bluebird");
const expressCassandra = require("express-cassandra");
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
      const review_id  = expressCassandra.uuidFromString(req.params.review_id);
      db.reviewModel.find({ restaurant_id: restaurant_id, review_id : review_id }, (err, review)=>{
        if(err){
          res.send(err);
        } else {
          res.send(review);
        }
      })
    },
    newReview: (req, res) => {
      var rawReview=req.body;
      var review = new db.reviewModel({
        review_id : expressCassandra.timeuuid(),
        restaurant_id: JSON.parse(req.params.restaurant_id),
        restaurant_name : rawReview.restaurant_name,
        overall_score : rawReview.overall_score,
        food_score : rawReview.food_score,
        service_score : rawReview.service_score,
        ambience_score : rawReview.ambience_score,
        value_score: rawReview.value_score,
        date_dined : rawReview.date_dined,
        review : rawReview.review,
        user_recommended: rawReview.user_recommended,
        user_id : rawReview.user_id,
        user_name : rawReview.user_name,
        user_location: rawReview.user_location,
        user_vip : rawReview.user_vip
      });
      review.save((err)=>{
        if(err){
          res.end(err);
        } else {
          res.end("Review Made")
        }
      })
    },
    updateName: (req, res) => {
      const restaurant_id  = JSON.parse(req.params.restaurant_id);
      const restaurant_name = req.body.restaurant_name;
      db.reviewModel.find({ restaurant_id : restaurant_id }, (err, reviews)=>{
        if(err){
          res.send(err);
        } else {
          async function updateAll(){
            for(var i = 0; i < reviews.length;i++){
              await db.reviewModel.update(
                { user_id : JSON.parse(reviews[i].user_id), restaurant_id : restaurant_id }, { restaurant_name : restaurant_name }, (err)=>{
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
    updateReview: (req, res) =>{
      var queryKeys ={
        user_id: JSON.parse(req.body.user_id),
        restaurant_id  : JSON.parse(req.params.restaurant_id)
      }  
      delete req.body.restaurant_id;
      delete req.body.restaurant_name;
      delete req.body.date_dined;
      
      delete req.body.user_id;
      delete req.body.user_name;
      delete req.body.user_review_count;
      delete req.body.user_location;
      delete req.body.user_vip;

      db.reviewModel.update(queryKeys, req.body, (err)=>{
        if(err){
          console.log(err);
          res.send(err);
        } else {
          res.end("Review Updated");
        }
      })
    },
    deleteReview: (req, res) => {
      const review_id  = expressCassandra.uuidFromString(req.params.review_id);
      const restaurant_id  = JSON.parse(req.params.restaurant_id);
      
      db.reviewModel.find({ restaurant_id: restaurant_id, review_id : review_id }, (err, review)=>{
        if(err){
          res.send(err);
        } else {
          db.reviewModel.delete({restaurant_id: restaurant_id, user_id : JSON.parse(review[0].user_id)}, (err)=>{
            if(err){
              res.end(err);
            } else {
              res.end("ReviewDeleted");
            }
          })
        }
      })
    },
    deleteRestaurant: (req, res) => {
      const restaurant_id  = JSON.parse(req.params.restaurant_id);
      db.reviewModel.find({ restaurant_id: restaurant_id}, (err, reviews)=>{
        if(err){
          res.send(err);
        } else {
          async function deleteAll(){
            for(var i = 0; i < reviews.length;i++){
              await db.reviewModel.delete(
                { user_id : JSON.parse(reviews[i].user_id), restaurant_id : restaurant_id }, (err)=>{
                  if(err){
                    res.send(err);
                  } else {
                    return;
                  }
                }
              )
            }
            res.send("Restaurant Reviews Deleted");
          }
         deleteAll();
        }
      })
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
                { user_id : user_id, restaurant_id : JSON.parse(userReviews[i].restaurant_id) }, { user_name : req.body.username }, (err)=>{
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
                { user_id : user_id, restaurant_id : JSON.parse(userReviews[i].restaurant_id) }, (err)=>{
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

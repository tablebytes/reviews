const Models = require('../database/Models');

module.exports = {
  restaurant : {
    readAll : (req, res)=>{
      Models.Review.findAll({ where: { restaurant_id: req.params.restaurant_id }, include: [Models.User] })
        .then((data) => {
          res.send(data);
        })
        .catch(err => console.log(err));
    },
    readOne : (req , res) => {
      Models.Review.findOne({ where: { restaurant_id: req.params.restaurant_id , id : req.params.id}, include: [Models.User] })
      .then((data) => {
        res.send(data);
      })
      .catch(err => console.log(err));
    },
    newRestaurant : (req, res) => {

      Models.Restaurant.create({restaurant_name : req.body.name})
        .then((result)=>{
          res.send(JSON.stringify(result.id));
        })
        .catch(err => console.log(err));
    },
    newReview : (req, res) => {
      
      Models.Review.create({
        restaurant_id : req.params.restaurant_id,
        user_id : req.body.user_id,
        overall_score : req.body.review.overall_score,
        food_score : req.body.review.food_score,
        service_score : req.body.review.service_score,
        ambience_score : req.body.review.ambience_score,
        value_score : req.body.review.value_score,
        date_dined : req.body.date_dined,
        review : req.body.review.review,
        user_recommended : req.body.review.user_recommended,

      })
        .then((result)=>{
          res.send(JSON.stringify(result.id));
        })
        .catch(err => console.log(err));
    },
    updateName : (req, res) => {
      console.log(req.body)
      Models.Restaurant.update( {restaurant_name : req.body.restaurant_name},
        { where: { id: req.params.restaurant_id }})
        .then(() => {
          res.send("Restaurant Name updated");
        })
        .catch(err => console.log(err));
    },
    updateReview : (req, res) => {
      Models.Review.update( req.body ,
        { where: { restaurant_id: req.params.restaurant_id, id : req.params.id }})
        .then(() => {
          res.send("Review updated");
        })
        .catch(err => console.log(err));
    },
    deleteReview : (req, res) =>{
      Models.Review.destroy({ where: { restaurant_id: req.params.restaurant_id, id : req.params.id }})
        .then(() => {
          res.send("Review deleted");
        })
        .catch(err => console.log(err));
    },
    deleteRestaurant : (req, res) => {
      Models.Restaurant.destroy({ where: { id: req.params.restaurant_id}})
        .then(()=>{
          res.send("Restaurant deleted");
        })
        .catch(err => console.log(err));
    }
  },
  user : {
    //Gets all reviews from 1 user and adds user information on end
    read : (req, res)=> {
      Models.Review.findAll({ where: { user_id : req.params.user_id }})
        .then((data) => {
          Models.User.findOne({where: { id: user_id} })
            .then((userData) => {
              data.push(userData);
              res.send(data);
            })
          .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
    create : (req, res) => {
      Models.User.create({
        username : req.body.username,
        review_count : 0,
        location : req.body.location,
        VIP: 0
      })
        .then((result)=>{
          res.send(JSON.stringify(result.id));
        })
        .catch(err => console.log(err));
    },
    update : (req, res)=>{
      Models.User.update(
        {username : req.body.username} ,{where: { id : req.params.user_id }})
        .then(() => {
          res.send("User Updated");
        })
        .catch(err => console.log(err));
    },
    delete : (req, res) =>{
      Models.User.destroy({ where: { id: req.params.user_id}})
        .then(()=>{
          res.send("User deleted");
        })
        .catch(err => console.log(err));
    }
  }
}
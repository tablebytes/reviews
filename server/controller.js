const Models = require('../database/Models');

module.exports = {
  restaurant : {
    readAll : (req, res)=>{
      const { restaurant_id } = req.params;
      Models.Review.findAll({ where: { restaurant_id: restaurant_id }, include: [Models.User] })
        .then((data) => {
          res.send(data);
        })
        .catch(err => console.log(err));
    },
    readOne : (req , res) => {
      const { restaurant_id, id } = req.params;
      Models.Review.findOne({ where: { restaurant_id: restaurant_id , id : id}, include: [Models.User] })
      .then((data) => {
        res.send(data);
        res.sendStatus(200);
      })
      .catch(err => console.log(err));
    },
    newRestaurant : (req, res) => {
      const restaurant = {
        restaurant_name : req.body.name,
      }
      Models.Restaurant.create(restaurant)
        .then((result)=>{
          res.send(JSON.stringify(result.id));
          res.sendStatus(200)
        })
        .catch(err => console.log(err));
    },
    newReview : (req, res) => {
      const review = {
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

      }
      Models.Review.create(review)
        .then((result)=>{
          res.send(JSON.stringify(result.id));
          res.sendStatus(200)
        })
        .catch(err => console.log(err));
    },
    updateName : (req, res) => {
      const { restaurant_id } = req.params;
      Models.Restaurant.update( {restaurant_name : req.body.restaurant_name},
        { where: { id: restaurant_id }})
        .then(() => {
          res.send("Restaurant Name updated");
          res.sendStatus(200);
        })
        .catch(err => console.log(err));
    },
    updateReview : (req, res) => {
      const { restaurant_id, id } = req.params;
      const change = req.body;
      Models.Review.update( change ,
        { where: { restaurant_id: restaurant_id, id : id }})
        .then(() => {
          res.send("Review updated");
          res.sendStatus(200);
        })
        .catch(err => console.log(err));
    },
    deleteReview : (req, res) =>{
      const { restaurant_id, id } = req.params;
      Models.Review.destroy({ where: { restaurant_id: restaurant_id, id : id }})
        .then(() => {
          res.send("Review deleted");
          res.sendStatus(200);
        })
        .catch(err => console.log(err));
    },
    deleteRestaurant : (req, res) => {
      const { restaurant_id} = req.params;
      Models.Review.destroy({ where: { restaurant_id: restaurant_id}})
        .then(() => {
          Models.Restaurant.destroy({ where: { id: restaurant_id}})
            .then(()=>{
              res.send("Restaurant deleted");
              res.sendStatus(200);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  },
  user : {
    //Gets all reviews from 1 user and adds user information on end
    read : (req, res)=> {
      const {user_id} = req.params;
      Models.Review.findAll({ where: { user_id : user_id }})
        .then((data) => {
          Models.User.findOne({where: { id: user_id} })
            .then((userData) => {
              data.push(userData);
              res.send(data);
              res.sendStatus(200);
            })
          .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
    create : (req, res) => {
      const user = {
        username : req.body.username,
        review_count : 0,
        location : req.body.location,
        VIP: 0
      }
      Models.User.create(user)
        .then((result)=>{
          res.send(JSON.stringify(result.id));
          res.sendStatus(200)
        })
        .catch(err => console.log(err));
    },
    update : (req, res)=>{
      const {user_id} = req.params;
      Models.User.update(
        {username : req.body.username} ,{where: { id : user_id }})
        .then(() => {
          res.send("User Updated");
          res.sendStatus(200);
        })
        .catch(err => console.log(err));
    },
    delete : (req, res) =>{
      const { user_id} = req.params;
      Models.Review.destroy({ where: { user_id: user_id}})
        .then(() => {
          Models.User.destroy({ where: { id: user_id}})
            .then(()=>{
              res.send("User deleted");
              res.sendStatus(200);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  }
}
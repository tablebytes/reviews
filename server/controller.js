const Models = require('../database/Models');

module.exports = {
  restaurant : {
    readAll : (req, res)=>{
      const { restaurant_id } = req.params;
      Models.Review.findAll({ where: { restaurant_id: restaurant_id }, include: [Models.User] })
        .then((data) => {
          res.send(data);
          res.sendStatus(200);
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
    create : (req, res) => {
      const restaurant = {
        restaurant_name : req.query.name,
      }
      Models.Restaurant.create(restaurant)
        .then(()=>{
          res.send("Restaurant Created")
          res.sendStatus(200)
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
        username : req.query.username,
        review_count : 0,
        location : req.query.location,
        VIP: 0
      }
      Models.User.create(user)
        .then(()=>{
          res.send("User Created")
          res.sendStatus(200)
        })
        .catch(err => console.log(err));
    }
  }
}
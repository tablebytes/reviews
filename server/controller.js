const Models = require('../database/Models');

module.exports = {
  restaurant : {
    getAll : (req, res)=>{
      const { restaurant_id } = req.params;
      Models.Review.findAll({ where: { restaurant_id: restaurant_id }, include: [Models.User] })
        .then((data) => {
          res.send(data);
          res.sendStatus(200);
        })
        .catch(err => console.log(err));
    },
    getOne : (req , res) => {
      const { restaurant_id, id } = req.params;
      console.log(restaurant_id);
      console.log(id);
      Models.Review.findOne({ where: { restaurant_id: restaurant_id , id : id}, include: [Models.User] })
      .then((data) => {
        res.send(data);
        res.sendStatus(200);
      })
      .catch(err => console.log(err));
    }
  }
}
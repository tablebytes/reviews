const Models = require('../database/Models');

module.exports = {
  restaurant : {
    get : (req, res)=>{
      const { restaurant_id } = req.params;
      Models.Review.findAll({ where: { restaurant_id: restaurant_id }, include: [Models.User] })
        .then((data) => {
          res.send(data);
          res.sendStatus(200);
        })
        .catch(err => console.log(err));
    }
  }
}
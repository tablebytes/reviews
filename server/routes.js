const express = require('express');

const router = express.Router();
const db = require('../database/index');
const Models = require('../database/Models');
const path = require('path');

router.get('/:id/reviews', (req, res) => {
  const { id } = req.params;
  console.log(id);
  Models.Review.findAll({ where: { restaurant_id: id }, include: [Models.User] })
    .then((data) => {
      res.send(data);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

module.exports = router;

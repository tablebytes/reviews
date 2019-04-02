const express = require('express');
const router = express.Router();
const db = require('../database/index');
const Models = require('../database/Models');

router.get('/', (req, res) =>
  Models.users.findAll()
    .then(gigs => {
      console.log(gigs);
      res.sendStatus(200);
    })
    .catch(err => console.log(err)));

module.exports = router;

const router = require("express").Router();
const controllers = require("./controller.js");


//User Routes
// router.get('/user', controllers)


//Restaurant /Review Routes
router.get('/restaurants/:restaurant_id/reviews', controllers.restaurant.get)


module.exports = router;
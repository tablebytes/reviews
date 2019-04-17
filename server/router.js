const router = require("express").Router();
const controllers = require("./controller.js");


//User Routes
// router.get('/user', controllers)
router.get('/users/:user_id', controllers.user.read);
  //url should be /user?username=XYZ&location=ABC
router.post('/users', controllers.user.create);

//Restaurant /Review Routes
router.get('/restaurants/:restaurant_id/reviews', controllers.restaurant.readAll);
router.get('/restaurants/:restaurant_id/review/:id', controllers.restaurant.readOne);

router.post('/restaurants', controllers.restaurant.create)

module.exports = router;
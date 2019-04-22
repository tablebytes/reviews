const router = require('express').Router();
const controllers = require('./controller.js');


// User Routes
// router.get('/user', controllers)
router.get('/users/:user_id', controllers.user.read);
router.post('/users', controllers.user.create);
router.put('/users/:user_id', controllers.user.update);
router.delete('/users/:user_id', controllers.user.delete);
// Restaurant /Review Routes
router.get('/restaurants/:restaurant_id/reviews', controllers.restaurant.readAll);
router.get('/restaurants/:restaurant_id/reviews/:id', controllers.restaurant.readOne);

router.post('/restaurants', controllers.restaurant.newRestaurant);
router.post('/restaurants/:restaurant_id/reviews', controllers.restaurant.newReview);

router.put('/restaurants/:restaurant_id', controllers.restaurant.updateName);
router.patch('/restaurants/:restaurant_id/reviews/:id', controllers.restaurant.updateReview);

router.delete('/restaurants/:restaurant_id/reviews/:id', controllers.restaurant.deleteReview);
router.delete('/restaurants/:restaurant_id', controllers.restaurant.deleteRestaurant);
module.exports = router;

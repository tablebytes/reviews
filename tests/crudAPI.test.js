const request = require('request');


describe("Testing GET pathways", ()=>{
  test("Expect api request to get all reviews for restaurtant to return", (done)=>{
    request('http://127.0.0.1:3001/api/restaurants/9899971/reviews', (err, res, body) => {
      expect(typeof body).toBe('string');
      done();
    });
  });
  test("Expect api request to get all reviews for restaurtant to return an array of objects", (done)=>{
    request('http://127.0.0.1:3001/api/restaurants/9899971/reviews', (err, res, body) => {
      expect(typeof body).toBe('string');
      var reviews= JSON.parse(body);
      expect(Array.isArray(reviews)).toBe(true);
      expect(typeof reviews[0]).toBe('object');
      done();
    });
  });
  test("Expect api request to get all reviews for restaurtant to include review Information", (done)=>{
    request('http://127.0.0.1:3001/api/restaurants/9899971/reviews', (err, res, body) => {
      var reviews= JSON.parse(body);
      var review=reviews[0];
      expect(review.id).not.toBe(undefined);
      expect(review.food_score).not.toBe(undefined);
      expect(typeof review.food_score).toBe("number");
      expect(review.user_recommended).not.toBe(undefined);
      expect(typeof review.user_recommended).toBe("boolean");
      expect(review.review).not.toBe(undefined);
      done();
    });
  });
  test("Expect api request to get all reviews for restaurtant to include User information in a User object", (done)=>{
    request('http://127.0.0.1:3001/api/restaurants/9899971/reviews', (err, res, body) => {
      var reviews= JSON.parse(body);
      var review=reviews[0];
      expect(review.User).not.toBe(undefined);
      expect(review.User.id).not.toBe(undefined);
      expect(review.User.username).not.toBe(undefined);
      done();
    });
  });
  test("Expect api request to get all reviews for restaurtant to include restaurant_id but not restaurant_name", (done)=>{
    request('http://127.0.0.1:3001/api/restaurants/9899971/reviews', (err, res, body) => {
      var reviews= JSON.parse(body);
      var review=reviews[0];
      expect(review.restaurant_id).not.toBe(undefined);
      expect(review.restaurant_name).toBe(undefined);
      done();
    });
  });
})
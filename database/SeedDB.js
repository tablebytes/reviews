const fs = require("fs");
const zlib = require("zlib");



fs.readFile("./sample.gz", (err, data)=>{
  console.log(data);
})

const seedUsernames = function seedUsernames() {
  // for (let i = 0; i < 400; i += 1) {
  //   const username = faker.name.firstName();
  //   const review_count = (Math.random()*30)+10;
  //   const location = 'San Francisco';
  //   // const location = faker.address.city().concat(', ', faker.address.stateAbbr());
  //   const vip = faker.random.boolean();
  // //   Models.User.create({
  // //     username, review_count, location, VIP: vip,
  // //   })
  // //     .then(() => {
  // //     });
  // // }
  fs.readFile("./sample.gz", (err, data)=>{
    console.log(data);
  })
};
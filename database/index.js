const pg= require("pg")
const Sequelize = require('sequelize');
const Promise = require('promise');
process.env.NODE_ENV = process.env.NODE_ENV  || "development";
if (process.env.NODE_ENV === 'development') {
  var pginfo = require("../pguserData");
}


 let postgres = new Sequelize("reviews", pginfo.user, pginfo.password, {
  dialect: 'postgres',
  logging : false
});


// postgres
//   .authenticate()
//   .then(()=>{
//     console.log("Connect with Postgres made")
//   })
//   .catch ((err)=>{
//     console.log("Unable to connect to Postgres", err)
//   })
// const User = postgres.define('User', {
//   username: {
//     type: Sequelize.STRING,
//   },
//   review_count: {
//     type: Sequelize.INTEGER,
//   },
//   location: {
//     type: Sequelize.STRING,
//   },
//   VIP: {
//     type: Sequelize.BOOLEAN,
//   },
// });

// module.exports.connection = connection;
module.exports.postgres = postgres;
// module.exports.User = User;
